import React, { useEffect, useState } from 'react';

interface Pedido {
  id: number;
  data: Date;
  clienteId: number;
  status: string;
  total: number;
  itens: ItemPedido[];
}

interface ItemPedido {
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
}

export const PedidoDelete: React.FC = () => {
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
    const selected = pedidos.find((pedido) => pedido.id === pedidoId);
    if (selected) {
      setSelectedPedido(selected);
    }
  };

  const excluirItem = async (index: number) => {
    if (selectedPedido) {
      const itemToDelete = selectedPedido.itens[index];

      try {
        const response = await fetch(
          `http://localhost:3000/api/pedido/delete-item/${selectedPedido.id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ produtoId: itemToDelete.produtoId }),
          }
        );

        if (!response.ok) {
          throw new Error('Erro ao excluir item');
        }

        // Atualiza os itens do pedido
        const novosItens = selectedPedido.itens.filter((_, i) => i !== index);
        setSelectedPedido({ ...selectedPedido, itens: novosItens });

        alert('Item deletado com sucesso!');
      } catch (error) {
        console.error('Erro ao deletar item:', error);
      }
    }
  };

  const handleDeletePedido = async () => {
    if (selectedPedido) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/pedido/delete/${selectedPedido.id}`,
          {
            method: 'DELETE',
          }
        );

        if (!response.ok) {
          throw new Error('Erro ao deletar o pedido');
        }

        // Atualiza a lista de pedidos após a deleção
        setPedidos((prev) => prev.filter((pedido) => pedido.id !== selectedPedido.id));
        alert('Pedido deletado com sucesso!');
        setSelectedPedido(null); // Reseta a seleção após deletar
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

      {selectedPedido && (
        <div>
          <h2>Itens do Pedido</h2>
          <ul>
            {selectedPedido.itens.map((item, index) => (
              <li key={index}>
                Produto ID: {item.produtoId}, Quantidade: {item.quantidade}, Preço Unitário: {item.precoUnitario}{' '}
                <button onClick={() => excluirItem(index)}>Excluir Item</button>
              </li>
            ))}
          </ul>

          <button className='button-style' onClick={handleDeletePedido}>Deletar Pedido</button>
        </div>
      )}
    </div>
  );
};
