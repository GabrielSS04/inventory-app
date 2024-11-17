import express from 'express';
import { TransacaoUseCases } from './transacaoUseCases';

const router = express.Router();
const transacaoUseCases = new TransacaoUseCases();

router.post('/create', (req, res) => {
    const {data, tipo, valor, pedidoId, produtoId } = req.body;
    try {
        transacaoUseCases.createTransacao(data, tipo, valor, pedidoId, produtoId);
        res.status(201).send({ message: 'Transacao criado com sucesso' });
    } catch {
        res.status(400).send({ error: "error.message" });
    }
});

router.get('/', async (req, res) => {
    try {
        const transacoes = await transacaoUseCases.readAllTransacao();
        res.status(200).json(transacoes);
    } catch (error) {
        console.error('Erro ao buscar transacoes:', error); 
        res.status(500).json({ error: Error }); 
    }
});


export default router;
