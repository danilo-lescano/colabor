import { useEffect, useState } from "react"
import GetItensLoja from "../../api/getItensLoja";
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import Spinner from "../acessorios/Spinner";
import {GetCategoria, GetCategorias, CreateCategoria, UpdateCategoria, DeleteCategoria} from "../../api/categoriaAPI";
import Categoria from "../../model/Categoria";

const Categorias = function (args:{update: (id:string)=>void, reRender?:Boolean}) {
	const [session, setSession] = useState<any>(JSON.parse(localStorage.getItem('session') as string));
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const [novaCategoriaTitulo, setNovaCategoriaTitulo] = useState('');
    const [novaCategoriaCor, setNovaCategoriaCor] = useState('');

    const [novaOferta, setNovaOferta] = useState('');

    const [novaSubCategoriaCategoria, setNovaSubCategoriaCategoria] = useState('');
    const [novaSubCategoriaTitulo, setNovaSubCategoriaTitulo] = useState('');



    useEffect(()=>{
        callGetAllCategorias();
    }, []);

    const callGetAllCategorias = async () => {
        const aux_categorias = await GetCategorias();
        console.log(aux_categorias)
        if(aux_categorias) {
            //setCategorias(aux_categorias);
            if(!novaSubCategoriaCategoria) {
                for(let i = 0; i < categorias.length; i++) {
                    //if(categorias[i] !== 'oferta') {
                    //    setNovaSubCategoriaCategoria(categorias[i].titulo)
                    //    break;
                    //}
                }
            }
        }
    }

    const addCategoria = async () => {
        await CreateCategoria({
            tokenid: session.id,
            data: {
                nome: novaCategoriaTitulo,
                cor: novaCategoriaCor,
                subcategorias: []
            }
        });
        callGetAllCategorias();
    };
    const addSubCategoria = async () => {
        for(var i = 0; i < categorias.length; i++) {
            console.log(categorias[i].nome, novaSubCategoriaCategoria, categorias[i].nome === novaSubCategoriaCategoria)
            if(categorias[i].nome === novaSubCategoriaCategoria) {
                await CreateCategoria({
                    tokenid: session.id,
                    data: {
                        id: categorias[i].id,
                        nome: novaSubCategoriaCategoria,
                        cor: novaCategoriaCor,
                        subcategorias: categorias[i].subcategorias?.concat([novaSubCategoriaTitulo])
                    }
                });
                callGetAllCategorias();
                break;
            }
        }
    };
    const removeSubCategoria = async (ct: string, sc: string) => {
        for(let i = 0; i < categorias.length; i++) {
            if(categorias[i].nome === ct && categorias[i].subcategorias) {
                let aux: any = categorias[i].subcategorias;
                if(aux)
                    categorias[i].subcategorias?.splice(aux.length, 1);
                await CreateCategoria({
                    tokenid: session.id,
                    data: {
                        id: categorias[i].id,
                        nome: ct,
                        cor: categorias[i].cor,
                        subcategorias: categorias[i].subcategorias
                    }
                });
                callGetAllCategorias();
                break;
            }
        }
    };
    const removeCategoria = async (ctid: string) => {
        console.log(ctid)

        for(var i = 0; i < categorias.length; i++) {
            if(categorias[i].id === ctid) {
                await DeleteCategoria({
                    tokenid: session.id,
                    data: {
                        id: ctid
                    }
                });
                callGetAllCategorias();
                break;
            }
        }
    };
    const addOferta = async () => {
        for(var i = 0; i < categorias.length; i++) {
            if(categorias[i].nome === 'oferta') {
               await CreateCategoria({
                    tokenid: session.id,
                    data: {
                       id: categorias[i].id,
                       nome: 'oferta',
                       subcategorias: categorias[i].subcategorias?.concat([novaOferta])
                   }
               });
               callGetAllCategorias();
               break;
            }
        }
    };

    return (
        <div className={'listar-box'}>
            <h1>Categorias</h1>
            <span style={{display:'inline-block', marginRight:'100px'}}>
            {Object.values(categorias).map((c:any)=>{
                return (<>
                    {c.nome !== 'oferta' ? <span style={{width:15, height: 15, backgroundColor:c.categoriaCor, position: 'relative', display: "inline-block", borderRadius:'100%'}}></span> : null}
                    <b>{c.nome}</b><span style={{cursor:'pointer'}} onClick={()=>removeCategoria(c.id)}><AiFillDelete/></span><br/>
                    {Object.values(c.subCategorias).map((sc:any)=>{
                        return (
                            <>
                                <span>{sc}</span> <span style={{cursor:'pointer'}} onClick={()=>removeSubCategoria(c.nome, sc)}><AiFillDelete/></span><br/>
                            </>
                        );
                    })}
                    <br/>
                </>);
            })}
            </span>
            <span style={{display:'inline-block', verticalAlign:'top', marginRight:'50px', height: 200}}>
                <h3>Nova categoria</h3>
                <label>Título<br/><input type='text' onChange={(e)=>setNovaCategoriaTitulo(e.target.value)}/></label><br/><br/>
                <label>Cor<br/><input type='color' onChange={(e)=>setNovaCategoriaCor(e.target.value)}/></label><br/><br/>
                <button style={{position:'absolute', bottom:0}} onClick={addCategoria}>adicionar</button>
            </span>
            <span style={{display:'inline-block', verticalAlign:'top', marginRight:'50px', height: 200}}>
                <h3>Nova oferta</h3>
                <label>% de desconto<br/><input type='number' onChange={(e)=>setNovaOferta(e.target.value)}/></label><br/><br/>
                <button style={{position:'absolute', bottom:0}} onClick={addOferta}>adicionar</button>
            </span>
            <span style={{display:'inline-block', verticalAlign:'top', marginRight:'50px', height: 200}}>
                <h3>Nova subcategoria</h3>
                <label>Título<br/><input type='text' onChange={(e)=>setNovaSubCategoriaTitulo(e.target.value)}/></label><br/><br/>
                <label>Categoria<br/>
                    <select id="cars" onChange={(e)=>setNovaSubCategoriaCategoria(e.target.value)}>
                        {Object.values(categorias).map((c:any)=>{
                            if(c.nome !== 'oferta')
                                return <option value={c.nome}>{c.nome}</option>;
                        })}
                    </select>
                </label><br/>
                <button style={{position:'absolute', bottom:0}} onClick={addSubCategoria}>adicionar</button>
            </span>
        </div>
    )
}

export default Categorias;