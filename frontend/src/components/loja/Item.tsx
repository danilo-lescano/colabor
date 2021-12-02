import { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import {toast} from 'react-toastify';
import { GetCategorias } from "../../api/categoriaAPI";
import { GetItem } from "../../api/ItemAPI";
import Categoria from "../../model/Categoria";
import Item from "../../model/Item";
import Session from '../../session/Session'
import Tag from "../shared/Tag";

const toastConfig = {
    autoClose: 3000,
    position: toast.POSITION.BOTTOM_LEFT
};

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


const Carrousel = (values: {imgs: string[] | undefined}) => {
    const {imgs} = {...values}
    const updateDot = () => {
        setIndexCurentImage((indexCurentImage+1)%carrouselImages.length);
    }
    const updateDotBtn = (n: number) => {
        var index = (indexCurentImage + n) < 0 ? carrouselImages.length-1 : (indexCurentImage+n)%carrouselImages.length;
        setIndexCurentImage(index);
    }

    const [carrouselImages, setCarrouselImages] = useState(imgs ? imgs : []);
    const [indexCurentImage, setIndexCurentImage] = useState(0);
    const [timeoutCarrousel] = useState<ReturnType<typeof setTimeout>[]>([]);

    useEffect(()=>{
        if(imgs) {
            let urls: string[] = []
            imgs.forEach(image => {
                if(image)
                    urls.push(image)
            })
            setCarrouselImages(urls);
        }
    }, [imgs]);
    useEffect(()=>{
        timeoutCarrousel.map(t => clearTimeout(t));
        timeoutCarrousel.push(setTimeout(()=>updateDot(), 7000));
    }, [indexCurentImage, carrouselImages]);
    if(!imgs || imgs.length === 0) return <span></span>;

    return (
        <div className={'carrousel-box'}>
            <div className={'carrousel-inner-box'} style={{width: 'calc( 100% *' + carrouselImages.length + ' )', transform: 'translateX(-' + 100/carrouselImages.length*indexCurentImage + '%)'}}>
                {Object.values(carrouselImages).map((image) =>
                    <span style={{width: 'calc( 100% /' + carrouselImages.length + ' )'}}>
                        <img key={image} src={image} className={'carrousel-inner-box-img'}/>
                    </span>
                )}
            </div>
            {carrouselImages.length > 0 ?
                <CarrouselButtons numDots={carrouselImages.length} indexCurentImage={indexCurentImage} updateDotBtn={updateDotBtn}/> : null
            }
        </div>
    );
}


const ItemPage = () => {
    const {lojaitemId} = useParams<any>();
    const [item, setItem] = useState<Item>({id: '', nome: ''});
    const {carrinho, setCarrinho} = useContext(Session);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(()=>{
        fetchCategorias();
        getItem();
    }, []);

    const getItem = async () => {
        let resp: any = await GetItem(lojaitemId);
        if(resp && resp.data)
            setItem(resp.data as Item);
    }

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
        return '';
    }
    const getCategoria = (id: string)=>{
        for(let i = 0; i < categorias.length; ++i)
            if(categorias[i].id === id)
                return categorias[i];
        return {id: '', nome: '', cor: ''};
    }

    const comprar = async () => {
        if(item && item.id) {
            carrinho.push(item);
            localStorage.setItem('carrinho-colabor', JSON.stringify(carrinho));
            setCarrinho([...carrinho]);
            toast.success("Item adicionado ao carrinho", toastConfig);
        }
    }

    return (
        item ? <>
            <Carrousel imgs={item.imagensCarrossel}/>
            <br/>
            <div className={'item-loja-main-section-box'}>
                <div className={'item-loja-main-section-left'}>
                    <div className={'item-loja-main-section-left-title'}>{item.nome}</div>
                    <div className={'item-loja-main-section-left-subtitle'}>{item.subtitulo /*Produto <span>Coletivo Labor</span>*/}</div>
                    <div className={'item-loja-main-section-left-tags-minibox'}>
                        {/*item.subcategoria ? <>
                            <span className={'item-loja-main-section-left-tag no-border'} style={{backgroundColor: getCor(item.subcategoria.idCategoria)}}><span className={'item-loja-main-section-left-tag-text'}>{getNome(item.subcategoria.idCategoria)}</span></span>
                            <span className={'item-loja-main-section-left-tag'}><span className={'item-loja-main-section-left-tag-text'}>{item.subcategoria.nome}</span></span>
                        </> : null*/}
                        {item.subcategoria ? <>
                            <Tag categoria={getCategoria(item.subcategoria.idCategoria)} subcategoria={item.subcategoria.nome} renderMode={''} cor={getCor(item.subcategoria.idCategoria)} onClick={(s: string, ss: string[])=>{}}/>
                        </> : null}
                    </div>
                    <div style={{textAlign: 'justify'}}>{item.descricao}</div>
                </div>
                <div className={'item-loja-main-section-right'}>
                    <div>
                        <div className={'item-loja-main-section-right-preco'}>
                            Faça um<br/>Orçamento</div>
                        <a href={'https://wa.me/5567984247615'} target={'_blank'}>
                            <button className={'item-loja-btn-compra'}><span className={'item-loja-main-section-left-tag-text'}>AQUI</span></button>
                        </a>
                    </div>
                </div>
            </div>
            <div className={'item-loja-mosaico-box'}>
                <div className={'item-loja-mosaico-box-column one'}>
                    {item.imagensMosaico && item.imagensMosaico[0] ? <img className={'item-loja-mosaico-box-column-img'} src={item.imagensMosaico[0]}/> : null}
                    {item.imagensMosaico && item.imagensMosaico[1] ? <img className={'item-loja-mosaico-box-column-img'} src={item.imagensMosaico[1]}/> : null}
                </div>
                <div className={'item-loja-mosaico-box-column two'}>
                    {item.imagensMosaico && item.imagensMosaico[2] ? <img className={'item-loja-mosaico-box-column-img'} src={item.imagensMosaico[2]}/> : null}
                    {item.imagensMosaico && item.imagensMosaico[3] ? <img className={'item-loja-mosaico-box-column-img'} src={item.imagensMosaico[3]}/> : null}
                </div>
            </div>
            <div className={'mobile-box'} style={{marginBottom: 130}}>
                <div className={'descricao-mobile-nome'}>{item.nome}</div>
                <div className={'descricao-mobile'}>{item.descricao}</div>

                <div className={'descricao-mobile-tecnica'}>
                    {item.descricaoTecnica || item.peso || item.altura || item.largura || item.profundidade ? 'Descrição' : null}
                </div>
                
                <div className={'descricao-mobile-tecnica-texto'}>
                    {item.descricaoTecnica ? <div>{item.descricaoTecnica}</div> : null}
                    {item.peso ? <div>Peso: {item.peso}</div> : null}
                    {item.altura ? <div>Altura: {item.altura}</div> : null}
                    {item.largura ? <div>Largura: {item.largura}</div> : null}
                    {item.profundidade ? <div>Profundidade: {item.profundidade}</div> : null}

                </div>
                {item.imagemIcone ? <img src={item.imagemIcone} style={{width: '100%', boxSizing: 'border-box', padding: '0px 80px'}}/> : null}
            </div>
            <div className={'item-loja-descricao-box'}>
                {item.imagemIcone ? <img src={item.imagemIcone}/> : null}
                <div>
                    {item.descricaoTecnica || item.peso || item.altura || item.largura || item.profundidade ? <span>Descrição<br/><br/></span> : null}
                    {item.descricaoTecnica ? <div>{item.descricaoTecnica}</div> : null}
                    {item.peso ? <div>Peso: {item.peso}</div> : null}
                    {item.altura ? <div>Altura: {item.altura}</div> : null}
                    {item.largura ? <div>Largura: {item.largura}</div> : null}
                    {item.profundidade ? <div>Profundidade: {item.profundidade}</div> : null}

                </div>
            </div>
        </> : null
    )
}

export default ItemPage;