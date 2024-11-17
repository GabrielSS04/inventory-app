import React from "react";
import ListTransacao from "./ListTransacao";

import "./style.css"

export const Transacoes = () => {
    return (
        <>
            <h1 className="aux">Transações</h1>
            <div className="transacao-functions"><ListTransacao/></div>
        </>
    );
}