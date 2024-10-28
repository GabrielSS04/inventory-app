import React, { useEffect, useState } from 'react';

interface Pedido {
  id: number;
  data: Date;
  clienteId: number;
  status: string;
  total: number;
}

export const PedidoUpdate: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pedido');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  const handlePedidoSelect = (pedidoId: number) => {
    const selected = pedidos.find(pedido => pedido.id === pedidoId);
    if (selected) {
      setSelectedPedido(selected);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedPedido) {
      setSelectedPedido({
        ...selectedPedido,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedPedido) {
      try {
        const response = await fetch(`http://localhost:3000/api/pedido/update/${selectedPedido.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...selectedPedido,
            data: new Date(selectedPedido.data).toISOString(), // Converte para string compatível
          }),
        });

        if (!response.ok) {
          throw new Error('Erro ao atualizar o pedido');
        }

        const data = await response.json();
        alert('Pedido atualizado com sucesso! ' + data);
      } catch (error) {
        console.error('Erro ao atualizar o pedido:', error);
      }
    }
  };

  return (
    <div className="update-pedido">
      <form onSubmit={handleSubmit}>
        <h1>Update Pedido</h1>

        <label htmlFor="pedido-id">Selecione o Pedido (ID):</label>
        <select
          id="pedido-id"
          onChange={(e) => handlePedidoSelect(Number(e.target.value))}
        >
          <option value="">Selecione um pedido</option>
          {pedidos.map((pedido) => (
            <option key={pedido.id} value={pedido.id}>
              ID: {pedido.id} - Status: {pedido.status}
            </option>
          ))}
        </select>

        {selectedPedido && (
          <div className="inputs-update-pedido">
            <label htmlFor="data">Data:</label>
            <input
              type="date"
              id="data"
              name="data"
              value={new Date(selectedPedido.data).toISOString().substring(0, 10)}
              onChange={handleInputChange}
            />

            <label htmlFor="clientId">Cliente ID:</label>
            <input
              type="number"
              id="clientId"
              name="clientId"
              value={selectedPedido.clienteId}
              onChange={handleInputChange}
            />

            <label htmlFor="status">Status:</label>
            <input
              type="text"
              id="status"
              name="status"
              value={selectedPedido.status}
              onChange={handleInputChange}
            />

            <label htmlFor="total">Total:</label>
            <input
              type="number"
              id="total"
              name="total"
              value={selectedPedido.total}
              onChange={handleInputChange}
            />

            <button type="submit">Salvar</button>
          </div>
        )}
      </form>
    </div>
  );
};
