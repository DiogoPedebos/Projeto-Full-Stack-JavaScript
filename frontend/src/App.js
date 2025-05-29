// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Opcional: para estilos básicos

// Define a URL base da sua API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function App() {
  
  // --- Funções de Requisição à API ---

  // Função para buscar todos os items


  // Função para adicionar um novo item


  // Função para iniciar a edição de um item


  // Função para cancelar a edição


  // Função para atualizar um item


  // Função para deletar um item


  // --- Efeito para carregar os items na montagem do componente ---
  useEffect(() => {
    
  }, []); // Array de dependências vazio: executa uma vez na montagem



  return (
    <div className="App">
      <header className="App-header">
        <h1>Minha Lista de tarefas (React + Node.js)</h1>

        {/* Formulário para Adicionar Item */}
        <div>
          <input
            type="text"
            placeholder="Nome da nova tarefa"
          />
          <button>Adicionar Tarefa</button>
        </div>


        {/* Lista de Items */}
        <h2>Tarefas:</h2>
        <ul>
          
        </ul>



      </header>
    </div>
  );
}

export default App;