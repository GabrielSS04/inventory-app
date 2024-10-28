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

        db.run("DROP TABLE IF EXISTS pedidos", (err) => {
            if (err) {
                console.error("Erro ao excluir a tabela 'pedidos':", err.message);
            } else {
                console.log("Tabela 'pedidos' excluída com sucesso.");
            }
        });

        // Adicione mais tabelas, se necessário
    });
};

