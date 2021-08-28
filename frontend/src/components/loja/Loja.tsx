import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import Categoria from "../../model/Categoria";
import Item from "../../model/Item";
import Subcategoria from "../../model/Subcatecorias";
import Carrousel from "./Carrousel";

const Loja = () => {
    const [itens] = useState<Item[]>([]);
    const [categorias] = useState<Categoria[]>([]);
    const [renderMode, setRenderMode] = useState('page-mode'); //useState('tuple-mode'); //useState('card-mode');

    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async () => {
        //itens = await GetItens();
        //categorias = await GetCategorias();
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
            <Carrousel/>
            <div style={{verticalAlign: 'top', position: 'relative', width: '70%', marginLeft: '50%', transform: 'translate(-50%)', minWidth: '1000px', maxWidth: '1080px'}}>
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
                        <input type={'text'} placeholder={'Pesquisar'} className={'left-navbar-input'}/>
                    </div>
                    {categorias.map((c)=>{
                        return <div className={'left-navbar-secao'}>
                            <div><span style={{backgroundColor: c.cor}}></span>{c.nome.toUpperCase()}</div>
                            {c.subcategorias?.map((sc)=>{
                                return <div>{sc.nome}</div>
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
                                        <span style={{fontSize: '1.2em'}}>R$ {i.preco.toFixed(2)}</span>
                                    </div>
                                    <div className={'item-loja-tags-minibox ' + renderMode}>
                                        {i.subcategorias?.map((sc:Subcategoria)=>
                                            <>
                                                <span className={'item-loja-tag ' + renderMode + ' ' + 'sc.cssClass'} style={{backgroundColor: getCor(sc.idCategoria)}}><span className={'item-loja-tag-text ' + renderMode}>{getNome(sc.idCategoria)}</span></span>
                                                <span className={'item-loja-tag ' + renderMode + ' '}><span className={'item-loja-tag-text ' + renderMode}>{sc.nome}</span></span>
                                            </>
                                        )}
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