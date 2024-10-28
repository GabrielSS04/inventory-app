import React, { useEffect, useState } from 'react';

interface Client {
  id: number;
  nome: string;
  cpf_cnpj: string;
  contato: string;
  endereco: string;
}

export const ClientUpdate: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/client');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const handleClientSelect = (clientId: number) => {
    const selected = clients.find(client => client.id === clientId);
    if (selected) {
      setSelectedClient(selected);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedClient) {
      setSelectedClient({
        ...selectedClient,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedClient) {
      try {
        const response = await fetch(`http://localhost:3000/api/client/update/${selectedClient.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedClient), // Usa o objeto selecionado diretamente
        });
        
        if (!response.ok) {
          throw new Error('Erro ao atualizar o cliente');
        }

        const data = await response.json();
        alert('Cliente atualizado com sucesso!' + data);
      } catch (error) {
        console.error('Erro ao atualizar o cliente:', error);
      }
    }
  };

  return (
    <div className="update-client">
      
      <form onSubmit={handleSubmit}>
      <h1>Update Client</h1>

        <label htmlFor="client-id">Selecione o Cliente (ID):</label>
        <select
          id="client-id"
          className='select-client-updt'
          onChange={(e) => handleClientSelect(Number(e.target.value))}
        >
          <option value="">Selecione um cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              Nome:{client.nome} - ID: {client.id}
            </option>
          ))}
        </select>

        {selectedClient && (
          <div className='inputs-update-client'>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              name="name"
              className='input-client'
              value={selectedClient.nome}
              onChange={handleInputChange}
            />
            <label htmlFor="cpf_cnpj">CPF/CNPJ:</label>
            <input
              type="text"
              id="cpf_cnpj"
              name="cpf_cnpj"
              className='input-client'
              value={selectedClient.cpf_cnpj}
              onChange={handleInputChange}
            />
            <label htmlFor="contato">Contato:</label>
            <input
              type="text"
              id="contato"
              name="contato"
              className='input-client'
              value={selectedClient.contato}
              onChange={handleInputChange}
            />
            <label htmlFor="endereco">Endereço:</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              className='input-client'
              value={selectedClient.endereco}
              onChange={handleInputChange}
            />
            <button className='salvar-client' type="submit">Salvar</button>
          </div>
        )}
      </form>
    </div>
  );
};
