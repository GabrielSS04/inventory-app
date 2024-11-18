import React, { useState } from 'react';

interface PedidoInput {
  data: string;
  clientId: number;
  status: string;
  itens: ItemPedidoInput[];
}

interface ItemPedidoInput {
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
}

interface PedidoFormProps {
  onPedidoCreated: () => void; // Função chamada após criar o pedido
}

export const PedidoForm: React.FC<PedidoFormProps> = ({ onPedidoCreated }) => {
  const [data, setData] = useState('');
  const [clientId, setClientId] = useState<number | ''>('');
  const [status, setStatus] = useState('Em andamento');
  const [itens, setItens] = useState<ItemPedidoInput[]>([]);

  const [produtoId, setProdutoId] = useState<number | ''>('');
  const [quantidade, setQuantidade] = useState<number | ''>('');
  const [precoUnitario, setPrecoUnitario] = useState<number | ''>('');

  const adicionarItem = () => {
    if (produtoId && quantidade && precoUnitario) {
      const novoItem: ItemPedidoInput = {
        produtoId: Number(produtoId),
        quantidade: Number(quantidade),
        precoUnitario: Number(precoUnitario),
      };
      setItens([...itens, novoItem]);

      setProdutoId('');
      setQuantidade('');
      setPrecoUnitario('');
    }
  };

  const excluirItem = (index: number) => {
    const novosItens = itens.filter((_, i) => i !== index);
    setItens(novosItens);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoPedido: PedidoInput = {
      data,
      clientId: Number(clientId),
      status,
      itens,
    };

    try {
      const response = await fetch('http://localhost:3000/api/pedido/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoPedido),
      });

      if (response.ok) {
        alert('Pedido criado com sucesso!');

        setData('');
        setClientId('');
        setStatus('Em andamento');
        setItens([]);

        onPedidoCreated(); // Chama a função para atualizar a lista de pedidos
      } else {
        alert('Erro ao criar o pedido.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-pedido">
      <h2>Criar Pedido</h2>
      <div>
        <label>Data: </label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Cliente ID: </label>
        <input
          type="number"
          value={clientId}
          onChange={(e) => setClientId(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Status: </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluído">Concluído</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>

      <h3>Itens do Pedido</h3>
      <div>
        <label>Produto ID: </label>
        <input
          type="number"
          value={produtoId}
          onChange={(e) => setProdutoId(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Quantidade: </label>
        <input
          type="number"
          min={1}
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Preço Unitário: </label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          value={precoUnitario}
          onChange={(e) => setPrecoUnitario(Number(e.target.value))}
        />
      </div>
      <button type="button" onClick={adicionarItem}>
        Adicionar Item
      </button>

      <h4>Itens Adicionados</h4>
      <ul>
        {itens.map((item, index) => (
          <li key={index}>
            Produto ID: {item.produtoId}, Quantidade: {item.quantidade}, Preço: {item.precoUnitario}{' '}
            <button type="button" onClick={() => excluirItem(index)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>

      <button className='button-style' type="submit">Criar Pedido</button>
    </form>
  );
};
