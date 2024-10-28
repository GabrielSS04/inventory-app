// src/App.tsx
import React from 'react';
import { FornecedorProvider } from './FornecedorContext';
import AddFornecedor from './AddFornecedor';

import "./style.css"
import ListFornecedores from './ListFornecedores';
import { UpdateFornecedor } from './UpdateFornecedor';
import { DeleteFornecedor } from './DeleteFornecedor';

export function Fornecedores() {
  return (
    <FornecedorProvider>
      <div className='functions-fornecedor'>
        <h1>Cadastro de Fornecedores</h1>
        <div className="add-fornecedor">
          <AddFornecedor />
        </div>
        <div className="list-fornecedor">
          <ListFornecedores />
        </div>
        <div className="update-fornecedor">
        <UpdateFornecedor />
        </div>
        <div className="delete-fornecedor">
          <DeleteFornecedor/>
        </div>
      </div>
    </FornecedorProvider>
  );
}