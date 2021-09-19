import Routes from './components/router/Routes';
import {BrowserRouter} from 'react-router-dom';
import { useState } from 'react';
import Session from './session/Session'

function App() {
  const [teste, setTest] = useState('');

  return (
    <Session.Provider value={{teste, setTest}}>
      <div className="container">
        <BrowserRouter>
          <Routes/>
        </BrowserRouter>
      </div>
    </Session.Provider>
  );
}

export default App;
