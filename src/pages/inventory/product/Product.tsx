import React, { useState } from "react";

import "./style.css";
import { ProductProvider } from "./ProductContext";
import CreateProduct from "./CreateProduct";
import { ListProduct } from "./ListProduct";
import { ProductUpdate } from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

export const Product = () => {
  // Estado para controlar a aba selecionada
  const [activeTab, setActiveTab] = useState("create");

  return (
    <>
    <h1 className="aux">aux</h1>
        <div className="functions-product">
          <ProductProvider>
            <nav className="product-nav">
              <button
                onClick={() => setActiveTab("create")}
                className={activeTab === "create" ? "active" : ""}
              >
                Criar Produto
              </button>
              <button
                onClick={() => setActiveTab("list")}
                className={activeTab === "list" ? "active" : ""}
              >
                Listar Produtos
              </button>
              <button
                onClick={() => setActiveTab("update")}
                className={activeTab === "update" ? "active" : ""}
              >
                Editar Produto
              </button>
              <button
                onClick={() => setActiveTab("delete")}
                className={activeTab === "delete" ? "active" : ""}
              >
                Deletar Produto
              </button>
            </nav>
            {/* Renderização Condicional */}
            <div className="tab-content">
              {activeTab === "create" && (
                <div className="create-product">
                  <CreateProduct />
                </div>
              )}
              {activeTab === "list" && (
                <div className="list-product">
                  <ListProduct />
                </div>
              )}
              {activeTab === "update" && (
                <div className="update-product">
                  <ProductUpdate />
                </div>
              )}
              {activeTab === "delete" && (
                <div className="delete-product">
                  <DeleteProduct />
                </div>
              )}
            </div>
          </ProductProvider>
        
        </div>
    </>
  );
};
