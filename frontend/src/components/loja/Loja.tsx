import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import { GetCategorias } from "../../api/categoriaAPI";
import { GetItens } from "../../api/ItemAPI";
import Categoria from "../../model/Categoria";
import Item from "../../model/Item";
import Carrousel from "./Carrousel";

const Loja = () => {
    const [itens, setItens] = useState<Item[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [renderMode, setRenderMode] = useState('card-mode'); // tuple-mode card-mode page-mode

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
                            onChange={e=>{
                                console.log(e.target.value)
                            }}/>
                    </div>
                    {categorias.map((c)=>{
                        return <div className={'left-navbar-secao'}>
                            <div><span style={{backgroundColor: c.cor}}></span>{c.nome.toUpperCase()}</div>
                            {c.subcategorias?.map((sc)=>{
                                return <div>{sc}</div>
                            })}
                        </div>
                    })}
                    <div className={'left-navbar-texto-vazado'}><span style={{backgroundColor: "red"}}></span>OFERTAS/<br/>FRETE GRÁTIS</div>
                </div>
                
                <div className={'itens-loja-box ' + renderMode}>
                    {itens.map((i)=>{
                        return (
                            <div className={'item-loja-card ' + renderMode}>
                                <Link to={`/item/${i.id}`}>
                                    <div className={'item-loja-card-minibox ' + renderMode}>
                                        <img src={i.imagemPrincipal} className={'item-loja-card-img ' + renderMode}/>
                                    </div>
                                </Link>
                                <span className={'item-loja-span ' + renderMode}>
                                    <div className={'item-loja-nome-preco-minibox ' + renderMode}>
                                        <span>{i.nome}</span><br/>
                                        <span style={{fontSize: '1.2em'}}>R$ {i.preco?.toFixed(2)}</span>
                                    </div>
                                    <div className={'item-loja-tags-minibox ' + renderMode}>
                                        {i.subcategoria ? <>
                                            <span className={'item-loja-tag ' + renderMode + ' ' + 'sc.cssClass'} style={{backgroundColor: getCor(i.subcategoria.idCategoria)}}><span className={'item-loja-tag-text ' + renderMode}>{getNome(i.subcategoria.idCategoria)}</span></span>
                                            <span className={'item-loja-tag ' + renderMode + ' subcategoria'}><span className={'item-loja-tag-text ' + renderMode}>{i.subcategoria.nome}</span></span>
                                        </> : null}
                                    </div>
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Loja;