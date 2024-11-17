import React, { useState } from "react";
import { PedidoProvider } from "./PedidoContext";

import "./style.css";
import { PedidoForm } from "./pedidoForm";
import { PedidoList } from "./PedidoList";
import { PedidoUpdate } from "./PedidoUpdate";
import { PedidoDelete } from "./PedidoDelete";

export const Pedidos = () => {
  // Estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState("add");

  return (
    <>
      <h1 className="aux">Pedidos</h1>
      <div className="pedidos-container">
        <PedidoProvider>
          {/* Navegação */}
          <nav className="pedido-nav">
            <button
              onClick={() => setActiveTab("add")}
              className={activeTab === "add" ? "active" : ""}
            >
              Adicionar Pedido
            </button>
            <button
              onClick={() => setActiveTab("list")}
              className={activeTab === "list" ? "active" : ""}
            >
              Listar Pedidos
            </button>
            <button
              onClick={() => setActiveTab("update")}
              className={activeTab === "update" ? "active" : ""}
            >
              Atualizar Pedido
            </button>
            <button
              onClick={() => setActiveTab("delete")}
              className={activeTab === "delete" ? "active" : ""}
            >
              Deletar Pedido
            </button>
          </nav>
          {/* Conteúdo por Aba */}
          <div className="tab-content">
            {activeTab === "add" && (
              <div className="add-pedido">
                <PedidoForm
                  onPedidoCreated={() => {
                    console.log("Pedido criado!");
                  }}
                />
              </div>
            )}
            {activeTab === "list" && (
              <div className="list-pedidos">
                <PedidoList />
              </div>
            )}
            {activeTab === "update" && (
              <div className="update-pedidos">
                <PedidoUpdate />
              </div>
            )}
            {activeTab === "delete" && (
              <div className="delete-pedido">
                <PedidoDelete />
              </div>
            )}
          </div>
        </PedidoProvider>
      </div>
    </>
  );
};
