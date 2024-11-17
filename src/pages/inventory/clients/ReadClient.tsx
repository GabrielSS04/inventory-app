import React, { useEffect, useState } from 'react';

interface Client {
    id: number;
    nome: string;
    cpf_cnpj: string;
    contato: string;
    endereco: string;
}

export const ReadClient: React.FC = () => {
    const [clientes, setClientes] = useState<Client[]>([]);
    const [filteredClientes, setFilteredClientes] = useState<Client[]>([]);
    const [searchName, setSearchName] = useState('');
    const [searchCpfCnpj, setSearchCpfCnpj] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/client');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setClientes(data);
                setFilteredClientes(data); // Inicializa o filtro com todos os clientes
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClientes();
    }, []);

    // Aplica os filtros sempre que um dos termos mudar
    useEffect(() => {
        const filtered = clientes.filter(cliente => {
            const matchesName = cliente.nome.toLowerCase().includes(searchName.toLowerCase());
            const matchesCpfCnpj = cliente.cpf_cnpj.includes(searchCpfCnpj);
            return matchesName && matchesCpfCnpj;
        });
        setFilteredClientes(filtered);
    }, [searchName, searchCpfCnpj, clientes]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="client-list">
            <div className="filter">
                <input
                    type="text"
                    placeholder="Buscar por nome"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="search-input"
                />
                <input
                    type="text"
                    placeholder="Buscar por CPF/CNPJ"
                    value={searchCpfCnpj}
                    onChange={(e) => setSearchCpfCnpj(e.target.value)}
                    className="search-input"
                />
            </div>
            <ul className='list-clients-li'>
                {filteredClientes.map(cliente => (
                    <li key={cliente.id}>
                        <p><strong>ID: {cliente.id}</strong></p>
                        <p>Nome: {cliente.nome}</p>
                        <p>CPF/CNPJ: {cliente.cpf_cnpj}</p>
                        <p>Contato: {cliente.contato}</p>
                        <p>Endereço: {cliente.endereco}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
