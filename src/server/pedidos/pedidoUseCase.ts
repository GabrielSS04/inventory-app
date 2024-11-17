import db from '../database/db';
import { ItemPedido } from '../itemPedido/ItemPedidoEntitie';
import { Pedido } from "./pedidoEntitie";
import { TransacaoUseCases } from '../transacao/transacaoUseCases';  // Importando TransacaoUseCases

interface PedidoRow {
  id: number;
  data: Date;
  clientId: number;
  status: string;
  total: number;
  produtoId?: number;
  quantidade?: number;
  precoUnitario?: number;
}

export class PedidoUseCases {

    private transacaoUseCases: TransacaoUseCases;

    constructor() {
        this.transacaoUseCases = new TransacaoUseCases();  // Instanciando TransacaoUseCases
    }

    // Método para criar o pedido com data especificada pelo usuário
    async createPedido(data: Date, clientId: number, status: string, itens: ItemPedido[]) {
        return new Promise<Pedido>((resolve, reject) => {
            const total = itens.reduce((acc, item) => {
                if (item.quantidade && item.precoUnitario) {
                    return acc + (item.quantidade * item.precoUnitario);
                }
                return acc;
            }, 0);
    
            const sql = `INSERT INTO pedidos (data, clientId, status, total) VALUES (?, ?, ?, ?)`;
            db.run(sql, [data, clientId, status, total], function (err: Error | null) {
                if (err) {
                    reject(err);
                } else {
                    const newPedido = new Pedido(data, clientId, status, total);
                    newPedido.setId(this.lastID);
    
                    // Inserir os itens do pedido
                    const itemPromises = itens.map(item => {
                        return new Promise<void>((resolve, reject) => {
                            const itemSql = `INSERT INTO itemPedido (pedidoId, produtoId, quantidade, precoUnitario) VALUES (?, ?, ?, ?)`;
                            db.run(itemSql, [newPedido.getId(), item.produtoId, item.quantidade, item.precoUnitario], function (err) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve();
                                }
                            });
                        });
                    });
    
                    // Aguarda todas as inserções dos itens
                    Promise.all(itemPromises)
                        .then(async () => {
                            // Criar as transações dentro do mesmo fluxo de criação de pedido
                            const dataAtual = new Date(); // Data atual para as transações
                            const transacaoPromises = itens.map(item => {
                                return new Promise<void>((resolve, reject) => {
                                    const tipo = "saída";
                                    const valor = item.quantidade && item.precoUnitario ? item.quantidade * item.precoUnitario : 0;
                                    const sqlTransacao = `INSERT INTO transacao (data, tipo, valor, pedidoId, produtoId) VALUES (?, ?, ?, ?, ?)`;
    
                                    db.run(sqlTransacao, [dataAtual, tipo, valor, newPedido.getId(), item.produtoId], function (err) {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            resolve();
                                        }
                                    });
                                });
                            });
    
                            // Aguarda todas as inserções de transações
                            await Promise.all(transacaoPromises);
                            resolve(newPedido);
                            console.log("Pedido e transações criados com sucesso");
                        })
                        .catch(err => reject(err));
                }
            });
        });
    }
    

    // Método para ler todos os pedidos
    async readAllPedidos() {
        console.log('Executando readAllPedidos...');
      
        return new Promise<Pedido[]>((resolve, reject) => {
            const sql = `
                SELECT p.id, p.data, p.clientId, p.status, p.total, 
                    i.produtoId, i.quantidade, i.precoUnitario
                FROM pedidos p
                LEFT JOIN itemPedido i ON p.id = i.pedidoId;
            `;
            console.log('Consulta SQL:', sql);
      
            db.all(sql, [], (err: Error | null, rows: PedidoRow[]) => {
                if (err) {
                    console.error('Erro ao buscar pedidos:', err);
                    reject(err);
                } else {
                    console.log('Linhas retornadas:', rows);
      
                    const pedidosMap: { [key: number]: Pedido } = {};
      
                    rows.forEach((row) => {
                        if (!pedidosMap[row.id]) {
                            pedidosMap[row.id] = new Pedido(row.data, row.clientId, row.status, row.total);
                            pedidosMap[row.id].setId(row.id);
                        }
      
                        if (row.produtoId && row.quantidade && row.precoUnitario) {
                            pedidosMap[row.id].adicionarItem({
                                produtoId: row.produtoId,
                                quantidade: row.quantidade,
                                precoUnitario: row.precoUnitario,
                            });
                        }
                    });
      
                    const pedidos = Object.values(pedidosMap);
                    resolve(pedidos);
                }
            });
        });
    }
    
    // Método para ler um pedido específico
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

    // Método para atualizar um pedido
    async updatePedido(id: number, data?: Date, clientId?: number, status?: string, itens?: ItemPedido[]) {
        return new Promise<void>((resolve, reject) => {
            let total = undefined;
            if (itens && itens.length > 0) {
                total = itens.reduce((acc, item) => acc + (item.getQuantidade() * item.getPrecoUnitario()), 0);
            }
    
            const sql = `
                UPDATE pedidos
                SET 
                    data = COALESCE(?, data),
                    clientId = COALESCE(?, clientId),
                    status = COALESCE(?, status),
                    total = COALESCE(?, total)
                WHERE id = ?`;
    
            db.run(sql, [data, clientId, status, total, id], function (err: Error | null) {
                if (err) {
                    reject(err);
                } else if (this.changes === 0) {
                    reject(new Error("Pedido não encontrado"));
                } else {
                    if (itens && itens.length > 0) {
                        const deleteSql = `DELETE FROM itemPedido WHERE pedidoId = ?`;
                        db.run(deleteSql, [id], (err: Error | null) => {
                            if (err) {
                                reject(err);
                            } else {
                                itens.forEach(item => {
                                    const itemSql = `INSERT INTO itemPedido (pedidoId, produtoId, quantidade, precoUnitario) VALUES (?, ?, ?, ?)`;
                                    db.run(itemSql, [id, item.getProdutoId(), item.getQuantidade(), item.getPrecoUnitario()], function (err) {
                                        if (err) {
                                            console.error('Erro ao inserir item:', err);
                                        }
                                    });
                                });
                                resolve();
                            }
                        });
                    } else {
                        resolve();
                    }
                }
            });
        });
    }

    // Método para deletar um pedido
    async deletePedido(id: number) {
        return new Promise<void>((resolve, reject) => {
            const sql = `DELETE FROM pedidos WHERE id = ?`;
            db.run(sql, [id], function (err: Error | null) {
                if (err) {
                    reject(err);
                } else if (this.changes === 0) {
                    reject(new Error("Pedido não encontrado"));
                } else {
                    resolve();
                }
            });
        });
    }
}
