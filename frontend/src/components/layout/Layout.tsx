import {FC} from 'react';
import '../shared/css.css';
import logo from '../../assets/logo.svg';
import footerLogo from '../../assets/footer-logo.svg';
import cart from '../../assets/cart.svg';
import {Link, useLocation} from 'react-router-dom';


interface ILayoutProps {
	children?: JSX.Element | Array<JSX.Element>;
}

const Header = function () {
    const {pathname: path} = useLocation();
    const selectedClass = 'active header-menu-item';
    const notSelectedClass = 'header-menu-item';

    return (
        <div className={'header-box'}>
            <img className={'header-logo-img'} src={logo} alt={'Cofab logo'}/>
            <div className={'header-menu-items-wrapper'}>
                <Link to='/' className={`/${path.split('/')[1]}` === '/' ? selectedClass : notSelectedClass}>Loja</Link>
                <Link to='/blog' className={`/${path.split('/')[1]}` === '/blog' ? selectedClass : notSelectedClass}>Blog</Link>
                <Link to='/contato' className={`/${path.split('/')[1]}` === '/contato' ? selectedClass : notSelectedClass}>Contato</Link>
                <Link to='/sobre' className={`/${path.split('/sobre')[1]}` === '/' ? selectedClass : notSelectedClass}>Sobre</Link>
                <Link to='login' className={`/${path.split('/')[1]}` === '/login' ? selectedClass : notSelectedClass}>Cadastro/Login</Link>
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
                    <img className={'footer-logo-img'} src={footerLogo}/>
                </div>
                <div className={'footer-pague-com'}>
                    Pague com:
                    <br/>
                    <img className={'footer-pague-com-img'} src={logo}/>
                    <img className={'footer-pague-com-img'} src={logo}/>
                    <img className={'footer-pague-com-img'} src={logo}/>
                    <img className={'footer-pague-com-img'} src={logo}/>
                </div>
                <div className={'footer-login'}>
                    Faça seu Login:<br/>
                    <input type={'email'}/><br/>
                    <input type={'password'}/><br/><br/>
                    <span style={{float:'right'}}>OK</span>
                    <span style={{fontSize:'0.7em', fontWeight:'normal'}}>
                        Ainda não tenho cadastro<br/>
                        Esqueci minha senha
                    </span>
                </div>
                <div className={'footer-links'}>
                    <Link to='/' className={`/${path.split('/')[1]}` === '/' ? selectedClass : notSelectedClass} style={{marginRight:'100px'}}>Loja</Link>
                    <Link to='/sobre' className={`/${path.split('/sobre')[1]}` === '/' ? selectedClass : notSelectedClass}>Sobre</Link><br/>
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