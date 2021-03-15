import { Button } from '@material-ui/core';
import {auth, provider} from './firebase'
import React from 'react';
import './Login.css'

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider)
        .catch((error)=> alert(error.message));
    }
    return (
        <div className="login">
            
            

            <Button onClick={signIn}><span></span>Login with Google</Button>
            
        </div>
    )
}

export default Login
