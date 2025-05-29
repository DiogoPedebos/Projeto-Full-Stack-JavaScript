// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Opcional: para estilos básicos

// Define a URL base da sua API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function App() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [editingItem, setEditingItem] = useState(null); // Item que está sendo editado
  const [editedItemName, setEditedItemName] = useState(''); // Novo nome do item editado

  // --- Funções de Requisição à API ---

  // Função para buscar todos os items
  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/items`);
      setItems(response.data);
    } catch (error) {
      console.error('Erro ao buscar items:', error);
    }
  };

  // Função para adicionar um novo item
  const addItem = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/items`, { name: newItemName });
      setItems([...items, response.data]); // Adiciona o novo item ao estado
      setNewItemName(''); // Limpa o campo do input
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    }
  };

  // Função para iniciar a edição de um item
  const startEditing = (item) => {
    setEditingItem(item);
    setEditedItemName(item.name);
  };

  // Função para cancelar a edição
  const cancelEditing = () => {
    setEditingItem(null);
    setEditedItemName('');
  };

  // Função para atualizar um item
  const updateItem = async (id) => {
    try {
      const response = await axios.put(`<span class="math-inline">\{API\_BASE\_URL\}/items/</span>{id}`, { name: editedItemName });
      // Atualiza o item no estado
      setItems(items.map(item => (item.id === id ? response.data : item)));
      cancelEditing(); // Sai do modo de edição
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
    }
  };

  // Função para deletar um item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`<span class="math-inline">\{API\_BASE\_URL\}/items/</span>{id}`);
      setItems(items.filter(item => item.id !== id)); // Remove o item do estado
    } catch (error) {
      console.error('Erro ao deletar item:', error);
    }
  };

  // --- Efeito para carregar os items na montagem do componente ---
  useEffect(() => {
    fetchItems();
  }, []); // Array de dependências vazio: executa uma vez na montagem



  return (
    <div className="App">
      <header className="App-header">
        <h1>Minha Lista de Items (React + Node.js)</h1>

        {/* Formulário para Adicionar Item */}
        <div>
          <input
            type="text"
            placeholder="Nome do novo item"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <button onClick={addItem}>Adicionar Item</button>
        </div>


        {/* Lista de Items */}
        <h2>Items:</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {editingItem && editingItem.id === item.id ? (
                <>
                  <input
                    type="text"
                    value={editedItemName}
                    onChange={(e) => setEditedItemName(e.target.value)}
                  />
                  <button onClick={() => updateItem(item.id)}>Salvar</button>
                  <button onClick={cancelEditing}>Cancelar</button>
                </>
              ) : (
                <>
                  {item.name}
                  <button onClick={() => startEditing(item)}>Editar</button>
                  <button onClick={() => deleteItem(item.id)}>Deletar</button>
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