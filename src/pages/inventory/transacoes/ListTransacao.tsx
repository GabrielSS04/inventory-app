import React, { useEffect, useState } from 'react';

type Transacao = {
    id: number;
    data: number; // A data vem como timestamp
    tipo: string;
    valor: number;
    pedidoId: number;
    produtoId: number;
};

const ListTransacao: React.FC = () => {
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [filteredTransacoes, setFilteredTransacoes] = useState<Transacao[]>([]);
    const [searchData, setSearchData] = useState('');
    const [searchTipo, setSearchTipo] = useState('');

    useEffect(() => {
        const fetchTransacoes = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/transacao');
                const data = await response.json();
                setTransacoes(data);
                setFilteredTransacoes(data);
            } catch (error) {
                console.error("Erro ao buscar transações:", error);
            }
        };

        fetchTransacoes();
    }, []);

    // Filtro em tempo real para "data" e "tipo"
    useEffect(() => {
        const filtered = transacoes.filter((transacao) => {
            const dataFormatada = new Date(transacao.data).toLocaleDateString();
            const tipoMatch = transacao.tipo.toLowerCase().includes(searchTipo.toLowerCase());
            const dataMatch = dataFormatada.includes(searchData);
            return tipoMatch && dataMatch;
        });

        setFilteredTransacoes(filtered);
    }, [searchData, searchTipo, transacoes]);

    return (
        <div className='transactions'>
            <h2>Lista de Transações</h2>

            {/* Campos de Filtro */}
            <div className="filter">
                <input
                    type="text"
                    placeholder="Filtrar por data (dd/mm/aaaa)"
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filtrar por tipo (entrada/saída)"
                    value={searchTipo}
                    onChange={(e) => setSearchTipo(e.target.value)}
                />
            </div>

            {filteredTransacoes.length > 0 ? (
                <ul className='transactions-list'>
                    {filteredTransacoes.map((transacao) => (
                        <li key={transacao.id}>
                            <p><strong>ID:</strong> {transacao.id}</p>
                            <p><strong>Data:</strong> {new Date(transacao.data).toLocaleDateString()}</p>
                            <p><strong>Tipo:</strong> {transacao.tipo}</p>
                            <p><strong>Valor:</strong> {transacao.valor}</p>
                            <p><strong>Pedido ID:</strong> {transacao.pedidoId}</p>
                            <p><strong>Produto ID:</strong> {transacao.produtoId}</p>
                            <hr />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhuma transação encontrada.</p>
            )}
        </div>
    );
};

export default ListTransacao;
