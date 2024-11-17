import { Router } from 'express';
import { PedidoUseCases } from './pedidoUseCase';
import { ItemPedido } from '../itemPedido/ItemPedidoEntitie';

const router = Router();
const pedidoUseCases = new PedidoUseCases();

// Criar pedido
router.post('/create', async (req, res) => {
    try {
        const { data, clientId, status, itens }: { data: Date, clientId: number, status: string, itens: ItemPedido[] } = req.body;

        // Validação dos dados (exemplo simples)
        if (!data || !clientId || !status || !itens || itens.length === 0) {
            return res.status(400).json({ message: 'Dados insuficientes para criar o pedido.' });
        }

        const pedido = await pedidoUseCases.createPedido(data, clientId, status, itens);
        res.status(201).json(pedido); // Retorna o pedido criado

    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        res.status(500).json({ message: 'Erro ao criar pedido.' });
    }
});

// Listar todos os pedidos
router.get('/', async (req, res) => {
    try {
        const pedidos = await pedidoUseCases.readAllPedidos();
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        res.status(500).json({ message: 'Erro ao listar pedidos.' });
    }
});

// Ler um pedido específico
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await pedidoUseCases.readOnePedidos(Number(id));
        res.status(200).json(pedido);
    } catch (error) {
        console.error('Erro ao ler pedido:', error);
        res.status(404).json({ message: 'Pedido não encontrado.' });
    }
});

// Atualizar um pedido
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { data, clientId, status, itens }: { data?: Date, clientId?: number, status?: string, itens?: ItemPedido[] } = req.body;
    
    try {
        await pedidoUseCases.updatePedido(Number(id), data, clientId, status, itens);
        res.status(200).json({ message: 'Pedido atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
        res.status(500).json({ message: 'Erro ao atualizar pedido.' });
    }
});

// Deletar um pedido
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pedidoUseCases.deletePedido(Number(id));
        res.status(200).json({ message: 'Pedido deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar pedido:', error);
        res.status(500).json({ message: 'Erro ao deletar pedido.' });
    }
});

export default router;
