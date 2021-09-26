import Routes from './components/router/Routes';
import {BrowserRouter} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Session from './session/Session'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer/>
    </Session.Provider>
  );
}

export default App;
