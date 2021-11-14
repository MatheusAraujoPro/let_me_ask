import { createContext, useEffect, useState } from 'react'
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { firebase, auth } from './services/firebase'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

type UserType = {
  id: string,
  name: string,
  avatar: string
}

type AuthContextType = {
  user: UserType | undefined,
  signInWithGoogle: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

function App() {

  const [user, setUser] = useState<UserType>()

  const signInWithGoogle = async () => {
    //Autenticação com FireBases
    const provider = new firebase.auth.GoogleAuthProvider()
    const result = await auth.signInWithPopup(provider)

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) throw new Error('Informações faltando em sua conta Google')

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  useEffect(() => {
    // onAuthStateChanged -> Event Listner que ouve se um usuário logou na aplicação.
    // Se sim, ele retorna esse usuário
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) throw new Error('Informações faltando em sua conta Google')

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    // Toda vez que eu me cadastro em um event listner em um UseEffect
    // Salvar seu valor em uma variável e desligar o event quando a tela sair de foco
    return () =>{
      unsubscribe();
    }
  }, [])

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
