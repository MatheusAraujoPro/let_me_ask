import { createContext, useState, ReactNode, useEffect } from "react"
import { firebase, auth } from '../services/firebase'

export type UserType = {
  id: string,
  name: string,
  avatar: string
}

export type AuthContextType = {
  user: UserType | undefined,
  signInWithGoogle: () => Promise<void>
}

type AuthContextProvider = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProvider) {
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
    return () => {
      unsubscribe();
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}