import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definindo o tipo do produto
type Product = {
  id: number;
  name: string;
  price: number;
};

// Tipos para o contexto
type ProductContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (id: number) => void;
};

// Criando o contexto com valor inicial vazio
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Criando o Provider para encapsular os componentes
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Funções para manipular os produtos
  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const response = await fetch('http://localhost:4000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao criar o produto');
      }
  
      const newProduct = await response.json();
      setProducts([...products, newProduct]); // Adiciona o novo produto à lista de produtos no estado
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
  };

  const deleteProduct = (id: number) => setProducts(products.filter((product) => product.id !== id));

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext deve ser usado dentro de um ProductProvider');
  }
  return context;
};
