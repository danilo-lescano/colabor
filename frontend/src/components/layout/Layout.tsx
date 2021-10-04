import {FC, useContext, useEffect, useState} from 'react';
import '../shared/css.css';
import logo from '../../assets/logo.svg';
import footerLogo from '../../assets/footer-logo.svg';
import cart from '../../assets/cart.svg';
import {Link, useLocation} from 'react-router-dom';
import pag1 from '../../assets/pag1.png';
import pag2 from '../../assets/pag2.png';
import pag3 from '../../assets/pag3.png';
import pag4 from '../../assets/pag4.png';
import Session from '../../session/Session';


interface ILayoutProps {
	children?: JSX.Element | Array<JSX.Element>;
}

const Logout = function (value: {className: string}) {
    const onClick = function () {
        localStorage.removeItem('session');
        window.location.reload();
    }
    return <button className={'header-logout-btn ' + value.className} onClick={onClick}>Logout</button>
}

function tryParse(str: string | null) {
    if(!str)
        return null;
    return JSON.parse(str);
}

const Header = function () {
	const [session, setSession] = useState<any>(tryParse(localStorage.getItem('session')));
    const {pathname: path} = useLocation();
    const selectedClass = 'active header-menu-item';
    const notSelectedClass = 'header-menu-item';
    const {carrinho} = useContext(Session);
    const [openCloseMenu, setOpenCloseMenu] = useState(false);

    useEffect(()=>{
        setOpenCloseMenu(false);
    },[path])


    return (
        <div className={'header-box'}>
            <span onClick={()=>setOpenCloseMenu(!openCloseMenu)}>
                <button className={'header-btn-burguer'}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <img className={'header-logo-img clone'} src={logo} alt={'Cofab logo'}/>
            </span>
            <img className={'header-logo-img'} src={logo} alt={'Cofab logo'}/>
            <div className={`header-menu-items-wrapper ${openCloseMenu ? 'open' : ''}`}>
                <Link to='/' className={`/${path.split('/')[1]}` === '/' ? selectedClass : notSelectedClass}>Loja</Link>
                <Link to='/blog' className={`/${path.split('/')[1]}` === '/blog' ? selectedClass : notSelectedClass}>Blog</Link>
                <Link to='/contato' className={`/${path.split('/')[1]}` === '/contato' ? selectedClass : notSelectedClass}>Contato</Link>
                <Link to='/sobre' className={`/${path.split('/sobre')[1]}` === '/' ? selectedClass : notSelectedClass}>Sobre</Link>
                {(session && session.role === 'admin') ?
                    <Link to='/admin' className={`/${path.split('/')[1]}` === '/admin' ? selectedClass : notSelectedClass}>Admin</Link> : null}
                {session ? <Logout className={notSelectedClass}/> :
                    <Link to='/login' className={`/${path.split('/')[1]}` === '/login' ? selectedClass : notSelectedClass}>Cadastro/Login</Link> }
            </div>
            <Link to='/carrinho'>
                
                <div className={'header-cart-img'}>
                    <img src={cart} alt={'carinho'}/>
                    <span className={'header-cart-num'}>{carrinho.length > 0 ? carrinho.length : ''}</span>
                </div>
                <img className={'header-cart-img'} src={cart} alt={'carinho'}/>
            </Link>
        </div>
    )
}

const Footer = function () {
    const {pathname: path} = useLocation();
    const selectedClass = 'active header-menu-item';
    const notSelectedClass = 'header-menu-item';
    return (
        <div className={'footer-box'}>
            <div className={'footer-upper-subbox'}>
                <div className={'footer-logo-img-wrapper'}>
                    <img className={'footer-logo-img'} src={footerLogo}/>
                </div>
                <div className={'footer-pague-com'}>
                    Pague com:
                    <br/>
                    <img className={'footer-pague-com-img'} src={pag1}/>
                    <img className={'footer-pague-com-img'} src={pag2}/>
                    <img className={'footer-pague-com-img'} src={pag3}/>
                    <img className={'footer-pague-com-img'} src={pag4}/>
                </div>
                <div className={'footer-login'}>
                    Faça seu Login:<br/>
                    <input className={'footer-input'} placeholder={'Email'} type={'email'}/><br/>
                    <input className={'footer-input'} placeholder={'Senha'} type={'password'}/><br/><br/>
                    <span style={{float:'right'}}>OK</span>
                    <span style={{fontSize:'0.7em', fontWeight:'normal'}}>
                        Ainda não tenho cadastro<br/>
                        Esqueci minha senha
                    </span>
                </div>
                <div className={'footer-links'}>
                    <Link to='/' className={`/${path.split('/')[1]}` === '/' ? selectedClass : notSelectedClass} style={{marginRight:'100px'}}>Loja</Link>
                    <Link to='/sobre' className={`/${path.split('/sobre')[1]}` === '/' ? selectedClass : notSelectedClass}>Sobre</Link><br/><br/>
                    <Link to='/blog' className={`/${path.split('/')[1]}` === '/blog' ? selectedClass : notSelectedClass} style={{marginRight:'100px'}}>Blog</Link>
                    <Link to='/contato' className={`/${path.split('/')[1]}` === '/contato' ? selectedClass : notSelectedClass}>Contato</Link>
                </div>
            </div>
            <div className={'footer-break-line'}></div>
            <span style={{fontSize:'0.9em'}}>Instagram | Youtube | Behance | Facebook</span>
        </div>
    )
}

const Layout: FC<ILayoutProps> = function ({children}) {

	return (
		<div style={{minHeight:'100%'}}>
            <Header/>
			<div className={'ch-content-filler'}>{children}</div>
            <Footer/>
		</div>
	);
};

export default Layout;