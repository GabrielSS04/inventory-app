import React, { useEffect, useState } from 'react';

interface ItemPedido {
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
}

interface Pedido {
  id: number;
  data: string;
  clienteId: number;
  status: string;
  total: number;
  itens: ItemPedido[];
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
    const selected = pedidos.find((pedido) => pedido.id === pedidoId);
    if (selected) {
      setSelectedPedido(selected);
    }
  };

  const excluirItem = (index: number) => {
    if (selectedPedido) {
      const novosItens = selectedPedido.itens.filter((_, i) => i !== index);
      setSelectedPedido({ ...selectedPedido, itens: novosItens });
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
        const response = await fetch(
          `http://localhost:3000/api/pedido/update/${selectedPedido.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...selectedPedido,
              data: new Date(selectedPedido.data).toISOString(), // Converte para string compatível
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Erro ao atualizar o pedido');
        }

        const updatedPedido = await response.json();
        
        // Atualiza a lista de pedidos após a alteração
        setPedidos((prevPedidos) =>
          prevPedidos.map((pedido) =>
            pedido.id === updatedPedido.id ? updatedPedido : pedido
          )
        );

        alert('Pedido atualizado com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar o pedido:', error);
      }
    }
  };

  return (
    <div className="update-pedido">
      <form onSubmit={handleSubmit}>
        <h1>Atualizar Pedido</h1>

        <label htmlFor="pedido-id">Selecione o Pedido (ID):</label>
        <select
          id="pedido-id"
          onChange={(e) => handlePedidoSelect(Number(e.target.value))}
          value={selectedPedido ? selectedPedido.id : ''}
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
            <div className="input-update-pedido">
              <label htmlFor="data">Data:</label>
              <input
                type="date"
                id="data"
                name="data"
                value={new Date(selectedPedido.data).toISOString().substring(0, 10)}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-update-pedido">
              <label htmlFor="clienteId">Cliente ID:</label>
              <input
                type="number"
                id="clienteId"
                name="clienteId"
                value={selectedPedido.clienteId}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-update-pedido">
              <label htmlFor="status">Status:</label>
              <input
                type="text"
                id="status"
                name="status"
                value={selectedPedido.status}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-update-pedido">
              <label htmlFor="total">Total:</label>
              <input
                type="number"
                id="total"
                name="total"
                value={selectedPedido.total}
                onChange={handleInputChange}
              />
            </div>

            <h3>Itens do Pedido</h3>
            <ul>
              {selectedPedido.itens.map((item, index) => (
                <li key={index}>
                  Produto ID: {item.produtoId}, Quantidade: {item.quantidade}, Preço Unitário: {item.precoUnitario}{' '}
                  <button type="button" onClick={() => excluirItem(index)}>
                    Excluir Item
                  </button>
                </li>
              ))}
            </ul>

            <button type="submit">Atualizar Pedido</button>
          </div>
        )}
      </form>
    </div>
  );
};
