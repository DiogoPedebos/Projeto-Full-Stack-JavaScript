import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import Navbar from './components/navbar/navbar';
import App from './App';
import About from './pages/About/About';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {path:"/",element:<App/>},
  {path:"/about",element:<About/>},
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);



