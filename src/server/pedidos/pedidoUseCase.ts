import db from '../database/db'; 
import { Pedido } from "./pedidoEntitie";

interface PedidoRow {
    id: number;
    data: Date;
    clientId: number;
    status: string;
    total: number;
}

export class PedidoUseCases {
    
    async createPedidos(data: Date, clientId: number, status: string, total: number) {
        return new Promise<Pedido>((resolve, reject) => {
            const sql = `INSERT INTO pedidos (data, clientId, status, total) VALUES (?, ?, ?, ?)`;
            db.run(sql, [data, clientId, status, total], function (err: Error | null) {
                if (err) {
                    reject(err);
                } else {
                    
                    const newPedido = new Pedido(data, clientId, status, total);
                    newPedido.setId(this.lastID);
                    resolve(newPedido);
                    console.log("Pedido criado com sucesso")
                }
            });
        });
    }

    async readAllPedidos() {
        console.log('Executando readAllPedidos...'); 
    
        return new Promise<Pedido[]>((resolve, reject) => {
            const sql = `SELECT * FROM pedidos`;
            console.log('Consulta SQL:', sql);
    
            db.all(sql, [], (err: Error | null, rows: PedidoRow[]) => {
                if (err) {
                    console.error('Erro ao buscar pedidos:', err);
                    reject(err);
                } else {
                    console.log('Linhas retornadas:', rows);
    
                    const pedidos = rows.map((row) => {
                        const pedido = new Pedido(row.data, row.clientId, row.status, row.total);
                        pedido.setId(row.id);
                        return pedido;
                    });
                    resolve(pedidos);
                }
            });
        });
    }
    

    async readOnePedidos(id: number) {
        return new Promise<Pedido>((resolve, reject) => {
            const sql = `SELECT * FROM pedidos WHERE id = ?`;
            db.get(sql, [id], (err: Error | null, row: PedidoRow | undefined) => {
                if (err) {
                    reject(err);
                } else if (!row) {
                    reject(new Error("not found"));
                } else {
                    const pedido = new Pedido(row.data, row.clientId, row.status, row.total);
                    pedido.setId(row.id);
                    resolve(pedido);
                }
            });
        });
    }

    async updatePedido(id: number, data?: Date, clientId?: number, status?: string, total?: number) {
        return new Promise<void>((resolve, reject) => {
            const sql = `
                UPDATE pedidos
                SET data = COALESCE(?, data),
                    clientId = COALESCE(?, clientId),
                    status = COALESCE(?, status),
                    total = COALESCE(?, total)
                WHERE id = ?`;

            db.run(sql, [data, clientId, status, total, id], function (err: Error | null) {
                if (err) {
                    reject(err);
                } else if (this.changes === 0) {
                    reject(new Error("not found"));
                } else {
                    resolve();
                }
            });
        });
    }

    async deletePedido(id: number) {
        return new Promise<void>((resolve, reject) => {
            const sql = `DELETE FROM pedidos WHERE id = ?`;
            db.run(sql, [id], function (err: Error | null) {
                if (err) {
                    reject(err);
                } else if (this.changes === 0) {
                    reject(new Error("not found"));
                } else {
                    resolve();
                }
            });
        });
    }
}
