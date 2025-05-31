// backend/server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Carrega as variáveis de ambiente

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middlewares ---
// Habilita CORS para todas as origens (em produção, especifique origens permitidas)
app.use(cors());
// Habilita o parsing de JSON no corpo das requisições
app.use(express.json());

// --- Simulação de Banco de Dados ---
// Em uma aplicação real, você conectaria a um DB como MongoDB, PostgreSQL, MySQL, etc.


let tarefas = [
    { 
        id: 1, 
        name: 'Tarefa 1',
        titulo: 'Titulo 1',
        descricao: 'Lorem ipus',
        status: 0,
        dataCriacao: '2025-04-08',
        dataConclusao: '' 
    }
];
let nextIdTarefa = 2; // Para gerar novos IDs

// --- Rotas da API ---

// GET /api/tarefas - Retorna todas as tarefas
app.get('/api/tarefas', (req, res) => {
    res.json(tarefas);
});

// GET /api/tarefas/:id - Retorna uma tarefa específica
app.get('/api/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarefa = tarefas.find(i => i.id === id);
    if (tarefa) {
        res.json(tarefa);
    } else {
        res.status(404).json({ message: 'Tarefa não encontrado' });
    }
});

// POST /api/tarefas - Adiciona uma nova tarefa
app.post('/api/tarefas', (req, res) => {
    const newTarefaName = req.body.name;
    if (!newTarefaName) {
        return res.status(400).json({ message: 'Nome da tarefa é obrigatório' });
    }
    const newTarefa = { id: nextIdTarefa++, name: newTarefaName };
    tarefas.push(newTarefa);
    res.status(201).json(newTarefa); // 201 Created
});

// PUT /api/tarefas/:id - Atualiza uma tarefa existente
app.put('/api/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedName = req.body.name;
    const tarefaIndex = tarefas.findIndex(i => i.id === id);

    if (tarefaIndex > -1) {
        tarefas[tarefaIndex].name = updatedName;
        res.json(tarefas[tarefaIndex]);
    } else {
        res.status(404).json({ message: 'Tarefa não encontrada' });
    }
});

// DELETE /api/tarefas/:id - Deleta uma tarefa
app.delete('/api/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = tarefas.length;
    tarefas = tarefas.filter(i => i.id !== id);

    if (tarefas.length < initialLength) {
        res.status(204).send(); // 204 No Content
    } else {
        res.status(404).json({ message: 'Tarefa não encontrada' });
    }
});

// --- Inicia o Servidor ---
app.listen(PORT, () => {
    console.log(`Backend API rodando em http://localhost:${PORT}`);
});