
import React, { useEffect, useState } from 'react';

interface Pedido {
  id: number;
  data: Date;
  clienteId: number;
  status: string;
  total: number;
}

export const PedidoDelete: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [selectedPedidoId, setSelectedPedidoId] = useState<number | null>(null);

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
    setSelectedPedidoId(pedidoId);
  };

  const handleDelete = async () => {
    if (selectedPedidoId !== null) {
      try {
        const response = await fetch(`http://localhost:3000/api/pedido/delete/${selectedPedidoId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Erro ao deletar o pedido');
        }

        // Atualiza a lista de pedidos após a deleção
        setPedidos((prev) => prev.filter((pedido) => pedido.id !== selectedPedidoId));
        alert('Pedido deletado com sucesso!');
        setSelectedPedidoId(null); // Reseta a seleção após deletar
      } catch (error) {
        console.error('Erro ao deletar o pedido:', error);
      }
    }
  };

  return (
    <div className="delete-pedido">
      <h1>Deletar Pedido</h1>
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
      <button onClick={handleDelete} disabled={selectedPedidoId === null}>
        Deletar Pedido
      </button>
    </div>
  );
};
