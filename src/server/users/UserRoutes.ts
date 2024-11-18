import express from 'express';
import { UserUseCase } from './UserUseCase';

const router = express.Router();
const userUseCase = new UserUseCase();

router.post('/create', (req, res) => {
    const {username, email, password } = req.body;
    try {
        userUseCase.createUser(username, email, password);
        res.status(201).send({ message: 'User criado com sucesso' });
    } catch {
        res.status(400).send({ error: "error.message" });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await userUseCase.readAllUser();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar user:', error); 
        res.status(500).json({ error: Error }); 
    }
});


export default router;
