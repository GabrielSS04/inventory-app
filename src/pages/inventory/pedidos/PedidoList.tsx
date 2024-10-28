import React, { useEffect, useState } from "react";

interface Pedido {
  id: number;
  data: Date;
  clienteId: number;
  status: string;
  total: number;
}

export const PedidoList: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/pedido");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setPedidos(data);
        
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
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
        {pedidos.map((pedido) => {
            console.log(pedido);
          const data =
            typeof pedido.data === "string" || typeof pedido.data === "number"
              ? new Date(pedido.data)
              : pedido.data;

          return (
            <div key={pedido.id} className="pedido-card">
              <p>Data: {data.toLocaleDateString()}</p>
              <p>Cliente ID: {pedido.clienteId}</p>
              <p>Status: {pedido.status}</p>
              <p>Total: {pedido.total}</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
