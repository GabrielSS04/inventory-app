import db from './db';

export const deleteTables = () => {
    db.serialize(() => {
        db.run("DROP TABLE IF EXISTS clientes", (err) => {
            if (err) {
                console.error("Erro ao excluir a tabela 'clientes':", err.message);
            } else {
                console.log("Tabela 'clientes' excluída com sucesso.");
            }
        });

        db.run("DROP TABLE IF EXISTS fornecedores", (err) => {
            if (err) {
                console.error("Erro ao excluir a tabela 'fornecedores':", err.message);
            } else {
                console.log("Tabela 'fornecedores' excluída com sucesso.");
            }
        });

        db.run("DROP TABLE IF EXISTS pedidos", (err) => {
            if (err) {
                console.error("Erro ao excluir a tabela 'pedidos':", err.message);
            } else {
                console.log("Tabela 'pedidos' excluída com sucesso.");
            }
        });

        db.run("DROP TABLE IF EXISTS produtos", (err) => {
            if (err) {
                console.error("Erro ao excluir a tabela 'produtos':", err.message);
            } else {
                console.log("Tabela 'produtos' excluída com sucesso.");
            }
        });

        db.run("DROP TABLE IF EXISTS itemPedido", (err) => {
            if (err) {
                console.error("Erro ao excluir a tabela 'itemPedido':", err.message);
            } else {
                console.log("Tabela 'itemPedido' excluída com sucesso.");
            }
        });

        db.run("DROP TABLE IF EXISTS transacao", (err) => {
            if (err) {
                console.error("Erro ao excluir a tabela 'transacao':", err.message);
            } else {
                console.log("Tabela 'transacao' excluída com sucesso.");
            }
        });

        // Adicione mais tabelas, se necessário
    });
};

