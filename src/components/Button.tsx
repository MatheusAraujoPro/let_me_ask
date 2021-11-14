import {ButtonHTMLAttributes } from 'react'
import '../styles/button.scss'
// Tipagem do elemento do botão é necesária: HTMLButtonElement

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps){
    return(
        <button className="button" {...props}>Criar Sala</button>
    )
}

