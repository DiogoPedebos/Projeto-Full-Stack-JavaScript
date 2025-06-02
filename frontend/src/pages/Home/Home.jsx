import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';
import './style.css';
import axios from 'axios';

// Define a URL base da sua API, usando uma variável de ambiente ou um fallback para desenvolvimento.
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

function Home() {
  // Estado para armazenar a lista de tarefas.
  const [tarefas, setTarefas] = useState([]);
  // Estado para armazenar os dados de uma nova tarefa a ser adicionada.
  const [newTarefa, setNewTarefa] = useState({
    name: '',
    titulo: '',
    descricao: '',
    status: '',
    dataCriacao: '',
    dataConclusao: '',
  });
  // Estado para controlar a tarefa que está sendo editada (se houver).
  const [editingTarefa, setEditingTarefa] = useState(null);

  // Função assíncrona para buscar todas as tarefas da API.
  const fetchTarefas = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tarefas`);
      setTarefas(response.data); // Atualiza o estado 'tarefas' com os dados recebidos.
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error); // Loga qualquer erro na busca.
    }
  };

  // Função assíncrona para adicionar uma nova tarefa à API.
  const addTarefa = async () => {
    try {
      // Formata as datas para o padrão ISO antes de enviar.
      const tarefaToSend = {
        ...newTarefa,
        dataCriacao: newTarefa.dataCriacao ? new Date(newTarefa.dataCriacao).toISOString().split('T')[0] : '',
        dataConclusao: newTarefa.dataConclusao ? new Date(newTarefa.dataConclusao).toISOString().split('T')[0] : '',
      };

      const response = await axios.post(`${API_BASE_URL}/tarefas`, tarefaToSend);
      setTarefas([...tarefas, response.data]); // Adiciona a nova tarefa à lista existente.
      // Limpa o formulário de nova tarefa.
      setNewTarefa({
        name: '',
        titulo: '',
        descricao: '',
        status: '',
        dataCriacao: '',
        dataConclusao: '',
      });
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error); // Loga qualquer erro na adição.
    }
  };

  // Função para preparar os dados de uma tarefa para edição, formatando as datas.
  const startEditing = (tarefa) => {
    const formattedTarefa = {
      ...tarefa,
      dataCriacao: tarefa.dataCriacao ? new Date(tarefa.dataCriacao).toISOString().split('T')[0] : '',
      dataConclusao: tarefa.dataConclusao ? new Date(tarefa.dataConclusao).toISOString().split('T')[0] : '',
    };
    setEditingTarefa(formattedTarefa); // Define a tarefa a ser editada.
  };

  // Função para cancelar o modo de edição.
  const cancelEditing = () => {
    setEditingTarefa(null);
  };

  // Função assíncrona para atualizar uma tarefa existente na API.
  const updateTarefa = async (id) => {
    try {
      // Formata as datas antes de enviar para a API.
      const tarefaToUpdate = {
        ...editingTarefa,
        dataCriacao: editingTarefa.dataCriacao ? new Date(editingTarefa.dataCriacao).toISOString().split('T')[0] : '',
        dataConclusao: editingTarefa.dataConclusao ? new Date(editingTarefa.dataConclusao).toISOString().split('T')[0] : '',
      };

      const response = await axios.put(`${API_BASE_URL}/tarefas/${id}`, tarefaToUpdate);
      // Atualiza a tarefa na lista de tarefas.
      setTarefas(tarefas.map((tarefa) => (tarefa.id === id ? response.data : tarefa)));
      cancelEditing(); // Sai do modo de edição.
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error); // Loga qualquer erro na atualização.
    }
  };

  // Função assíncrona para deletar uma tarefa da API.
  const deleteTarefa = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/tarefas/${id}`);
      // Remove a tarefa da lista de tarefas.
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error); // Loga qualquer erro na exclusão.
    }
  };

  // Hook useEffect para carregar as tarefas quando o componente é montado.
  useEffect(() => {
    fetchTarefas();
  }, []); // O array vazio assegura que esta função seja executada apenas uma vez.

  // Handler genérico para atualizar o estado de `newTarefa` ou `editingTarefa` com base no formulário.
  const handleChange = (e, formType) => {
    const { id, value } = e.target;
    if (formType === 'new') {
      setNewTarefa(prev => ({ ...prev, [id.replace('new', '').toLowerCase()]: value }));
    } else if (formType === 'edit') {
      setEditingTarefa(prev => ({ ...prev, [id.replace('edit', '').toLowerCase()]: value }));
    }
  };

  return (
    <div className="App">
      <Navbar /> {/* Componente de navegação. */}
      <header className="App-header">
        {/* Formulário para Adicionar nova Tarefa */}
        <div className="add-task-form">
          <h3>Adicionar Nova Tarefa</h3>
          {/* Campos de input para a nova tarefa, com `onChange` chamando `handleChange`. */}
          <div className="input-group">
            <label htmlFor="newName">Nome:</label>
            <input
              id="newName"
              type="text"
              placeholder="Nome da tarefa"
              value={newTarefa.name}
              onChange={(e) => handleChange(e, 'new')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="newTitulo">Título:</label>
            <input
              id="newTitulo"
              type="text"
              placeholder="Título da tarefa"
              value={newTarefa.titulo}
              onChange={(e) => handleChange(e, 'new')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="newDescricao">Descrição:</label>
            <textarea
              id="newDescricao"
              placeholder="Descrição da tarefa"
              value={newTarefa.descricao}
              onChange={(e) => handleChange(e, 'new')}
            ></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="newStatus">Status:</label>
            <input
              id="newStatus"
              type="text"
              placeholder="Status da tarefa"
              value={newTarefa.status}
              onChange={(e) => handleChange(e, 'new')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="newDataCriacao">Data de Criação:</label>
            <input
              id="newDataCriacao"
              type="date"
              value={newTarefa.dataCriacao}
              onChange={(e) => handleChange(e, 'new')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="newDataConclusao">Data de Conclusão:</label>
            <input
              id="newDataConclusao"
              type="date"
              value={newTarefa.dataConclusao}
              onChange={(e) => handleChange(e, 'new')}
            />
          </div>
          <button onClick={addTarefa} className="add-button">
            Adicionar Tarefa
          </button>
        </div>

        {/* Lista de Tarefas */}
        <h2>Minhas Tarefas</h2>
        <ul className="task-list">
          {/* Renderização condicional: se não houver tarefas, exibe uma mensagem; caso contrário, mapeia as tarefas. */}
          {tarefas.length === 0 ? (
            <p className="no-tasks-message">Nenhuma tarefa encontrada. Adicione uma nova!</p>
          ) : (
            tarefas.map((tarefa) => (
              <li className="task-item" key={tarefa.id}>
                {/* Renderização condicional: se a tarefa estiver em edição, exibe o formulário de edição; caso contrário, exibe os detalhes da tarefa. */}
                {editingTarefa && editingTarefa.id === tarefa.id ? (
                  // Formulário de Edição
                  <>
                    <div className="input-group">
                      <label htmlFor={`editName-${tarefa.id}`}>Nome:</label>
                      <input
                        id={`editName-${tarefa.id}`}
                        type="text"
                        value={editingTarefa.name}
                        onChange={(e) => handleChange(e, 'edit')}
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor={`editTitulo-${tarefa.id}`}>Título:</label>
                      <input
                        id={`editTitulo-${tarefa.id}`}
                        type="text"
                        value={editingTarefa.titulo}
                        onChange={(e) => handleChange(e, 'edit')}
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor={`editDescricao-${tarefa.id}`}>Descrição:</label>
                      <textarea
                        id={`editDescricao-${tarefa.id}`}
                        value={editingTarefa.descricao}
                        onChange={(e) => handleChange(e, 'edit')}
                      ></textarea>
                    </div>
                    <div className="input-group">
                      <label htmlFor={`editStatus-${tarefa.id}`}>Status:</label>
                      <input
                        id={`editStatus-${tarefa.id}`}
                        type="text"
                        value={editingTarefa.status}
                        onChange={(e) => handleChange(e, 'edit')}
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor={`editDataCriacao-${tarefa.id}`}>Data de Criação:</label>
                      <input
                        id={`editDataCriacao-${tarefa.id}`}
                        type="date"
                        value={editingTarefa.dataCriacao}
                        onChange={(e) => handleChange(e, 'edit')}
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor={`editDataConclusao-${tarefa.id}`}>Data de Conclusão:</label>
                      <input
                        id={`editDataConclusao-${tarefa.id}`}
                        type="date"
                        value={editingTarefa.dataConclusao}
                        onChange={(e) => handleChange(e, 'edit')}
                      />
                    </div>

                    <div className="task-buttons-container">
                      <button className="save-button" onClick={() => updateTarefa(tarefa.id)}>
                        Salvar
                      </button>
                      <button className="cancel-button" onClick={cancelEditing}>
                        Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  // Exibição da Tarefa
                  <>
                    <div className="task-details">
                      <p>
                        <strong>Nome:</strong> {tarefa.name}
                      </p>
                      <p>
                        <strong>Título:</strong> {tarefa.titulo}
                      </p>
                      <p>
                        <strong>Descrição:</strong> {tarefa.descricao}
                      </p>
                      <p>
                        <strong>Status:</strong> {tarefa.status}
                      </p>
                      <p>
                        <strong>Criado em:</strong> {tarefa.dataCriacao}
                      </p>
                      <p>
                        <strong>Concluído em:</strong> {tarefa.dataConclusao}
                      </p>
                    </div>
                    <div className="task-buttons-container">
                      <button className="edit-button" onClick={() => startEditing(tarefa)}>
                        Editar
                      </button>
                      <button className="delete-button" onClick={() => deleteTarefa(tarefa.id)}>
                        Deletar
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          )}
        </ul>
      </header>
    </div>
  );
}

export default Home;