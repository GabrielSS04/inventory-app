import express from 'express';
import cors from 'cors';
import path from 'path'; // Importando path para ajudar com caminhos
import productRoutes from './products/routesProduct'; 
import clientRoutes from './clientes/clientRoutes';
import fornecedorRoutes from './fornecedor/fornecedorRoutes';
import pedidoRoutes from './pedidos/pedidoRoutes';
import transacaoRoutes from "./transacao/transacaoRoutes";
import { initializeDatabase } from './database/db';

const app = express();
const PORT = 3000;

// Configurando CORS
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Servindo arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware para tratar JSON
app.use(express.json()); 



// Inicializando o banco de dados
initializeDatabase();

// Registrando rotas
app.use('/api/products', productRoutes); 
app.use('/api/client', clientRoutes); 
app.use('/api/fornecedor', fornecedorRoutes); 
app.use('/api/pedido', pedidoRoutes);
app.use('/api/transacao', transacaoRoutes);

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
