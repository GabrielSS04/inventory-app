import express from 'express';
import { PedidoUseCases } from './pedidoUseCase';

const router = express.Router();
const pedidosUseCase = new PedidoUseCases();

router.post('/create', (req, res) => {
    const { data, clientId, status, total } = req.body;
    try {
        pedidosUseCase.createPedidos(data, clientId, status, total);
        res.status(201).send({ message: 'Pedido criado com sucesso' });
    } catch {
        res.status(400).send({ error: "error.message" });
    }
});

router.get('/', async (req, res) => {
    try {
        const pedidos = await pedidosUseCase.readAllPedidos();
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error); 
        res.status(500).json({ error: Error }); 
    }
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const pedido = pedidosUseCase.readOnePedidos(id);
        res.status(200).json(pedido);
    } catch {
        res.status(404).send({ error: "error.message" });
    }
});

router.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { data, clientId, status, total } = req.body;
    try {
        pedidosUseCase.updatePedido(id, data, clientId, status, total);
        res.status(200).send({ message: 'Pedido atualizado com sucesso' });
    } catch {
        res.status(404).send({ error: "error.message" });
    }
});

router.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
        pedidosUseCase.deletePedido(id);
        res.status(200).send({ message: 'Pedido deletado com sucesso' });
    } catch {
        res.status(404).send({ error: "error.message" });
    }
});

export default router;
