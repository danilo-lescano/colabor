import { useEffect, useState } from "react"
import Adicionar from "./Adicionar";
import Categorias from "./Categorias";
import Listar from "./Listar";

const Admin = function () {
    const [tabAtiva, setTabAtiva] = useState('Adicionar');
    const [itemId, setItemId] = useState('');
    const [renderFlag, setRenderFlag] = useState(true);
    const none = 'display-none';

    const updateItem = (id:string) => {
        setItemId(id);
        setTabAtiva('Adicionar');
    };

    const reRender = () => {
        setRenderFlag(!renderFlag);
    };

    return (
        <>
            <div className={'block'}>
                <h1 className={'admin-navgation'}>
                    <span onClick={()=>setTabAtiva('Adicionar')} className={tabAtiva === 'Adicionar' ? 'ativo' : ''}>Adicionar</span> / <span onClick={()=>setTabAtiva('Listar')
                } className={tabAtiva === 'Listar' ? 'ativo' : ''}>Listar & Organizar</span> / <span onClick={()=>setTabAtiva('Categorias')} className={tabAtiva === 'Categorias' ? 'ativo' : ''}>Categorias</span>
                </h1>
            </div>

            <span className={tabAtiva !== 'Adicionar' ? none : ''}>
                <Adicionar id={itemId} iAddCallback={reRender}/>
            </span>
            <span className={tabAtiva !== 'Listar' ? none : ''}>
                <Listar update={updateItem} reRender={renderFlag}/>
            </span>
            <span className={tabAtiva !== 'Categorias' ? none : ''}>
                <Categorias update={updateItem} reRender={renderFlag}/>
            </span>
        </>
    )
}

export default Admin;