import './style.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className='nav'>
            <Link to="/" className='title'> Tarefas </Link>
            <ul>
                <li>
                    <Link to="/about">
                        Sobre
                    </Link>
                </li>
                <li>
                    <Link to="#">
                        Sair
                    </Link>
                </li>
            </ul>
        </nav>

    )
}
