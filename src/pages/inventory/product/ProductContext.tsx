import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Defina a interface para o produto, incluindo o fornecedorId
interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  imagem: string;
  fornecedorId: number; // Novo campo para o fornecedor
}

// Defina a interface para o contexto
interface ProductContextType {
  products: Product[];
  fetchProducts: () => void;
  addProduct: (product: FormData) => Promise<void>;
  updateProduct: (id: number, updatedProductData: FormData) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

// Cria o contexto com valor inicial undefined
const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Função para buscar todos os produtos
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  // Função para adicionar um produto, incluindo fornecedorId
  const addProduct = async (productData: FormData) => {
    try {
      const response = await fetch('http://localhost:3000/api/products/create', {
        method: 'POST',
        body: productData, // Enviar FormData com dados e imagem
      });
      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  // Função para atualizar um produto (agora aceita FormData para permitir atualização de imagem)
  const updateProduct = async (id: number, updatedProductData: FormData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/update/${id}`, {
        method: 'PUT',
        body: updatedProductData, // Enviar dados com FormData
      });
      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  // Função para deletar um produto
  const deleteProduct = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, fetchProducts, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook para usar o ProductContext
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext deve ser usado dentro de ProductProvider');
  }
  return context;
};
