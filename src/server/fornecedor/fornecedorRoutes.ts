import express from 'express';
import { FornecedorUseCases } from './fornecedorUseCases';

const router = express.Router();
const fornecedorUseCases = new FornecedorUseCases();

router.post('/create', (req, res) => {
    const { nome, cnpj, contato, endereco } = req.body;
    try {
        fornecedorUseCases.createFornecedor(nome, cnpj, contato, endereco);
        res.status(201).send({ message: 'Fornecedor criado com sucesso' });
    } catch {
        res.status(400).send({ error: "error.message" });
    }
});

router.get('/', async (req, res) => {
    try {
        const fornecedores = await fornecedorUseCases.readAllFornecedores();
        console.log(fornecedores);
        res.status(200).json(fornecedores);
    } catch {
        res.status(500).send({ error: "error.message" });
    }
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const fornecedor = fornecedorUseCases.readOneFornecedor(id);
        res.status(200).json(fornecedor);
    } catch {
        res.status(404).send({ error: "error.message" });
    }
});

router.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, cnpj, contato, endereco } = req.body;
    try {
        fornecedorUseCases.updateFornecedor(id, nome, cnpj, contato, endereco);
        res.status(200).send({ message: 'Fornecedor atualizado com sucesso' });
    } catch {
        res.status(404).send({ error: "error.message" });
    }
});

router.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
        fornecedorUseCases.deleteFornecedor(id);
        res.status(200).send({ message: 'Fornecedor deletado com sucesso' });
    } catch {
        res.status(404).send({ error: "error.message" });
    }
});

export default router;
