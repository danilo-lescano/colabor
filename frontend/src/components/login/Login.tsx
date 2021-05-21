import { useState } from 'react';
import { Redirect } from 'react-router';
import Logar from '../../api/logar';



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
    }

    return (
        session ? <Redirect to={'/'}/> :
        <>
            <h1>Login</h1>
            <div className={'footer-login'}>
                Faça seu Login:<br/>
                <input className={'footer-input'} placeholder={'Email'} type={'email'} onChange={(e)=>setEmail(e.target.value)}/><br/>
                <input className={'footer-input'} placeholder={'Senha'} type={'password'} onChange={(e)=>setSenha(e.target.value)}/><br/><br/>
                <span style={{float:'right'}} onClick={()=>tentarLogar(email, senha)}>OK</span>
                <span style={{fontSize:'0.7em', fontWeight:'normal'}}>
                    Ainda não tenho cadastro<br/>
                    Esqueci minha senha
                </span>
            </div>
        </>
    )
}

export default Login;