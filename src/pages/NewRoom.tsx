import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { database } from '../services/firebase'


import illustrationImg from '../assets/illustration.svg';
import logo from '../assets/logo.svg';
import '../styles/auth.scss'

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {

    const [newRoom, setNewRoom] = useState('')
    const { user } = useAuth()


    const handleCreateRoom = async (event: FormEvent) => {
        //Previnir o comportamento padrão do formulário
        event.preventDefault()

        //Criando registro da sala no Firebase
        const roomRef = database.ref('rooms')
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })
    }

    const handleNewRoom = (value: string) => {
       if(value.trim() === '') return 
       
       setNewRoom(value)
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
                    <h2>Crie uma nova sala</h2>
                     <form onSubmit={handleCreateRoom}>
                         <input 
                            type="text"
                            placeholder="Nome da Sala"
                            onChange={event => handleNewRoom(event.target.value)}
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