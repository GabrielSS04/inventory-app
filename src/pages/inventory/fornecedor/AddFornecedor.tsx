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
      <div className="input-create-fornecedor">
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div className="input-create-fornecedor">
        <label htmlFor="cnpj">CNPJ:</label>
        <input
          type="text"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          required
        />
      </div>
      <div className="input-create-fornecedor">
        <label htmlFor="contato">Contato:</label>
        <input
          type="text"
          value={contato}
          onChange={(e) => setContato(e.target.value)}
          required
        />
      </div>
      <div className="input-create-fornecedor">
        <label htmlFor="endereco">Endereço:</label>
        <input
          type="text"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          required
        />
      </div>
      <button className='button-style' type="submit">Adicionar Fornecedor</button>
    </form>
  );
};

export default AddFornecedor;
