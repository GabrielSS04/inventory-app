// src/components/ListFornecedores.tsx
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

  // Função para buscar os fornecedores
  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/fornecedor');
        if (!response.ok) {
          throw new Error('Erro ao buscar fornecedores');
        }
        const data = await response.json();
        setFornecedores(data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchFornecedores();
  }, []);

  // Função para deletar um fornecedor
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/fornecedor/delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar fornecedor');
      }

      // Atualiza a lista removendo o fornecedor deletado
      setFornecedores(fornecedores.filter(fornecedor => fornecedor.id !== id));
      alert('Fornecedor deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar fornecedor:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Fornecedores</h2>
      <ul className='list-fornecedor-ul'>
        {fornecedores.map((fornecedor) => (
          <li key={fornecedor.id}>
            <p>
              Nome: {fornecedor.nome} <br />
              CNPJ: {fornecedor.cnpj} <br />
              Contato: {fornecedor.contato} <br />
              Endereço: {fornecedor.endereco}
            </p>
            <button onClick={() => handleDelete(fornecedor.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListFornecedores;
