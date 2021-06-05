import { useEffect, useState } from "react"
import Adicionar from "./Adicionar";
import Listar from "./Listar";

const Admin = function () {
    const [tabAtiva, setTabAtiva] = useState('Adicionar');
    const [itemId, setItemId] = useState('');
    const none = 'display-none';

    const updateItem = (id:string) => {
        setItemId(id);
        setTabAtiva('Adicionar');
    };

    return (
        <>
            <div className={'block'}>
                <h1 className={'admin-navgation'}>
                    <span onClick={()=>setTabAtiva('Adicionar')} className={tabAtiva === 'Adicionar' ? 'ativo' : ''}>Adicionar</span> / <span onClick={()=>setTabAtiva('Listar')
                } className={tabAtiva === 'Listar' ? 'ativo' : ''}>Listar & Organizar</span> / <span onClick={()=>setTabAtiva('Categorias')} className={tabAtiva === 'Categorias' ? 'ativo' : ''}>Categorias</span>
                </h1>
            </div>

            <span className={tabAtiva !== 'Adicionar' ? none : ''}><Adicionar id={itemId}/></span>
            <span className={tabAtiva !== 'Listar' ? none : ''}><Listar update={updateItem}/></span>
        </>
    )
}

export default Admin;