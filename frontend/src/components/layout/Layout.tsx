import {FC, useContext, useEffect, useState} from 'react';
import '../shared/css.css';
import logo from '../../assets/logo.svg';
import footerLogo from '../../assets/footer-logo.svg';
import cart from '../../assets/cart.svg';
import {Link, useLocation} from 'react-router-dom';
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
            <span className={'header-btn-burguer-wrapper'} onClick={()=>setOpenCloseMenu(!openCloseMenu)}>
                <button className={'header-btn-burguer'}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <img className={'header-logo-img clone'} src={logo} alt={'Cofab logo'}/>
            </span>
            <Link to='/'>
                <img className={'header-logo-img'} src={logo} alt={'Cofab logo'}/>
            </Link>
            <div className={`header-menu-items-wrapper ${openCloseMenu ? 'open' : ''}`}>
                <Link to='/' className={`/${path.split('/')[1]}` === '/' ? selectedClass : notSelectedClass}>Home</Link>
                {/*<Link to='/blog' className={`/${path.split('/')[1]}` === '/blog' ? selectedClass : notSelectedClass}>Blog</Link>*/}
                <Link to='/contato' className={`/${path.split('/')[1]}` === '/contato' ? selectedClass : notSelectedClass}>Contato</Link>
                <Link to='/sobre' className={`/${path.split('/sobre')[1]}` === '/' ? selectedClass : notSelectedClass}>Sobre</Link>
                {(session && session.role === 'admin') ?
                    <Link to='/admin' className={`/${path.split('/')[1]}` === '/admin' ? selectedClass : notSelectedClass}>Admin</Link> : null}
                {session ? <Logout className={notSelectedClass}/> : null}
                {/*    <Link to='/login' className={`/${path.split('/')[1]}` === '/login' ? selectedClass : notSelectedClass}>Cadastro/Login</Link> */}
            </div>
            <img className={'header-cart-img'} src={cart} alt={'carinho'}/>
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
                    <Link to='/'>
                        <img className={'footer-logo-img'} src={footerLogo}/>
                    </Link>
                </div>
                <div className={'footer-links'}>
                    <Link to='/' className={`/${path.split('/')[1]}` === '/' ? selectedClass : notSelectedClass} style={{marginRight:'50px'}}>Home</Link>
                    <Link to='/sobre' className={`/${path.split('/sobre')[1]}` === '/' ? selectedClass : notSelectedClass}>Sobre</Link><br/><br/>
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
		<div style={{minHeight:'100vh'}}>
            <Header/>
			<div className={'ch-content-filler'}>{children}</div>
            <Footer/>
		</div>
	);
};

export default Layout;