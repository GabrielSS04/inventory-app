// src/App.tsx
import React, { useState } from "react";
import { FornecedorProvider } from "./FornecedorContext";
import AddFornecedor from "./AddFornecedor";
import ListFornecedores from "./ListFornecedores";
import { UpdateFornecedor } from "./UpdateFornecedor";
import { DeleteFornecedor } from "./DeleteFornecedor";

import "./style.css";

export function Fornecedores() {
  // Estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState("add");

  return (

    <>
          <h1 className="aux">aux</h1>

    <div className="all-fornecedor">
        <FornecedorProvider>
          <div className="functions-fornecedor">
            {/* Navegação */}
            <nav className="fornecedor-nav">
              <button
                onClick={() => setActiveTab("add")}
                className={activeTab === "add" ? "active" : ""}
              >
                Criar Fornecedor
              </button>
              <button
                onClick={() => setActiveTab("list")}
                className={activeTab === "list" ? "active" : ""}
              >
                Listar Fornecedor
              </button>
              <button
                onClick={() => setActiveTab("update")}
                className={activeTab === "update" ? "active" : ""}
              >
                Editar Fornecedor
              </button>
              <button
                onClick={() => setActiveTab("delete")}
                className={activeTab === "delete" ? "active" : ""}
              >
                Deletar Fornecedor
              </button>
            </nav>
            {/* Conteúdo por Aba */}
            <div className="tab-content">
              {activeTab === "add" && (
                <div className="add-fornecedor">
                  <AddFornecedor />
                </div>
              )}
              {activeTab === "list" && (
                <div className="list-fornecedor">
                  <ListFornecedores />
                </div>
              )}
              {activeTab === "update" && (
                <div className="update-fornecedor">
                  <UpdateFornecedor />
                </div>
              )}
              {activeTab === "delete" && (
                <div className="delete-fornecedor">
                  <DeleteFornecedor />
                </div>
              )}
            </div>
          </div>
        </FornecedorProvider>
    </div>
    </>
  );
}
