import React from 'react'
import { Button } from '@material-ui/core'
import './Login.css'
import logo from "../../Images/whatsapp-logo.png"
import {auth, provider} from '../../firebase'
import { useStateValue } from '../../StateProvider'
import { actionTypes } from '../../reducer'

function Login() {
    const [{},dispatch]=useStateValue()
    const signin=()=>{
        auth.signInWithPopup(provider)
        .then(res=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:res.user
            })
        }).catch(err=>console.log(err))
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src={logo} alt="logo"/>
                <div className="login__text">
                    <h1> Sign in to WhatsApp</h1>
                </div>
                <Button onClick={signin}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
