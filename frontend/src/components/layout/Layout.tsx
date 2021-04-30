import {FC} from 'react';
import '../shared/css.css';
import logo from '../../assets/logo.svg';
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
                <Link to='login' className={`/${path.split('/')[1]}` === '/login' ? selectedClass : notSelectedClass}>Cadastro/Login</Link>
            </div>
            <img className={'header-cart-img'} src={cart} alt={'carinho'}/>
        </div>
    )
}

/*const Footer = function () {
    return (
        <div className={'footer-box'}>
            <div className={'footer-upper-subbox'}>
                <div className={'footer-logo-img-wrapper'}>
                    <img className={'footer-logo-img'} src={footerLogo}/>
                </div>
                <div className={'footer-pague-com'}>Pague com:</div>
            </div>
            <div className={'footer-break-line'}></div>
        </div>
    )
}*/

const Layout: FC<ILayoutProps> = function ({children}) {
	return (
		<div style={{minHeight:'100%'}}>
            <Header/>
			<div className={'ch-content-filler'}>{children}</div>
            {
                //<Footer/>
            }
		</div>
	);
};

export default Layout;