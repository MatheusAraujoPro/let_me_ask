import { Link } from 'react-router-dom'

import illustrationImg from '../assets/illustration.svg';
import logo from '../assets/logo.svg';
import '../styles/auth.scss'

import { Button } from '../components/Button';

export function NewRoom() {
    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração Simbolizando Perguntas e Respostas" />
                <strong>Crie salas de Q&amp;Ao vivo</strong>
                <p>Tire as dúvidas de sua audiência</p>               
            </aside>
            <main>
                <div className="main-content">
                    <img src={logo} alt="Logo Letmeask" /> 
                    <h2>Crie uma nova sala</h2>
                     <form>
                         <input 
                            type="text"
                            placeholder="Nome da Sala"
                         />
                         <Button type="submit">
                            Entrar na Sala
                         </Button>                       
                     </form>
                     <p>
                         Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                     </p>
                </div>
            </main>
        </div>
    )
}