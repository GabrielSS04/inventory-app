import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  imagem: string;
}

export const ProductUpdate: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null); // Novo estado para imagem

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductSelect = (productId: number) => {
    const selected = products.find(product => product.id === productId);
    if (selected) {
      setSelectedProduct(selected);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedProduct) {
      try {
        const formData = new FormData();
        formData.append('nome', selectedProduct.nome);
        formData.append('descricao', selectedProduct.descricao);
        formData.append('preco', selectedProduct.preco.toString());
        formData.append('quantidade', selectedProduct.quantidade.toString());

        if (newImage) {
          formData.append('imagem', newImage); // Adiciona a nova imagem se existir
        }

        const response = await fetch(`http://localhost:3000/api/products/update/${selectedProduct.id}`, {
          method: 'PUT',
          body: formData, // Envia o FormData
        });

        if (!response.ok) {
          throw new Error('Erro ao atualizar produto');
        }

        alert('Produto atualizado com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar o produto:', error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Editar Produtos</h2>

        <label htmlFor="product-id">Selecione o Produto (ID):</label>
        <select
          id="product-id"
          className="select-product-updt"
          onChange={(e) => handleProductSelect(Number(e.target.value))}
        >
          <option value="">Selecione um produto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              Nome: {product.nome} - ID: {product.id}
            </option>
          ))}
        </select>

        {selectedProduct && (
          <div className="inputs-update-product">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="input-product"
              value={selectedProduct.nome}
              onChange={handleInputChange}
            />
            <label htmlFor="descricao">Descrição:</label>
            <input
              type="text"
              id="descricao"
              name="descricao"
              className="input-product"
              value={selectedProduct.descricao}
              onChange={handleInputChange}
            />
            <label htmlFor="preco">Preço:</label>
            <input
              type="number"
              id="preco"
              name="preco"
              className="input-product"
              value={selectedProduct.preco}
              onChange={handleInputChange}
            />
            <label htmlFor="quantidade">Quantidade:</label>
            <input
              type="number"
              id="quantidade"
              name="quantidade"
              className="input-product"
              value={selectedProduct.quantidade}
              onChange={handleInputChange}
            />
            <label htmlFor="imagem">Imagem:</label>
            <input
              type="file"
              id="imagem"
              name="imagem"
              className="input-product"
              onChange={handleImageChange} // Manipula o arquivo selecionado
            />
            <button className="salvar-product" type="submit">
              Salvar
            </button>
          </div>
        )}
      </form>
    </>
  );
};
