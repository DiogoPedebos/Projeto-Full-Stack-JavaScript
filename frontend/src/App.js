// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Opcional: para estilos básicos

// Define a URL base da sua API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function App() {  

  const [tarefas, setTarefas] = useState([]);
  const [newTarefaName, setNewTarefaName] = useState([]);
  const [editingTarefa, setEditingTarefa] = useState([]);
  const [editedTarefaName, setEditedTarefaName] = useState(''); // Novo nome da tarefa editada

  // --- Funções de Requisição à API ---

  // Função para buscar todas as tarefas
  const fetchTarefas = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tarefas`)
      setTarefas(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  // Função para adicionar uma nova tarefa
  const addTarefa = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tarefas`, {name: newTarefaName});
      setTarefas([...tarefas, response.data]);
      setNewTarefaName('');
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  // Função para iniciar a edição de uma tarefa
  const startEditing = (tarefa) => {
    setEditingTarefa(tarefa);
    setNewTarefaName(tarefa.name);
  };

  // Função para cancelar a edição
  const cancelEditing = () => {
    setEditingTarefa(null);
    setNewTarefaName('');
  }

  // Função para atualizar uma tarefa
  const updateTarefa = async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tarefas/${id}`, { name: editedTarefaName });
      // Atualiza a tarefa no estado
      setTarefas(tarefas.map(tarefa => (tarefa.id === id ? response.data : tarefa)));
      cancelEditing(); // Sai do modo de edição
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  // Função para deletar uma tarefa 
  const deleteTarefa = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/tarefas/${id}`);
      setTarefas(tarefas.filter(tarefa => tarefa.id !== id)); // Remove a tarefa do estado
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  // --- Efeito para carregar as tarefas na montagem do componente ---
  useEffect(() => {
    fetchTarefas()
  }, []); // Array de dependências vazio: executa uma vez na montagem



  return (
    <div className="App">
      <header className="App-header">
        <h1>Minha Lista de tarefas (React + Node.js)</h1>

        {/* Formulário para Adicionar tarefa */}
        <div>
          <input
            type="text"
            placeholder="Nome da nova tarefa"
            value={newTarefaName}
            onChange={(e) => setNewTarefaName(e.target.value)}
          />
          <button onClick={addTarefa}> Adicionar Tarefa</button>
        </div>


        {/* Lista de Tarefa */}
        <h2>Tarefas:</h2>
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa.id}>
              {editingTarefa && editingTarefa.id === tarefa.id ? (
                <>
                  <input
                    type="text"
                    value={editedTarefaName}
                    onChange={(e) => setEditedTarefaName(e.target.value)}
                    />
                    <button onClick={() => updateTarefa(tarefa.id)}>Salvar</button>
                    <button onClick={cancelEditing}>Cancelar</button>
                </>
              ) : (
                <>
                  {tarefa.name}
                  <button onClick={() => startEditing(tarefa)}>Editar</button>
                  <button onClick={() => deleteTarefa(tarefa.id)}>Deletar</button>
                </>
              )}
            </li>
          ))}
        </ul>



      </header>
    </div>
  );
}

export default App;