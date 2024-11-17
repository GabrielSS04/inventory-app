import React, { useState } from "react";

import "./style.css";
import { CreateClient } from "./CreateClient";
import { ClientProvider } from "./ClientContext";
import { ReadClient } from "./ReadClient";
import { ClientUpdate } from "./ClientUpdate";
import { ClientDelete } from "./ClientDelete";

export const Client = () => {
  // Estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState("create");

  return (
    <>
        <h1 className="aux">aux</h1>


      <div className="client-div">
          <ClientProvider>
            {/* Navegação */}
            <nav className="client-nav">
              <button
                onClick={() => setActiveTab("create")}
                className={activeTab === "create" ? "active" : ""}
              >
                Criar Cliente
              </button>
              <button
                onClick={() => setActiveTab("read")}
                className={activeTab === "read" ? "active" : ""}
              >
                Listar Clientes
              </button>
              <button
                onClick={() => setActiveTab("update")}
                className={activeTab === "update" ? "active" : ""}
              >
                Editar Cliente
              </button>
              <button
                onClick={() => setActiveTab("delete")}
                className={activeTab === "delete" ? "active" : ""}
              >
                Deletar Cliente
              </button>
            </nav>
            {/* Conteúdo por Aba */}
            <div className="tab-content">
              {activeTab === "create" && (
                <div className="create-client">
                  <CreateClient />
                </div>
              )}
              {activeTab === "read" && (
                <div className="read-client">
                  <ReadClient />
                </div>
              )}
              {activeTab === "update" && (
                <div className="update-client">
                  <ClientUpdate />
                </div>
              )}
              {activeTab === "delete" && (
                <div className="delete-client">
                  <ClientDelete />
                </div>
              )}
            </div>
          </ClientProvider>
      </div>
    </>
  );
};
