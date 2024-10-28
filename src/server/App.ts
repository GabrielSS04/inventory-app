import express from 'express';
import cors from "cors";
import productRoutes from './products/routesProduct'; 
import clientRoutes from "./clientes/clientRoutes";
import fornecedorRoutes from "./fornecedor/fornecedorRoutes";
import pedidoRoutes from "./pedidos/pedidoRoutes"
import { initializeDatabase } from './database/db';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173'
}));
const PORT = 3000;

app.use(express.json()); 

initializeDatabase();

app.use('/api/products', productRoutes); 
app.use('/api/client', clientRoutes); 
app.use('/api/fornecedor', fornecedorRoutes); 
app.use('/api/pedido', pedidoRoutes)


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
