import React, { createContext, useContext, useState, useEffect } from 'react';

interface ItemPedido {
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
}

interface Pedido {
  id: number;
  data: Date;
  clientId: number;
  status: string;
  total: number;
  itens: ItemPedido[]; // Inclui os itens do pedido
}

interface PedidoContextType {
  pedidos: Pedido[];
  fetchPedidos: () => Promise<void>;
  addPedido: (pedido: Omit<Pedido, 'id'>) => Promise<void>;
  updatePedido: (id: number, updatedPedido: Omit<Pedido, 'id'>) => Promise<void>;
  deletePedido: (id: number) => Promise<void>;
}

const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

export const PedidoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const fetchPedidos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/pedido');
      const data = await response.json();
      const pedidosComData = data.map((pedido: Pedido) => ({
        ...pedido,
        data: new Date(pedido.data),
        itens: pedido.itens || [] // Carrega os itens do pedido
      }));
      setPedidos(pedidosComData);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  const addPedido = async (pedido: Omit<Pedido, 'id'>) => {
    try {
      console.log("Dados enviados para criar o pedido:", { pedido });

      const response = await fetch('http://localhost:3000/api/pedido/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido),
      });
      if (!response.ok) throw new Error('Erro ao criar pedido');
      await fetchPedidos();
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
    }
  };

  const updatePedido = async (id: number, updatedPedido: Omit<Pedido, 'id'>) => {
    try {
      const response = await fetch(`http://localhost:3000/api/pedido/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPedido),
      });
      if (!response.ok) throw new Error('Erro ao atualizar pedido');
      await fetchPedidos();
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
    }
  };

  const deletePedido = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/pedido/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar pedido');
      await fetchPedidos();
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <PedidoContext.Provider value={{ pedidos, fetchPedidos, addPedido, updatePedido, deletePedido }}>
      {children}
    </PedidoContext.Provider>
  );
};

export const usePedidoContext = () => {
  const context = useContext(PedidoContext);
  if (!context) throw new Error('usePedidoContext deve ser usado dentro de um PedidoProvider');
  return context;
};
