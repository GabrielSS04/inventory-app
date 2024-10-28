import React, { useEffect, useState } from 'react';
import { usePedidoContext } from './PedidoContext';

interface Cliente {
  id: number;
  nome: string;
}

export const AddPedido: React.FC = () => {
  const { addPedido } = usePedidoContext();

  const [data, setData] = useState('');
  const [clientId, setClientId] = useState<number | ''>('');
  const [status, setStatus] = useState('');
  const [total, setTotal] = useState<number | ''>('');
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/client');
        if (!response.ok) throw new Error('Erro ao buscar clientes');
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    };
    fetchClientes();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!data || clientId === '' || !status || total === '') {
      alert('Preencha todos os campos');
      return;
    }
  
    // Conversão da data para o formato Date
    const convertedDate = new Date(data); // Mantenha como um objeto Date
    
    // Verifica se a conversão foi bem-sucedida
    if (isNaN(convertedDate.getTime())) {
      alert('Data inválida. Por favor, insira uma data válida.');
      return;
    }
  
    // Preparação do pedido com tipos corretos
    const newPedido = {
      data: convertedDate, // Envia como Date
      clientId: Number(clientId), // Confirmação do tipo number
      status,
      total: Number(total), // Confirmação do tipo number
    };
  
    // Chama a função addPedido do contexto e limpa o formulário
    await addPedido(newPedido);
    setData('');
    setClientId('');
    setStatus('');
    setTotal('');
  };
  
  
  
  

  return (
    <div className='create-pedido'>
      <h2>Adicionar Pedido</h2>
      <form onSubmit={handleSubmit} className='form-create-pedido'>
        <label>Data:</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />

        <label>Cliente:</label>
        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value ? Number(e.target.value) : '')}
          required
        >
          <option value="">Selecione um cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>

        <label>Status:</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />

        <label>Total:</label>
        <input
          type="number"
          value={total}
          onChange={(e) => setTotal(e.target.value ? Number(e.target.value) : '')}
          required
        />

        <button type="submit">Adicionar Pedido</button>
      </form>
    </div>
  );
};
