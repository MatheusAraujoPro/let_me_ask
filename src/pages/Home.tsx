import { FormEvent, useContext, useState  } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextProvider';
import { database } from '../services/firebase'

import illustrationImg from '../assets/illustration.svg';
import logo from '../assets/logo.svg';
import googleIconImg from '../assets/google-icon.svg'
import '../styles/auth.scss'

import { Button } from '../components/Button';


export function Home() {
    let navigate = useNavigate()
    const [roomCode, setRoomCode] = useState('')
    
    const { user, signInWithGoogle} = useContext(AuthContext)

    const handleCreateRoom = async () => {
        if(!user){           
            await signInWithGoogle()
        }

        console.log(user);        
        navigate('/rooms/new')       
    }

    const handleJoinRoom = async (event: FormEvent) => {
        event.preventDefault()
        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if(!roomRef.exists()) return alert('Sala não existe')

        navigate(`/rooms/${roomCode}`)
    }

    const handleRoomCode = (value: string) => {
        if(value.trim() === '') return 
        
        setRoomCode(value)
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
                     <form onSubmit={handleJoinRoom}>
                         <input 
                            type="text"
                            placeholder="Digite o Código da Sala"
                            onChange={event => handleRoomCode(event.target.value)}
                         />
                         <Button type="submit"                 
                         >
                            Entrar na Sala
                         </Button>                       
                     </form>
                </div>
            </main>
        </div>
    )
}