import React, { createContext, useState, ReactNode } from 'react';

interface Cliente {
  nome: string;
  cpf_cnpj: string;
  contato: string;
  endereco: string;
}


interface ClientContextType {
  clientes: Cliente[];
  adicionarCliente: (cliente: Cliente) => void;
}

export const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const adicionarCliente = (cliente: Cliente) => {
    setClientes([...clientes, cliente]);
  };

  return (
    <ClientContext.Provider value={{ clientes, adicionarCliente }}>
      {children}
    </ClientContext.Provider>
  );
};
