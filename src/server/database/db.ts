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

        db.run(`
            CREATE TABLE IF NOT EXISTS fornecedores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                cnpj TEXT NOT NULL,
                contato TEXT NOT NULL,
                endereco TEXT NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela fornecedores:', err.message);
            } else {
                console.log('Tabela de fornecedores verificada/criada.');
            }
        });

        db.run(`
            CREATE TABLE IF NOT EXISTS produtos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                descricao TEXT NOT NULL,
                preco INTEGER NOT NULL,
                quantidade INTEGER NOT NULL,
                fornecedorId INTEGER NOT NULL,
                imagem TEXT NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela produtos:', err.message);
            } else {
                console.log('Tabela de produtos verificada/criada.');
            }
        });

        db.run(`
            CREATE TABLE IF NOT EXISTS itemPedido (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pedidoId INTEGER NOT NULL,
                produtoId INTEGER NOT NULL,
                quantidade INTEGER NOT NULL,
                precoUnitario REAL NOT NULL,
                FOREIGN KEY(pedidoId) REFERENCES pedidos(id) ON DELETE CASCADE,
                FOREIGN KEY(produtoId) REFERENCES produtos(id) ON DELETE CASCADE
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela itemPedido:', err.message);
            } else {
                console.log('Tabela de itemPedido verificada/criada.');
            }
        });

        db.run(`
            CREATE TABLE IF NOT EXISTS transacao (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                data DATE NOT NULL,
                tipo TEXT NOT NULL,
                valor INTEGER NOT NULL,
                pedidoId INTEGER NOT NULL,
                produtoId INTEGER NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela transacao:', err.message);
            } else {
                console.log('Tabela de transacao verificada/criada.');
            }
        });

        db.run(`
            CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                email TEXT NOT NULL,
                password TEXT NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela user:', err.message);
            } else {
                console.log('Tabela de user verificada/criada.');
            }
        });
        

    });
};

export default db;
