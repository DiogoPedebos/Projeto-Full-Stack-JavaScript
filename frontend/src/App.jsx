// frontend/src/App.js
import './App.css'; // Opcional: para estilos básicos
import Home from './pages/Home/Home';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </>
    </div>
  );
}

export default App;


