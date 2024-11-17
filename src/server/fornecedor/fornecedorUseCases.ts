import db from '../database/db'; 
import { Fornecedor } from "./fornecedorEntitie";

interface FornecedorRow {
    id: number;
    nome: string;
    cnpj: string;
    contato: string;
    endereco: string;
}

export class FornecedorUseCases {
    
    async createFornecedor(nome: string, cnpj: string, contato: string, endereco: string) {
        return new Promise<Fornecedor>((resolve, reject) => {
            const sql = `INSERT INTO fornecedores (nome, cnpj, contato, endereco) VALUES (?, ?, ?, ?)`;
            db.run(sql, [nome, cnpj, contato, endereco], function (err: Error | null) {
                if (err) {
                    reject(err);
                } else {
                    
                    const newClient = new Fornecedor(nome, cnpj, contato, endereco);
                    newClient.setId(this.lastID);
                    resolve(newClient);
                    console.log("Fornecedor criado com sucesso")
                }
            });
        });
    }

    async readAllFornecedores() {
        console.log('Executando readAllFornecedores...'); 
    
        return new Promise<Fornecedor[]>((resolve, reject) => {
            const sql = `SELECT * FROM fornecedores`;
            console.log('Consulta SQL:', sql);
    
            db.all(sql, [], (err: Error | null, rows: FornecedorRow[]) => {
                if (err) {
                    console.error('Erro ao buscar Fornecedores:', err);
                    reject(err);
                } else {
                    console.log('Linhas retornadas:', rows);
    
                    const fornecedores = rows.map((row) => {
                        const fornecedor = new Fornecedor(row.nome, row.cnpj, row.contato, row.endereco);
                        fornecedor.setId(row.id);
                        return fornecedor;
                    });
                    resolve(fornecedores);
                }
            });
        });
    }
    

    async readOneFornecedor(id: number) {
        return new Promise<Fornecedor>((resolve, reject) => {
            const sql = `SELECT * FROM fornecedores WHERE id = ?`;
            db.get(sql, [id], (err: Error | null, row: FornecedorRow | undefined) => {
                if (err) {
                    reject(err);
                } else if (!row) {
                    reject(new Error("not found"));
                } else {
                    const fornecedor = new Fornecedor(row.nome, row.cnpj, row.contato, row.endereco);
                    fornecedor.setId(row.id);
                    resolve(fornecedor);
                }
            });
        });
    }

    async updateFornecedor(id: number, nome?: string, cnpj?: string, contato?: string, endereco?: string) {
        return new Promise<void>((resolve, reject) => {
            const sql = `
                UPDATE fornecedores
                SET nome = COALESCE(?, nome),
                    cnpj = COALESCE(?, cnpj),
                    contato = COALESCE(?, contato),
                    endereco = COALESCE(?, endereco)
                WHERE id = ?`;

            db.run(sql, [nome, cnpj, contato, endereco, id], function (err: Error | null) {
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

    async deleteFornecedor(id: number) {
        return new Promise<void>((resolve, reject) => {
            const sql = `DELETE FROM fornecedores WHERE id = ?`;
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
