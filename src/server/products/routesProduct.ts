import express from 'express';
import multer from 'multer';
import { ProductUseCases } from './productUseCases';

// Configuração do multer para armazenar imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pasta onde as imagens serão armazenadas
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Renomeia o arquivo para evitar conflitos
    },
});

const upload = multer({ storage });

const router = express.Router();
const productUseCases = new ProductUseCases();

// Endpoint para criar um produto, agora com suporte para upload de imagem
router.post('/create', upload.single('imagem'), async (req, res) => {
    const { nome, descricao, preco, quantidade, fornecedorId } = req.body;

    

    // A imagem está disponível em req.file
    const imagem = req.file?.path; // Obtém o caminho da imagem enviada

    // Verifica se a imagem foi enviada
    if (!imagem) {
        return res.status(400).send({ message: 'Imagem é obrigatória' });
    }

    try {
        await productUseCases.createProduct(nome, descricao, preco, quantidade, fornecedorId, imagem);
        res.status(201).send({ message: 'Produto criado com sucesso' });
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(400).send({ message: 'Erro ao criar produto' });
    }
});

router.get('/', async (req, res) => {
    try {
        const produtos = await productUseCases.readAllProduct();
        res.status(200).json(produtos);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).send({ message: 'Erro ao buscar produtos' });
    }
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const produto = await productUseCases.readOneProduct(id);
        res.status(200).json(produto);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(404).send({ message: 'Produto não encontrado' });
    }
});

router.put('/update/:id', upload.single('imagem'), async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, descricao, preco, quantidade, fornecedorId } = req.body;

    // Verifica se uma nova imagem foi enviada
    const imagem = req.file ? req.file.path : undefined;

    try {
        await productUseCases.updateProduct(id, nome, descricao, preco, quantidade, fornecedorId, imagem);
        res.status(200).send({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(404).send({ message: 'Produto não encontrado' });
    }
});


router.delete('/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await productUseCases.deleteProduct(id);
        res.status(200).send({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(404).send({ message: 'Produto não encontrado' });
    }
});

export default router;
