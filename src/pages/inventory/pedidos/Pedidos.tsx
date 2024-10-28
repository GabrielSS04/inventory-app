import React from "react";
import { AddPedido } from "./AddPedido";
import { PedidoProvider } from "./PedidoContext";

import "./style.css"
import { PedidoList } from "./PedidoList";
import { PedidoUpdate } from "./PedidoUpdate";
import { PedidoDelete } from "./PedidoDelete";

export const Pedidos = () => {
    return (
        <>
            <h1>Pedidos</h1>
            <PedidoProvider>
                <div className="addpedido">
                    <AddPedido/>
                </div>
                <div className="list-pedidos">
                    <PedidoList/>
                </div>
                <div className="update-pedidos">
                    <PedidoUpdate/>
                </div>
                <div className="delete-pedido">
                    <PedidoDelete/>
                </div>
            </PedidoProvider>
        </>
    );
}