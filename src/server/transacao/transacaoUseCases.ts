import db from '../database/db'; 
import { Transacao } from "./transacaoEntitie";

interface TransacaoRow {
    id: number;
    data: Date;
    tipo: string;
    valor: number;
    pedidoId: number;
    produtoId: number;
}

export class TransacaoUseCases {
    
    async createTransacao(data: Date, tipo: string, valor: number, pedidoId: number, produtoId: number ) {
        return new Promise<Transacao>((resolve, reject) => {
            const sql = `INSERT INTO transacao (data, tipo, valor, pedidoId, produtoId) VALUES (?, ?, ?, ?, ?)`;
            db.run(sql, [data, tipo, valor, pedidoId, produtoId], function (err: Error | null) {
                if (err) {
                    reject(err);
                } else {
                    
                    const newTransacao = new Transacao(data, tipo, valor, pedidoId, produtoId);
                    newTransacao.setId(this.lastID);
                    resolve(newTransacao);
                    console.log("Transacao criada com sucesso")
                }
            });
        });
    }

    async readAllTransacao() {
        console.log('Executando readAllTransacao...'); 
    
        return new Promise<Transacao[]>((resolve, reject) => {
            const sql = `SELECT * FROM transacao`;
            console.log('Consulta SQL:', sql);
    
            db.all(sql, [], (err: Error | null, rows: TransacaoRow[]) => {
                if (err) {
                    console.error('Erro ao buscar Transacoes:', err);
                    reject(err);
                } else {
                    console.log('Linhas retornadas:', rows);
    
                    const transacoes = rows.map((row) => {
                        const transacao = new Transacao(row.data, row.tipo, row.valor, row.pedidoId, row.produtoId);
                        transacao.setId(row.id);
                        return transacao;
                    });
                    resolve(transacoes);
                }
            });
        });
    }
    
}
