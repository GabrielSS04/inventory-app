import express from 'express';
import { ClientUseCases } from './clientUseCases';

const router = express.Router();
const clientUseCase = new ClientUseCases();

router.post('/create', (req, res) => {
    const { nome, cpf_cnpj, contato, endereco } = req.body;
    try {
        clientUseCase.createClient(nome, cpf_cnpj, contato, endereco);
        res.status(201).send({ message: 'Cliente criado com sucesso' });
    } catch {
        res.status(400).send({ error: "error.message" });
    }
});

router.get('/', async (req, res) => {
    try {
        const clientes = await clientUseCase.readAllClient();
        res.status(200).json(clientes);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error); 
        res.status(500).json({ error: Error }); 
    }
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const cliente = clientUseCase.readOneClient(id);
        res.status(200).json(cliente);
    } catch {
        res.status(404).send({ error: "error.message" });
    }
});

router.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, cpf_cnpj, contato, endereco } = req.body;
    try {
        clientUseCase.updateClient(id, nome, cpf_cnpj, contato, endereco);
        res.status(200).send({ message: 'Cliente atualizado com sucesso' });
    } catch {
        res.status(404).send({ error: "error.message" });
    }
});

router.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
        clientUseCase.deleteClient(id);
        res.status(200).send({ message: 'Cliente deletado com sucesso' });
    } catch {
        res.status(404).send({ error: "error.message" });
    }
});

export default router;
