import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextProvider';

import illustrationImg from '../assets/illustration.svg';
import logo from '../assets/logo.svg';
import googleIconImg from '../assets/google-icon.svg'
import '../styles/auth.scss'

import { Button } from '../components/Button';
import { auth } from '../services/firebase';

export function Home() {
    let navigate = useNavigate()
    const { user, signInWithGoogle} = useContext(AuthContext)

    const handleCreateRoom = async () => {
        if(!user){           
            await signInWithGoogle()
        }

        console.log(user);        
        navigate('/rooms/new')       
    }

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
                     <button className="create-room" onClick={handleCreateRoom}>
                         <img src={googleIconImg} alt="Logo do google" />
                         Crie sua Sala com o Google
                     </button>
                     <div className="separator">Ou entre em uma sala</div>
                     <form>
                         <input 
                            type="text"
                            placeholder="Digite o Código da Sala"
                         />
                         <Button 
                            type="submit"
                            title="Cadastrar"
                         >
                            Entrar na Sala
                         </Button>                       
                     </form>
                </div>
            </main>
        </div>
    )
}