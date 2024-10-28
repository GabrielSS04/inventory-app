import express from 'express';
import { ProductUseCases } from './productUseCases';

const router = express.Router();
const productUseCases = new ProductUseCases();

router.post('/create', (req, res) => {
    const { nome, descricao, preco, quantidade, imagem } = req.body;
    try {
        productUseCases.createProduct(nome, descricao, preco, quantidade, imagem);
        res.status(201).send({ message: 'Produto criado com sucesso' });
    } catch {
        res.status(400).send({ error: "error.message" });
    }
});

router.get('/', (req, res) => {
    try {
        const produtos = productUseCases.readAllProducts();
        res.status(200).json(produtos);
    } catch {
        res.status(500).send({ error: "error.message" });
    }
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const produto = productUseCases.readTransaction(id);
        res.status(200).json(produto);
    } catch {
        res.status(404).send({ error: "error.message" });
    }
});

router.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, descricao, preco, quantidade, imagem } = req.body;
    try {
        productUseCases.updateProduct(id, nome, descricao, preco, quantidade, imagem);
        res.status(200).send({ message: 'Produto atualizado com sucesso' });
    } catch {
        res.status(404).send({ error: "error.message" });
    }
});

router.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
        productUseCases.deleteProduct(id);
        res.status(200).send({ message: 'Produto deletado com sucesso' });
    } catch {
        res.status(404).send({ error: "error.message" });
    }
});

export default router;
