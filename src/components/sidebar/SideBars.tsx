import React from 'react';
import { Product } from '../../pages/inventory/product/Product';
import { Client } from '../../pages/inventory/clients/Client';

import "./style.css"
import { Fornecedores } from '../../pages/inventory/fornecedor/Fornecedores';
import { Pedidos } from '../../pages/inventory/pedidos/Pedidos';
import { Transacoes } from '../../pages/inventory/transacoes/Transacoes';

interface SidebarProps {
  onSelect: (component: React.ReactNode) => void;
}

export const Sidebars: React.FC<SidebarProps> = ({ onSelect }) => {
  return (
    <div className='sidebar'>
      <button onClick={() => onSelect(<Product/>)}>Products</button>
      <button onClick={() => onSelect(<Client/>)}>Clients</button>
      <button onClick={() => onSelect(<Fornecedores/>)}>Fornecedores</button>
      <button onClick={() => onSelect(<Pedidos/>)}>Pedidos</button>
      <button onClick={() => onSelect(<Transacoes/>)}>Transaçoes</button>
    </div>
  );
};
