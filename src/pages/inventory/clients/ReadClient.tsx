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
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClientes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="client-list">
            <ul>
            
                {clientes.map(cliente => (
                    <li key={cliente.id}>
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

