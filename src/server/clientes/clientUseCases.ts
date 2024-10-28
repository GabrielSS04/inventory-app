import db from '../database/db'; 
import { Client } from "./clientEntitie";

interface ClientRow {
    id: number;
    nome: string;
    cpf_cnpj: string;
    contato: string;
    endereco: string;
}

export class ClientUseCases {
    
    async createClient(nome: string, cpf_cnpj: string, contato: string, endereco: string) {
        return new Promise<Client>((resolve, reject) => {
            const sql = `INSERT INTO clientes (nome, cpf_cnpj, contato, endereco) VALUES (?, ?, ?, ?)`;
            db.run(sql, [nome, cpf_cnpj, contato, endereco], function (err: Error | null) {
                if (err) {
                    reject(err);
                } else {
                    
                    const newClient = new Client(nome, cpf_cnpj, contato, endereco);
                    newClient.setId(this.lastID);
                    resolve(newClient);
                    console.log("Cliente criado com sucesso")
                }
            });
        });
    }

    async readAllClient() {
        console.log('Executando readAllClient...'); 
    
        return new Promise<Client[]>((resolve, reject) => {
            const sql = `SELECT * FROM clientes`;
            console.log('Consulta SQL:', sql);
    
            db.all(sql, [], (err: Error | null, rows: ClientRow[]) => {
                if (err) {
                    console.error('Erro ao buscar clientes:', err);
                    reject(err);
                } else {
                    console.log('Linhas retornadas:', rows);
    
                    const clientes = rows.map((row) => {
                        const cliente = new Client(row.nome, row.cpf_cnpj, row.contato, row.endereco);
                        cliente.setId(row.id);
                        return cliente;
                    });
                    resolve(clientes);
                }
            });
        });
    }
    

    async readOneClient(id: number) {
        return new Promise<Client>((resolve, reject) => {
            const sql = `SELECT * FROM clientes WHERE id = ?`;
            db.get(sql, [id], (err: Error | null, row: ClientRow | undefined) => {
                if (err) {
                    reject(err);
                } else if (!row) {
                    reject(new Error("not found"));
                } else {
                    const cliente = new Client(row.nome, row.cpf_cnpj, row.contato, row.endereco);
                    cliente.setId(row.id);
                    resolve(cliente);
                }
            });
        });
    }

    async updateClient(id: number, nome?: string, cpf_cnpj?: string, contato?: string, endereco?: string) {
        return new Promise<void>((resolve, reject) => {
            const sql = `
                UPDATE clientes
                SET nome = COALESCE(?, nome),
                    cpf_cnpj = COALESCE(?, cpf_cnpj),
                    contato = COALESCE(?, contato),
                    endereco = COALESCE(?, endereco)
                WHERE id = ?`;

            db.run(sql, [nome, cpf_cnpj, contato, endereco, id], function (err: Error | null) {
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

    async deleteClient(id: number) {
        return new Promise<void>((resolve, reject) => {
            const sql = `DELETE FROM clientes WHERE id = ?`;
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
