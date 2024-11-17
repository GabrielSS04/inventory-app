import db from '../database/db';
import { Product } from "./ProductEntitie";

interface ProductRow {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    fornecedorId: number;
    imagem: string;
}

export class ProductUseCases {

    async createProduct(nome: string, descricao: string, preco: number, quantidade: number, fornecedorId: number, imagem: string) {
        return new Promise<Product>((resolve, reject) => {
            const sql = `INSERT INTO produtos (nome, descricao, preco, quantidade, fornecedorId, imagem) VALUES (?, ?, ?, ?, ?, ?)`;

            db.run(sql, [nome, descricao, preco, quantidade, fornecedorId, imagem], function (err: Error | null) {
                if (err) {
                    reject(err);
                } else {
                    const newProduct = new Product(nome, descricao, preco, quantidade, fornecedorId, imagem);
                    newProduct.setId(this.lastID);

                    // Criar a transação de entrada automaticamente após criar o produto
                    const transacaoSql = `INSERT INTO transacao (data, tipo, valor, pedidoId, produtoId) VALUES (?, ?, ?, ?, ?)`;
                    const data = Date.now(); // Timestamp atual
                    const tipo = 'entrada'; // Tipo de transação
                    const valor = preco * quantidade; // Valor da transação baseado no preço e quantidade
                    const pedidoId = 0; // Pedido ID igual a 0 conforme solicitado
                    const produtoId = this.lastID; // ID do produto recém-criado

                    db.run(transacaoSql, [data, tipo, valor, pedidoId, produtoId], function (err: Error | null) {
                        if (err) {
                            console.error('Erro ao criar transação:', err);
                            reject(err);
                        } else {
                            console.log("Transação de entrada criada com sucesso");
                            resolve(newProduct); // Resolver o produto após a transação ser criada
                        }
                    });
                }
            });
        });
    }

    async readAllProduct() {
        return new Promise<Product[]>((resolve, reject) => {
            const sql = `SELECT * FROM produtos`;
            db.all(sql, [], (err: Error | null, rows: ProductRow[]) => {
                if (err) {
                    console.error('Erro ao buscar produtos:', err);
                    reject(err);
                } else {
                    const produtos = rows.map((row) => {
                        const produto = new Product(row.nome, row.descricao, row.preco, row.quantidade, row.fornecedorId, row.imagem);
                        produto.setId(row.id);
                        return produto;
                    });
                    resolve(produtos);
                }
            });
        });
    }

    async readOneProduct(id: number) {
        return new Promise<Product>((resolve, reject) => {
            const sql = `SELECT * FROM produtos WHERE id = ?`;
            db.get(sql, [id], (err: Error | null, row: ProductRow | undefined) => {
                if (err) {
                    reject(err);
                } else if (!row) {
                    reject(new Error("not found"));
                } else {
                    const produto = new Product(row.nome, row.descricao, row.preco, row.quantidade, row.fornecedorId, row.imagem);
                    produto.setId(row.id);
                    resolve(produto);
                }
            });
        });
    }

    async updateProduct(id: number, nome?: string, descricao?: string, preco?: number, quantidade?: number, fornecedorId?: number, imagem?: string) {
        return new Promise<void>((resolve, reject) => {
            const sql = `
                UPDATE produtos
                SET nome = COALESCE(?, nome),
                    descricao = COALESCE(?, descricao),
                    preco = COALESCE(?, preco),
                    quantidade = COALESCE(?, quantidade),
                    fornecedorId = COALESCE(?, fornecedorId),
                    imagem = COALESCE(?, imagem)
                WHERE id = ?`;

            db.run(sql, [nome, descricao, preco, quantidade, fornecedorId, imagem, id], function (err: Error | null) {
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

    async deleteProduct(id: number) {
        return new Promise<void>((resolve, reject) => {
            const sql = `DELETE FROM produtos WHERE id = ?`;
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
