import { useState } from 'react';
import { Redirect } from 'react-router';
import Logar from '../../api/logar';
import {toast} from 'react-toastify';

const toastConfig = {
    autoClose: 3000,
    position: toast.POSITION.BOTTOM_LEFT
};


const Login = function () {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
	const [session, setSession] = useState(localStorage.getItem('session'));
    
    const tentarLogar = async (email: string, senha: string) => {
        let login: any = await Logar(email, senha);
        if(login.id) {
            localStorage.setItem('session', JSON.stringify(login));
            window.location.reload();
        }
        else {
            toast.error("Email ou senha inválido.", toastConfig);
        }
    }

    

    return (
        session ? <Redirect to={'/'}/> :
        <>
            <div style={{textAlign: 'center'}}>
            <h1>Login</h1>
            <div className={'footer-login'} style={{float: 'initial'}}>
                Faça seu Login:<br/>
                <input className={'footer-input'} placeholder={'Email'} type={'email'} onChange={(e)=>setEmail(e.target.value)}/><br/>
                <input className={'footer-input'} placeholder={'Senha'} type={'password'} onChange={(e)=>setSenha(e.target.value)}/><br/><br/>
                <span style={{cursor: 'pointer'}} onClick={()=>tentarLogar(email, senha)}>OK</span>
            </div>
            </div>
        </>
    )
}

export default Login;