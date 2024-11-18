import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useProductContext } from './ProductContext';

interface Fornecedor {
  id: number;
  nome: string;
}

const CreateProduct: React.FC = () => {
  const { addProduct } = useProductContext();
  
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState(0);
  const [quantidade, setQuantidade] = useState(1);
  const [imagem, setImagem] = useState<File | null>(null);
  const [fornecedorId, setFornecedorId] = useState<number | null>(null);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  // Função para buscar fornecedores do backend
  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/fornecedor');
        const data = await response.json();
        setFornecedores(data);
      } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
      }
    };

    fetchFornecedores();
  }, []);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImagem(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!imagem || !nome || !descricao || preco <= 0 || quantidade <= 0 || !fornecedorId) {
      alert('Preencha todos os campos corretamente');
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('preco', preco.toString());
    formData.append('quantidade', quantidade.toString());
    formData.append('fornecedorId', fornecedorId.toString());
    formData.append('imagem', imagem);

    try {
      console.log(formData);
      await addProduct(formData);
      alert('Produto adicionado com sucesso!');
      
      setNome('');
      setDescricao('');
      setPreco(0);
      setQuantidade(1);
      setImagem(null);
      setFornecedorId(null);
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  return (
    <form className='form-create-product' onSubmit={handleSubmit} encType="multipart/form-data">

      <h2>Criar Produto</h2>

      <div className="inputs-create">
        <div className='inputs-create-product' >
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div className='inputs-create-product'>
          <label>Descrição:</label>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required className='input-desc'/>
        </div>
        <div className='inputs-create-product'>
          <label>Preço:</label>
          <input type="number" min={0.01} step={0.01} value={preco} onChange={(e) => setPreco(Number(e.target.value))} required />
        </div>
        <div className='inputs-create-product'>
          <label>Quantidade:</label>
          <input type="number" min={1} value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))} required />
        </div>
        <div className='inputs-create-product'>
          <label>Fornecedor:</label>
          <select value={fornecedorId ?? ''} onChange={(e) => setFornecedorId(Number(e.target.value))} required>
            <option value="">Selecione um fornecedor</option>
            {fornecedores.map((fornecedor) => (
              <option key={fornecedor.id} value={fornecedor.id}>
                {fornecedor.nome}
              </option>
            ))}
          </select>
        </div>
        <div className='inputs-create-product'>
          <label>Imagem:</label>
          <input type="file" onChange={handleImageChange} required />
        </div>
      </div>

      <button className='button-style' type="submit">Criar Produto</button>
      
    </form>
  );
};

export default CreateProduct;
