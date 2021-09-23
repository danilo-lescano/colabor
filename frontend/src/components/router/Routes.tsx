import {Route, Switch} from 'react-router-dom';
import {useState} from 'react';
import Layout from '../layout/Layout';
import Loja from '../loja/Loja';
import Item from '../loja/Item';
import Blog from '../blog/Blog';
import Contato from '../contato/Contato';
import Login from '../login/Login';
import Admin from '../admin/Admin';
import Carrinho from '../carrinho/Carrinho';

function tryParse(str: string | null) {
    if(!str)
        return null;
    return JSON.parse(str);
}

const Routes = () => {
	const [session, setSession] = useState<any>(tryParse(localStorage.getItem('session')));

	return (
		<Switch>
			<Route exact path={'/'}
				render={(props)=><Layout><Loja/></Layout>}/>
			<Route exact path={'/blog'}
				render={(props)=><Layout><Blog/></Layout>}/>
			<Route exact path={'/contato'}
				render={(props)=><Layout><Contato/></Layout>}/>
			<Route exact path={'/login'}
				render={(props)=><Layout><Login/></Layout>}/>
			<Route exact path={'/carrinho'}
				render={(props)=><Layout><Carrinho/></Layout>}/>
			<Route exact path={'/item/:lojaitemId'}
				render={(props)=><Layout><Item/></Layout>}/>
			{session ?
				<Route exact path={'/admin'}
					render={(props)=><Layout><Admin/></Layout>}/> : null}
		</Switch>
	);
};

export default Routes;