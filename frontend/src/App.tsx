import Routes from './components/router/Routes';
import {BrowserRouter} from 'react-router-dom';

function App() {
    return (
    <div className="container">
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
