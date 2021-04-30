import {Route, Switch} from 'react-router-dom';
import Layout from '../layout/Layout';
import Loja from '../loja/Loja';
import Blog from '../blog/Blog';
import Contato from '../contato/Contato';
import Login from '../login/Login';



// USER ROLES
const ROOT = 'Root';
const ADMIN = 'Admin';
const CLIENT = 'Client';

export const routes = {
	home: {uri: '/', label: 'Loja', roles: [ROOT, ADMIN, CLIENT]},
};

const Routes = () => (
	<Switch>
		<Route exact path={'/'}
			render={(props)=><Layout><Loja/></Layout>}/>
		<Route exact path={'/blog'}
			render={(props)=><Layout><Blog/></Layout>}/>
		<Route exact path={'/contato'}
			render={(props)=><Layout><Contato/></Layout>}/>
		<Route exact path={'/login'}
			render={(props)=><Layout><Login/></Layout>}/>
	</Switch>
);

export default Routes;