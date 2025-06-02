
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import About from './pages/About/About';

const router = createBrowserRouter([
  {path:"/",element:<App/>},
  {path:"/about",element:<About/>},
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);



