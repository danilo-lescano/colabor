import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import { getAllCategorias } from "../../api/categoriaAPI";
import GetItensLoja from "../../api/getItensLoja";


const getCarrouselImages = () => {
    return [
        {
            src: 'https://wallpaperaccess.com/full/124573.jpg',
            link: '/'
        },
        {
            src: 'https://hdwallpaperim.com/wp-content/uploads/2017/08/22/435641-ultra-wide-space.jpg',
            link: '/'
        },
        {
            src: 'https://wallpaperaccess.com/full/124573.jpg',
            link: '/'
        },
        {
            src: 'https://hdwallpaperim.com/wp-content/uploads/2017/08/22/435641-ultra-wide-space.jpg',
            link: '/'
        },
        {
            src: 'https://wallpaperaccess.com/full/124573.jpg',
            link: '/'
        },
        {
            src: 'https://hdwallpaperim.com/wp-content/uploads/2017/08/22/435641-ultra-wide-space.jpg',
            link: '/'
        },]
}

const CarrouselButtons = (props:{numDots: number, indexCurentImage: number, updateDotBtn: (n: number)=>void}) => {
    const {numDots, indexCurentImage, updateDotBtn} = props;
    let dots = [];

    for(let i = 0; i < numDots; i++)
        dots.push(<div key={'dot'+i} id={'dot'+i} className={ i === indexCurentImage ? 'carrousel-dot ativo' : 'carrousel-dot'}></div>);

    return (
        <div className={'carrousel-dot-box'}>
            <div className={'left-arrow'} onClick={()=>updateDotBtn(-1)}><span></span></div>
            {dots.map(dot=>dot)}
            <div className={'right-arrow'} onClick={()=>updateDotBtn(1)}><span></span></div>
        </div>
    )
}


const Carrousel = () => {
    const updateDot = () => {
        setIndexCurentImage((indexCurentImage+1)%carrouselImages.length);
    }
    const updateDotBtn = (n: number) => {
        var index = (indexCurentImage + n) < 0 ? carrouselImages.length-1 : (indexCurentImage+n)%carrouselImages.length;
        setIndexCurentImage(index);
    }

    const [carrouselImages, setCarrouselImages] = useState(getCarrouselImages());
    const [indexCurentImage, setIndexCurentImage] = useState(0);
    const [timeoutCarrousel] = useState<ReturnType<typeof setTimeout>[]>([]);

    useEffect(()=>{
        timeoutCarrousel.map(t => clearTimeout(t));
        timeoutCarrousel.push(setTimeout(()=>updateDot(), 7000));
    }, [indexCurentImage]);

    return (
        <div className={'carrousel-box'}>
            <div className={'carrousel-inner-box'} style={{width: 'calc( 100% *' + carrouselImages.length + ' )', transform: 'translateX(-' + 100/carrouselImages.length*indexCurentImage + '%)'}}>
                {Object.values(carrouselImages).map((image) =>
                    <Link to={image.link}><img src={image.src} style={{width: 'calc( 100% /' + carrouselImages.length + ' )'}}/></Link>
                )}
            </div>
            {carrouselImages.length > 0 ?
                <CarrouselButtons numDots={carrouselImages.length} indexCurentImage={indexCurentImage} updateDotBtn={updateDotBtn}/> : null
            }
        </div>
    );
}

const LeftNavBar =() => {
    const [categorias, setCategorias] = useState<any[]>([]);
    
    useEffect(()=>{
        getAllCategorias({})
        .then((resp:any)=>{
            setCategorias(resp);
        })
        .catch((error)=>console.log(error));
    }, [])
    return (
        <div className={'left-navbar-box'}>
            <div className={'left-navbar-explore'}>EXPLORE!</div>
            <div>
                <div className={'left-navbar-format-btn'}>
                    <div className={'left-navbar-format-btn-line'}></div>
                    <div className={'left-navbar-format-btn-line'}></div>
                    <div className={'left-navbar-format-btn-line'}></div>
                    <div className={'left-navbar-format-btn-line'}></div>
                </div>
                <div className={'left-navbar-format-btn'}></div>
                <div className={'left-navbar-format-btn'}></div>
            </div>
            <div>
                <input type={'text'} placeholder={'Pesquisar'} className={'left-navbar-input'}/>
            </div>
            {categorias.map((c)=>{
                return (c.titulo.toLowerCase() !== 'oferta' ? <div className={'left-navbar-secao'}>
                    <div><span style={{backgroundColor: c.categoriaCor}}></span>{c.titulo.toUpperCase()}</div>
                    {c.subCategorias.map((sc:any)=>{
                        return <div>{sc}</div>
                    })}
                </div> : null)
            })}
            <div className={'left-navbar-texto-vazado'}><span style={{backgroundColor: "red"}}></span>OFERTAS/<br/>FRETE GRÁTIS</div>
        </div>
    );
}

const ItensLojaFormatoCards = function() {
    const [itensLoja, setItensLoja] = useState<any[]>([]);
    const [categorias, setCategorias] = useState<any[]>([]);
    const [renderMode, setRenderMode] = useState('page-mode'); //useState('tuple-mode'); //useState('card-mode');
    
    useEffect(()=>{
        let promises = [];
        let aux_categorias: any[];
        let aux_itens: any[];
        promises[0] = GetItensLoja()
        .then((resp:any)=>{
            aux_itens = resp;
        })
        .catch((error)=>console.log(error));

        promises[1] = getAllCategorias({})
        .then((resp:any)=>{
            aux_categorias = resp;
        })
        .catch((error)=>console.log(error));

        Promise.all(promises).then(()=>{
            for(let i = 0; i < aux_categorias.length; ++i) {
                for(let k = 0; k < aux_itens.length; ++k) {
                    let flag = false;
                    for(let l = 0; l < aux_itens[k].categorias.length; ++l) {
                        if(aux_categorias[i].subCategorias.includes(aux_itens[k].categorias[l])) {
                            if(!aux_itens[k].tags) aux_itens[k].tags = [];
                            if(!flag) {
                                flag = true;
                                aux_itens[k].tags[aux_itens[k].tags.length] = {
                                    texto: aux_categorias[i].titulo,
                                    cor: aux_categorias[i].categoriaCor,
                                    cssClass: 'categoria'
                                }
                            }
                            aux_itens[k].tags[aux_itens[k].tags.length] = {
                                texto: aux_itens[k].categorias[l],
                                cssClass: 'subcategoria'
                            }
                        }
                    }
                }
            }
            setItensLoja(aux_itens);
            setCategorias(aux_categorias);
        });
    }, [])

    return (
        <div className={'itens-loja-box ' + renderMode}>
            {itensLoja.map((i)=>{
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
                                {i.tags?.map((t:any)=><span className={'item-loja-tag ' + renderMode + ' ' + t.cssClass} style={{backgroundColor: t.cor}}><span className={'item-loja-tag-text ' + renderMode}>{t.texto}</span></span>)}
                            </div>
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

const Loja = () => {
    return (
        <>
            <Carrousel/>
            <div style={{verticalAlign: 'top', position: 'relative', width: '70%', marginLeft: '50%', transform: 'translate(-50%)', minWidth: '1000px', maxWidth: '1080px'}}>
                <LeftNavBar/>
                <ItensLojaFormatoCards/>
            </div>
        </>
    )
}

export default Loja;