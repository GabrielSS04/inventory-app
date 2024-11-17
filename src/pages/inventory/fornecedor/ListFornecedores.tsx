import React, { useEffect, useState } from 'react';

interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  contato: string;
  endereco: string;
}

const ListFornecedores: React.FC = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [filteredFornecedores, setFilteredFornecedores] = useState<Fornecedor[]>([]);
  const [searchNome, setSearchNome] = useState('');
  const [searchContato, setSearchContato] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os fornecedores
  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/fornecedor');
        if (!response.ok) {
          throw new Error('Erro ao buscar fornecedores');
        }
        const data = await response.json();

        // Garante que 'data' é um array antes de definir no estado
        const fornecedoresOrdenados = Array.isArray(data)
          ? data.sort((a: Fornecedor, b: Fornecedor) => a.nome.localeCompare(b.nome))
          : [];

        setFornecedores(fornecedoresOrdenados);
        setFilteredFornecedores(fornecedoresOrdenados);
        setLoading(false);
      } catch {
        setError('Erro ao carregar fornecedores');
        setLoading(false);
      }
    };

    fetchFornecedores();
  }, []);

  // Aplica os filtros sempre que os termos de busca mudarem
  useEffect(() => {
    const filtered = fornecedores.filter((fornecedor) =>
      fornecedor.nome.toLowerCase().includes(searchNome.toLowerCase()) &&
      fornecedor.contato.toLowerCase().includes(searchContato.toLowerCase())
    );
    setFilteredFornecedores(filtered);
  }, [searchNome, searchContato, fornecedores]);

  if (loading) {
    return <p>Carregando fornecedores...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Lista de Fornecedores</h2>

      {/* Campos de busca */}
      <div className="filter">
        <input
          type="text"
          placeholder="Buscar por nome"
          value={searchNome}
          onChange={(e) => setSearchNome(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Buscar por contato"
          value={searchContato}
          onChange={(e) => setSearchContato(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Lista de fornecedores */}
      <ul className="list-fornecedor-ul">
        {filteredFornecedores.map((fornecedor) => (
          <li key={fornecedor.id} className="list-item">
            <div className="card-fornecedor">
              <strong>Nome:</strong> {fornecedor.nome} <br />
              <strong>CNPJ:</strong> {fornecedor.cnpj} <br />
              <strong>Contato:</strong> {fornecedor.contato} <br />
              <strong>Endereço:</strong> {fornecedor.endereco}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListFornecedores;
