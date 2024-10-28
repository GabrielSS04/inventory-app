// src/contexts/FornecedorContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  contato: string;
  endereco: string;
}

interface FornecedorContextData {
  fornecedores: Fornecedor[];
  addFornecedor: (novoFornecedor: Omit<Fornecedor, 'id'>) => Promise<void>;
  getAllFornecedores: () => Promise<void>;
}

const FornecedorContext = createContext<FornecedorContextData | undefined>(undefined);

export const FornecedorProvider = ({ children }: { children: ReactNode }) => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  // Função para adicionar fornecedor
  const addFornecedor = async (novoFornecedor: Omit<Fornecedor, 'id'>) => {
    try {
      const response = await fetch('http://localhost:3000/api/fornecedor/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoFornecedor),
      });

      if (response.ok) {
        const createdFornecedor = await response.json();
        setFornecedores((prev) => [...prev, createdFornecedor]);
      } else {
        console.error('Erro ao criar fornecedor');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  // Função para buscar todos os fornecedores
  const getAllFornecedores = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/fornecedor');
      if (response.ok) {
        const fornecedoresList = await response.json();
        setFornecedores(fornecedoresList);
      } else {
        console.error('Erro ao buscar fornecedores');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  // Buscar fornecedores ao carregar o contexto
  useEffect(() => {
    getAllFornecedores();
  }, []);

  return (
    <FornecedorContext.Provider value={{ fornecedores, addFornecedor, getAllFornecedores }}>
      {children}
    </FornecedorContext.Provider>
  );
};

export const useFornecedorContext = () => {
  const context = useContext(FornecedorContext);
  if (!context) throw new Error("useFornecedorContext deve ser usado dentro de um FornecedorProvider");
  return context;
};
