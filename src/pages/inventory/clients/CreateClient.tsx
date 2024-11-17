import React, { useState, useContext } from "react";
import { ClientContext } from './ClientContext';

export const CreateClient = () => {
    const clientContext = useContext(ClientContext);
    
    if (!clientContext) {
        throw new Error("ClientContext não está disponível");
    }

    const { adicionarCliente } = clientContext;

    const [getNome, setNome] = useState("");
    const [getCpfCnpj, setCpfCnpj] = useState("");
    const [getContato, setContato] = useState("");
    const [getEndereco, setEndereco] = useState("");

    const CriarJson = () => {
        return {
            nome: getNome,
            cpf_cnpj: getCpfCnpj,
            contato: getContato,
            endereco: getEndereco,
        };
    };

    const CriarCliente = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const novoCliente = CriarJson();
        adicionarCliente(novoCliente);

        try {
            const response = await fetch('http://localhost:3000/api/client/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoCliente),
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            const data = await response.json();
            console.log('Cliente criado com sucesso:', data);
            alert("Cliente criado com sucesso!");

        } catch (error) {
            console.error('Erro ao criar o cliente:', error);
        }
    };

    return (
        <div className="create-client-div">
            
            <form className="create-client">
            <h1>Create Client</h1>
                <div>
                    <label htmlFor="nome">Nome do Cliente:</label>
                    <input type="text" placeholder="Nome" id="nome" onChange={(e) => setNome(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="cpf_cnpj">CPF/CNPJ do Cliente:</label>
                    <input type="text" placeholder="Cpf ou Cnpj" id="cpf_cnpj" onChange={(e) => setCpfCnpj(e.target.value)} min={10000000000}/>
                </div>

                <div>
                    <label htmlFor="contato">Contato do Cliente:</label>
                    <input type="text" placeholder="Contato" id="contato" onChange={(e) => setContato(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="endereco">Endereço do Cliente:</label>
                    <input type="text" placeholder="Endereço" id="endereco" onChange={(e) => setEndereco(e.target.value)} />
                </div>

                <button className="button-style" onClick={CriarCliente}>Criar Cliente</button>
            </form>
        </div>
    );
};
