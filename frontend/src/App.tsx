import Routes from './components/router/Routes';
import {BrowserRouter} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Session from './session/Session'

function App() {
  const [carrinho, setCarrinho] = useState<any[]>([]);

  useEffect(()=>{
    let localStorageCarrinho = localStorage.getItem('carrinho-colabor');
    if(localStorageCarrinho)
      setCarrinho(JSON.parse(localStorageCarrinho));
  }, [])

  return (
    <Session.Provider value={{carrinho, setCarrinho}}>
      <div className="container">
        <BrowserRouter>
          <Routes/>
        </BrowserRouter>
      </div>
    </Session.Provider>
  );
}

export default App;
