import React, { useEffect, useState } from 'react';

interface Client {
  id: number;
  name: string;
  cpf_cnpj: string;
  contato: string;
  endereco: string;
}

export const ClientDelete: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

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
    setSelectedClientId(clientId);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedClientId) {
      try {
        const response = await fetch(`http://localhost:3000/api/client/delete/${selectedClientId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error('Erro ao deletar o cliente');
        }

        const data = await response.json();
        alert('Cliente deletado com sucesso!' + data);
        
        // Atualiza a lista de clientes após a deleção
        setClients(clients.filter(client => client.id !== selectedClientId));
        setSelectedClientId(null); // Limpa a seleção

      } catch (error) {
        console.error('Erro ao deletar o cliente:', error);
      }
    }
  };

  return (
    <div className="delete-client">
        
      <form onSubmit={handleSubmit} className='form-delete-client'>
      <h1>Delete Client</h1>
        <label htmlFor="client-id">Selecione o Cliente (ID):</label>
        <select 
          id="client-id" 
          className='select-id-delete'
          onChange={(e) => handleClientSelect(Number(e.target.value))}
          value={selectedClientId ?? ""}
        >
          <option value="">Selecione um cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              Cliente ID: {client.id}
            </option>
          ))}
        </select>

        <button className='button-style' type="submit">Deletar</button>
      </form>
    </div>
  );
};
