import React, { useEffect, useState } from 'react';
import { useProductContext } from './ProductContext';
import './style.css';

export const ListProduct: React.FC = () => {
  const { products, fetchProducts } = useProductContext();
  const [filteredProducts, setFilteredProducts] = useState(products); // Estado para armazenar os produtos filtrados
  const [searchNome, setSearchNome] = useState(''); // Estado para o filtro de nome do produto
  const [searchFornecedor, setSearchFornecedor] = useState(''); // Estado para o filtro de nome do fornecedor
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Estado para ordenar os produtos por preço

  useEffect(() => {
    fetchProducts(); // Carrega os produtos quando o componente monta
  }, [fetchProducts]);

  useEffect(() => {
    // Aplica os filtros e ordenação sempre que o estado dos filtros ou produtos mudar
    let filtered = products.filter((product) => {
      const nomeMatch = product.nome.toLowerCase().includes(searchNome.toLowerCase());
      const fornecedorMatch = product.fornecedorId.toString().includes(searchFornecedor.toLowerCase());

      return nomeMatch && fornecedorMatch;
    });

    // Ordena os produtos com base no preço
    if (sortOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.preco - b.preco);
    } else {
      filtered = filtered.sort((a, b) => b.preco - a.preco);
    }

    setFilteredProducts(filtered); // Atualiza a lista de produtos filtrados
  }, [searchNome, searchFornecedor, sortOrder, products]);

  return (
    <div>
      <h2>Lista de Produtos</h2>
      
      <div className="filter">
        <input
          type="text"
          placeholder="Filtrar por nome do produto"
          value={searchNome}
          onChange={(e) => setSearchNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por fornecedor"
          value={searchFornecedor}
          onChange={(e) => setSearchFornecedor(e.target.value)}
        />
        <select onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')} value={sortOrder}>
          <option value="asc">Preço Crescente</option>
          <option value="desc">Preço Decrescente</option>
        </select>
      </div>

      <div className='lista-produtos-cards' style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
            <h3>{product.nome}</h3>
            <p className="desc-product">{product.descricao}</p>
            <div className="info-product">
              <p>R$ {product.preco}</p>
              <p>{product.quantidade} unid</p>
            </div>
            {product.imagem && (
              <div className="image-bg">
                <img
                  className="product-image"
                  src={`http://localhost:3000/${product.imagem}`} // Usando crase para interpolação
                  alt={product.nome}
                />
              </div>
            )}
            <p>{product.fornecedorId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
