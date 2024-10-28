// src/components/AddFornecedor.tsx
import React, { useState } from 'react';
import { useFornecedorContext } from './FornecedorContext';

const AddFornecedor = () => {
  const { addFornecedor } = useFornecedorContext();
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [contato, setContato] = useState('');
  const [endereco, setEndereco] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoFornecedor = { nome, cnpj, contato, endereco };
    await addFornecedor(novoFornecedor);

    setNome('');
    setCnpj('');
    setContato('');
    setEndereco('');
  };

  return (
    <form className='form-add-fornecedor' onSubmit={handleSubmit}>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
        required
      />
      <input
        type="text"
        value={cnpj}
        onChange={(e) => setCnpj(e.target.value)}
        placeholder="CNPJ"
        required
      />
      <input
        type="text"
        value={contato}
        onChange={(e) => setContato(e.target.value)}
        placeholder="Contato"
        required
      />
      <input
        type="text"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
        placeholder="Endereço"
        required
      />
      <button type="submit">Adicionar Fornecedor</button>
    </form>
  );
};

export default AddFornecedor;
