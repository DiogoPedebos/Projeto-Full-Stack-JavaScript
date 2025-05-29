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

let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
];
let nextId = 3; // Para gerar novos IDs



let tarefas = [
    { id: 1, name: 'Tarefa 1' },
    { id: 2, name: 'Tarefa 2' }
];
let nextIdTarefa = 3; // Para gerar novos IDs





// --- Rotas da API ---

// GET /api/items - Retorna todos os items
app.get('/api/items', (req, res) => {
    res.json(items);
});

// GET /api/items/:id - Retorna um item específico
app.get('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item não encontrado' });
    }
});

// POST /api/items - Adiciona um novo item
app.post('/api/items', (req, res) => {
    const newItemName = req.body.name;
    if (!newItemName) {
        return res.status(400).json({ message: 'Nome do item é obrigatório' });
    }
    const newItem = { id: nextId++, name: newItemName };
    items.push(newItem);
    res.status(201).json(newItem); // 201 Created
});

// PUT /api/items/:id - Atualiza um item existente
app.put('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedName = req.body.name;
    const itemIndex = items.findIndex(i => i.id === id);

    if (itemIndex > -1) {
        items[itemIndex].name = updatedName;
        res.json(items[itemIndex]);
    } else {
        res.status(404).json({ message: 'Item não encontrado' });
    }
});

// DELETE /api/items/:id - Deleta um item
app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = items.length;
    items = items.filter(i => i.id !== id);

    if (items.length < initialLength) {
        res.status(204).send(); // 204 No Content
    } else {
        res.status(404).json({ message: 'Item não encontrado' });
    }
});




// GET /api/items - Retorna todos os items
app.get('/api/tarefas', (req, res) => {
    res.json(tarefas);
});

// GET /api/items/:id - Retorna um item específico
app.get('/api/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarefa = tarefas.find(i => i.id === id);
    if (tarefa) {
        res.json(tarefa);
    } else {
        res.status(404).json({ message: 'Tarefa não encontrado' });
    }
});

// POST /api/items - Adiciona uma nova tarefa
app.post('/api/tarefas', (req, res) => {
    const newTarefaName = req.body.name;
    if (!newTarefaName) {
        return res.status(400).json({ message: 'Nome do tarefa é obrigatório' });
    }
    const newTarefa = { id: nextIdTarefa++, name: newTarefaName };
    tarefa.push(newTarefa);
    res.status(201).json(newTarefa); // 201 Created
});

// PUT /api/items/:id - Atualiza uma tarefa existente
app.put('/api/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedName = req.body.name;
    const tarefaIndex = tarefas.findIndex(i => i.id === id);

    if (tarefaIndex > -1) {
        tarefas[tarefaIndex].name = updatedName;
        res.json(tarefa[tarefaIndex]);
    } else {
        res.status(404).json({ message: 'Tarefa não encontrado' });
    }
});

// DELETE /api/items/:id - Deleta uma tarefa
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