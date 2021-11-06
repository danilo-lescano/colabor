import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import { GetCategorias } from "../../api/categoriaAPI";
import { GetItens } from "../../api/ItemAPI";
import Categoria from "../../model/Categoria";
import Item from "../../model/Item";
import Carrousel from "./Carrousel";
import Tag from "../shared/Tag";

const Loja = () => {
    const [itens, setItens] = useState<Item[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [renderMode, setRenderMode] = useState('card-mode'); // tuple-mode card-mode page-mode

    const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
    const [fieldPesquisa, setFieldPesquisa] = useState('');

    useEffect(()=>{
        fetchItens();
        fetchCategorias();
    }, []);

    const fetchItens = async () => {
        let resp : any = await GetItens();
        if(resp.data)
            setItens(resp.data as Item[])
    };

    const fetchCategorias = async () => {
        let resp : any = await GetCategorias();
        if(resp.data)
            setCategorias(resp.data as Categoria[])
    };

    const getCor = (id: string)=>{
        for(let i = 0; i < categorias.length; ++i)
            if(categorias[i].id === id)
                return categorias[i].cor;
        return ''
    }
    const getNome = (id: string)=>{
        for(let i = 0; i < categorias.length; ++i)
            if(categorias[i].id === id)
                return categorias[i].nome;
        return ''
    }

    const addOrRemoveSubCategories = (categoriaNome: string, subcategoriaList: string[]) => {
        const remove = () => {
            for(let i = 0; i < subcategoriaList.length; ++i) {
                let index = selectedSubCategories.indexOf(subcategoriaList[i]);
                if(index > -1)
                    selectedSubCategories.splice(index, 1);
            }
            setSelectedSubCategories([...selectedSubCategories]);
            console.log(selectedSubCategories);
        }
        const add = () => {
            let aux = selectedSubCategories.concat(subcategoriaList);
            aux.filter((item, index) => aux.indexOf(item) === index);
            console.log(aux)
            setSelectedSubCategories(aux);
        }

        for(let i = 0; i < subcategoriaList.length; ++i)
            subcategoriaList[i] = `${categoriaNome}-${subcategoriaList[i]}`;

        let flag = false;
        if(subcategoriaList.length === 1)
            flag = selectedSubCategories.includes(subcategoriaList[0]);
        else
            for(let i = 0; i < selectedSubCategories.length; ++i) {
                if(selectedSubCategories[i].startsWith(categoriaNome + '-')) {
                    flag = true;
                    break;
                }
            }
        if(flag)
            remove();
        else
            add();
    }

    return (
        <>
            <Carrousel itens={itens}/>
            <div className={'veja-mais-btn'} onClick={()=>window.scroll({
                top: window.innerHeight,
                behavior: 'smooth'
            })}>
                <span>
                    EXPLORE A<br/>
                    <span style={{color: 'black'}}>NOSSA LOJA!</span><br/>
                    <div className={'down-arrow'}><span></span></div>
                </span>
            </div>
            <div className={'loja-wrapper'}>
                <div className={'left-navbar-box'}>
                    <div className={'left-navbar-explore'}>EXPLORE!</div>
                    <div>
                        <div className={'left-navbar-format-btn'} onClick={()=>setRenderMode('tuple-mode')}>
                            <div className={'left-navbar-format-btn-line'}></div>
                            <div className={'left-navbar-format-btn-line'}></div>
                            <div className={'left-navbar-format-btn-line'}></div>
                            <div className={'left-navbar-format-btn-line'}></div>
                        </div>
                        <div className={'left-navbar-format-btn'} onClick={()=>setRenderMode('card-mode')}></div>
                        <div className={'left-navbar-format-btn'} onClick={()=>setRenderMode('page-mode')}></div>
                    </div>
                    <div>
                        <input type={'text'} placeholder={'Pesquisar'} className={'left-navbar-input'}
                            onChange={e=>setFieldPesquisa(e.target.value)}/>
                    </div>
                    {categorias.map((c)=>{
                        return <div className={'left-navbar-secao'}>
                            <div className={"clickable"} onClick={
                                () => addOrRemoveSubCategories(c.nome, c.subcategorias ? [...c.subcategorias] : [])
                            }><span style={{backgroundColor: c.cor}}></span>{c.nome.toUpperCase()}</div>
                            {c.subcategorias?.map((sc)=>{
                                let bold = selectedSubCategories.includes(`${c.nome}-${sc}`);
                                return <div className={bold ? 'clickable bold' : 'clickable'} onClick={() => addOrRemoveSubCategories(c.nome, [sc])}>{sc}</div>
                            })}
                        </div>
                    })}
                    {/*<div className={'left-navbar-texto-vazado'}><span style={{backgroundColor: "red"}}></span>OFERTAS/<br/>FRETE GRÁTIS</div>*/}
                </div>
                
                <div className={'itens-loja-box ' + renderMode}>
                    {itens.map((i)=>{
                        let categoriaNome = i.subcategoria ? getNome(i.subcategoria.idCategoria) : '';
                        let subcategoriaNome = i.subcategoria ? i.subcategoria.nome : '';
                        let cor = i.subcategoria ? getCor(i.subcategoria.idCategoria) : '';
                        let regex = new RegExp(fieldPesquisa.toUpperCase());
                        let flag = (selectedSubCategories.includes(`${categoriaNome}-${subcategoriaNome}`) || selectedSubCategories.length === 0) && (fieldPesquisa === '' || regex.test(i.nome.toUpperCase()));
                        return flag ? (
                            <div className={'item-loja-card ' + renderMode}>
                                <Link to={`/item/${i.id}`}>
                                    <div className={'item-loja-card-minibox ' + renderMode}>
                                        <img src={i.imagemPrincipal} className={'item-loja-card-img ' + renderMode}/>
                                    </div>
                                </Link>
                                <span className={'item-loja-span ' + renderMode}>
                                    <div className={'item-loja-nome-preco-minibox ' + renderMode}>
                                        <span>{i.nome}</span><br/>
                                    </div>
                                    <div className={'item-loja-tags-minibox ' + renderMode}>
                                        <Tag categoria={categoriaNome} subcategoria={subcategoriaNome} renderMode={renderMode} cor={cor}/>
                                    </div>
                                </span>
                            </div>
                        ): null;
                    })}
                </div>
            </div>
        </>
    )
}

export default Loja;