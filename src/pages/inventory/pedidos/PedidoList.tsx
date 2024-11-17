import React, { useEffect, useState } from "react";

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

export const PedidoList: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filteredPedidos, setFilteredPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchDate, setSearchDate] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [sortBy, setSortBy] = useState<"data" | "total">("data");

  // Função para buscar os pedidos
  const fetchPedidos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/pedido");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Pedidos carregados:", data); // Verifique a resposta da API
      setPedidos(data);
      setFilteredPedidos(data); // Inicialmente, os pedidos filtrados são todos os pedidos
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Efeito para buscar os pedidos na primeira renderização
  useEffect(() => {
    fetchPedidos();
  }, []);


  // Efeito para aplicar filtros e ordenação
  useEffect(() => {
    let filtered = pedidos;

    // Filtra por data, se houver valor no campo de busca
    if (searchDate) {
      filtered = filtered.filter(
        (pedido) => pedido.data.split("T")[0] === searchDate
      );
    }

    // Filtra por status, se houver valor no select
    if (searchStatus) {
      filtered = filtered.filter((pedido) =>
        pedido.status.toLowerCase() === searchStatus.toLowerCase()
      );
    }

    // Ordena os pedidos com base na escolha
    if (sortBy === "data") {
      filtered = filtered.sort(
        (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
      );
    } else if (sortBy === "total") {
      filtered = filtered.sort((a, b) => a.total - b.total);
    }

    setFilteredPedidos(filtered);
  }, [searchDate, searchStatus, sortBy, pedidos]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pedido-list">
      <h2>Lista de Pedidos</h2>

      {/* Filtros */}
      <div className="filter">
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          placeholder="Filtrar por data"
        />

        <select
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
        >
          <option value="">Filtrar por status</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluído">Concluído</option>
          <option value="Cancelado">Cancelado</option>
          
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "data" | "total")}
        >
          <option value="data">Ordenar por Data</option>
          <option value="total">Ordenar por Valor Total</option>
        </select>
      </div>

      {/* Lista de pedidos */}
      <ul className="list-pedidos-ul">
        {filteredPedidos.map((pedido) => {
          const data = new Date(pedido.data);

          return (
            <div key={pedido.id} className="pedido-card">
              <h3>Pedido #{pedido.id}</h3>
              <p>Data: {data.toLocaleDateString()}</p>
              <p>Cliente ID: {pedido.clienteId}</p>
              <p>Status: {pedido.status}</p>
              <p>Total: R$ {pedido.total.toFixed(2).replace(".", ",")}</p>

              <h4>Itens:</h4>
              <ul>
                {pedido.itens.map((item, index) => (
                  <li key={index}>
                    <p>Produto ID: {item.produtoId}</p>
                    <p>Quantidade: {item.quantidade}</p>
                    <p>Preço Unitário: R$ {item.precoUnitario.toFixed(2).replace(".", ",")}</p>
                    <p>
                      Total do Item: R${" "}
                      {(item.quantidade * item.precoUnitario)
                        .toFixed(2)
                        .replace(".", ",")}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </ul>      
    </div>
  );
};
