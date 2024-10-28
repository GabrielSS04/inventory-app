import React, { useEffect, useState } from 'react';

interface Fornecedor {
  id: number;
  nome: string;
  cpf_cnpj: string;
  contato: string;
  endereco: string;
}

export const DeleteFornecedor: React.FC = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [selectedFornecedorId, setSelectedFornecedorId] = useState<number | null>(null);

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/fornecedor');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFornecedores(data);
      } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
      }
    };

    fetchFornecedores();
  }, []);

  const handleFornecedorSelect = (fornecedorId: number) => {
    setSelectedFornecedorId(fornecedorId);
  };

  const handleDelete = async () => {
    if (selectedFornecedorId !== null) {
      try {
        const response = await fetch(`http://localhost:3000/api/fornecedor/delete/${selectedFornecedorId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Erro ao deletar o fornecedor');
        }

        // Atualiza a lista de fornecedores após a deleção
        setFornecedores((prev) => prev.filter((fornecedor) => fornecedor.id !== selectedFornecedorId));
        alert('Fornecedor deletado com sucesso!');
        setSelectedFornecedorId(null); // Reseta a seleção após deletar
      } catch (error) {
        console.error('Erro ao deletar o fornecedor:', error);
      }
    }
  };

  return (
    <div className="delete-fornecedor">
      <h1>Deletar Fornecedor</h1>
      <label htmlFor="fornecedor-id">Selecione o Fornecedor (ID):</label>
      <select
        id="fornecedor-id"
        onChange={(e) => handleFornecedorSelect(Number(e.target.value))}
      >
        <option value="">Selecione um fornecedor</option>
        {fornecedores.map((fornecedor) => (
          <option key={fornecedor.id} value={fornecedor.id}>
            ID: {fornecedor.id} - Nome: {fornecedor.nome}
          </option>
        ))}
      </select>
      <button onClick={handleDelete} disabled={selectedFornecedorId === null}>
        Deletar Fornecedor
      </button>
    </div>
  );
};
