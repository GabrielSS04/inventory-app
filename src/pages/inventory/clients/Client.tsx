import React from "react";

import "./style.css"
import { CreateClient } from "./CreateClient";
import { ClientProvider } from "./ClientContext";
import { ReadClient } from "./ReadClient";
import { ClientUpdate } from "./ClientUpdate";
import { ClientDelete } from "./ClientDelete";

export const Client = () => {
    return (
        <>
            <h1>Clients</h1>

            
                <ClientProvider >
                    <div className="client-function">
                        <CreateClient/>
                        <ReadClient/>
                        <ClientUpdate/>
                        <ClientDelete/>
                    </div>
                </ClientProvider>

            
            
        </>
    );
}