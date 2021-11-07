import {Route, Switch} from 'react-router-dom';
import {useState} from 'react';
import Layout from '../layout/Layout';
import Loja from '../loja/Loja';
import Item from '../loja/Item';
import Contato from '../contato/Contato';
import Login from '../login/Login';
import Admin from '../admin/Admin';
import Sobre from '../sobre/Sobre';

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
			<Route exact path={'/sobre'}
				render={(props)=><Layout><Sobre/></Layout>}/>
			<Route exact path={'/contato'}
				render={(props)=><Layout><Contato/></Layout>}/>
			<Route exact path={'/item/:lojaitemId'}
				render={(props)=><Layout><Item/></Layout>}/>
			{session ?
				<Route exact path={'/admin'} render={(props)=><Layout><Admin/></Layout>}/>
				: 
				<Route exact path={'/admin'} render={(props)=><Layout><Login/></Layout>}/>
			}
		</Switch>
	);
};

export default Routes;