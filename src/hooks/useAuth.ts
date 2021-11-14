import { useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider' 

export function useAuth(){
    const value = useContext(AuthContext)
    return value
}