import { useEffect, useState } from "react"
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import Spinner from "../acessorios/Spinner";
import {GetCategoria, GetCategorias, CreateCategoria, UpdateCategoria, DeleteCategoria} from "../../api/categoriaAPI";
import Categoria from "../../model/Categoria";

const Categorias = function (args:{update: (id:string)=>void, reRender?:Boolean}) {
	const [session] = useState<any>(JSON.parse(localStorage.getItem('session') as string));
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const [novaCategoriaNome, setNovaCategoriaNome] = useState('');
    const [novaCategoriaCor, setNovaCategoriaCor] = useState('');

    const [novaSubcategoriaIdCategoria, setNovaSubcategoriaIdCategoria] = useState('');
    const [novaSubcategoriaNome, setNovaSubcategoriaNome] = useState('');

    useEffect(()=>{
        getAllCategorias();
    }, []);

    const getAllCategorias = async () => {
        const aux_categorias : any = await GetCategorias();
        if(aux_categorias.data) {
            setCategorias(aux_categorias.data as Categoria[]);
            setNovaSubcategoriaIdCategoria(aux_categorias.data[0].id);
        }
    }

    const addCategoria = async () => {
        let novaCategoria: Categoria = {
            id: '',
            nome: novaCategoriaNome,
            cor: novaCategoriaCor
        };
        let resp = await CreateCategoria(novaCategoria);
        console.log(resp);
        getAllCategorias();
    };
    const addSubCategoria = async () => {
        let c = categorias.find((c)=>c.id === novaSubcategoriaIdCategoria);
        console.log(c)
        console.log(novaSubcategoriaNome, novaSubcategoriaIdCategoria)
        if(c) {
            if(!c.subcategorias) c.subcategorias = [];
            c.subcategorias.push(novaSubcategoriaNome);
            let resp = await UpdateCategoria(c);
            console.log(resp);
            getAllCategorias();
        }
    };
    const deleteSubCategoria = async (id: string, nome: string) => {
        let c = categorias.find((c)=>c.id === id);
        if(c && c.subcategorias) {
            c.subcategorias.splice(c.subcategorias.indexOf(nome), 1);
            let resp = await UpdateCategoria(c);
            console.log(resp);
            getAllCategorias();
        }
    };
    const deleteCategoria = async (id: string) => {
        let resp : any = await DeleteCategoria(id);
        if(resp.message)
            console.log(resp.message)
        getAllCategorias();
    };

    return (
        <div className={'listar-box'}>
            <h1>Categorias</h1>
            <span style={{display:'inline-block', marginRight:'100px'}}>
            {Object.values(categorias).map((c)=>{
                return (<>
                    {c.nome !== 'oferta' ? <span style={{width:15, height: 15, backgroundColor:c.cor, position: 'relative', display: "inline-block", borderRadius:'100%'}}></span> : null}
                    <b>{c.nome}</b><span style={{cursor:'pointer'}} onClick={()=>deleteCategoria(c.id)}><AiFillDelete/></span><br/>
                    {c.subcategorias ? Object.values(c.subcategorias).map((sc)=>{
                        return (
                            <>
                                <span>{sc}</span> <span style={{cursor:'pointer'}} onClick={()=>deleteSubCategoria(c.id, sc)}><AiFillDelete/></span><br/>
                            </>
                        );
                    }) : null}
                    <br/>
                </>);
            })}
            </span>
            <span style={{display:'inline-block', verticalAlign:'top', marginRight:'50px', height: 200}}>
                <h3>Nova categoria</h3>
                <label>Nome<br/><input type='text' onChange={(e)=>setNovaCategoriaNome(e.target.value)}/></label><br/><br/>
                <label>Cor<br/><input type='color' onChange={(e)=>setNovaCategoriaCor(e.target.value)}/></label><br/><br/>
                <button style={{position:'absolute', bottom:0}} onClick={addCategoria}>adicionar</button>
            </span>
            <span style={{display:'inline-block', verticalAlign:'top', marginRight:'50px', height: 200}}>
                <h3>Nova subcategoria</h3>
                <label>Nome<br/><input type='text' onChange={(e)=>setNovaSubcategoriaNome(e.target.value)}/></label><br/><br/>
                <label>Categoria<br/>
                    <select value={novaSubcategoriaIdCategoria} onChange={(e)=>setNovaSubcategoriaIdCategoria(e.target.value)}>
                        {Object.values(categorias).map((c)=><option value={c.id}>{c.nome}</option>)}
                    </select>
                </label><br/>
                <button style={{position:'absolute', bottom:0}} onClick={addSubCategoria}>adicionar</button>
            </span>
        </div>
    )
}

export default Categorias;