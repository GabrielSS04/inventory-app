// src/components/FornecedorUpdate.tsx
import React, { useEffect, useState } from 'react';

interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  contato: string;
  endereco: string;
}

export const UpdateFornecedor: React.FC = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [selectedFornecedor, setSelectedFornecedor] = useState<Fornecedor | null>(null);

  // Busca todos os fornecedores
  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/fornecedor');
        if (!response.ok) {
          throw new Error('Erro na resposta da rede');
        }
        const data = await response.json();
        setFornecedores(data);
      } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
      }
    };

    fetchFornecedores();
  }, []);

  // Seleciona o fornecedor ao escolher no dropdown
  const handleFornecedorSelect = (fornecedorId: number) => {
    const selected = fornecedores.find(fornecedor => fornecedor.id === fornecedorId);
    if (selected) {
      setSelectedFornecedor(selected);
    }
  };

  // Atualiza o fornecedor selecionado conforme o usuário altera os campos
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedFornecedor) {
      setSelectedFornecedor({
        ...selectedFornecedor,
        [event.target.name]: event.target.value,
      });
    }
  };

  // Envia a atualização do fornecedor para o backend
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedFornecedor) {
      try {
        const response = await fetch(`http://localhost:3000/api/fornecedor/update/${selectedFornecedor.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedFornecedor),
        });

        if (!response.ok) {
          throw new Error('Erro ao atualizar o fornecedor');
        }

        alert('Fornecedor atualizado com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar o fornecedor:', error);
      }
    }
  };

  return (
    <div className="update-fornecedor">
      <form onSubmit={handleSubmit} className='form-update-fornecedor'>
        <h1>Atualizar Fornecedor</h1>

        <label htmlFor="fornecedor-id">Selecione o Fornecedor (ID):</label>
        <select
          id="fornecedor-id"
          onChange={(e) => handleFornecedorSelect(Number(e.target.value))}
        >
          <option value="">Selecione um fornecedor</option>
          {fornecedores.map((fornecedor) => (
            <option key={fornecedor.id} value={fornecedor.id}>
              Nome: {fornecedor.nome} - ID: {fornecedor.id}
            </option>
          ))}
        </select>

        {selectedFornecedor && (
          <div className="inputs-update-fornecedor">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={selectedFornecedor.nome}
              onChange={handleInputChange}
            />
            <label htmlFor="cnpj">CNPJ:</label>
            <input
              type="text"
              id="cnpj"
              name="cnpj"
              value={selectedFornecedor.cnpj}
              onChange={handleInputChange}
            />
            <label htmlFor="contato">Contato:</label>
            <input
              type="text"
              id="contato"
              name="contato"
              value={selectedFornecedor.contato}
              onChange={handleInputChange}
            />
            <label htmlFor="endereco">Endereço:</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              value={selectedFornecedor.endereco}
              onChange={handleInputChange}
            />
            <button type="submit">Salvar</button>
          </div>
        )}
      </form>
    </div>
  );
};
