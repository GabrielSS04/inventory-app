import { Database } from 'sqlite3';
import path from 'path';

const db = new Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

export const initializeDatabase = () => {
    db.serialize(() => {

        db.run(`
            CREATE TABLE IF NOT EXISTS pedidos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                data DATE NOT NULL,
                clientId INTEGER NOT NULL,
                status TEXT NOT NULL,
                total REAL NOT NULL,
                FOREIGN KEY (clientId) REFERENCES clientes(id)
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela pedidos:', err.message);
            } else {
                console.log('Tabela de pedidos verificada/criada.');
            }
        });
        
        db.run(`
            CREATE TABLE IF NOT EXISTS clientes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                cpf_cnpj TEXT NOT NULL,
                contato TEXT NOT NULL,
                endereco TEXT NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela clientes:', err.message);
            } else {
                console.log('Tabela de clientes verificada/criada.');
            }
        });

    });
};

export default db;
