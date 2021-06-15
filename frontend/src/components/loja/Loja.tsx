import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import GetItensLoja from "../../api/getItensLoja";

interface ICarrouselImage {
    src: string;
    link: string;
}
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
            <div className={'left-navbar-secao'}>
                <div><span style={{backgroundColor: "#48451c"}}></span>ASSENTOS</div>
                <div>Cadeiras</div>
                <div>Poltronas</div>
                <div>Bancos</div>
                <div>Banquetas</div>
            </div>
            <div className={'left-navbar-secao'}>
                <div><span style={{backgroundColor: "#bf5928"}}></span>MESAS</div>
                <div>Estar/Jantar</div>
                <div>Bancada</div>
                <div>Escritório</div>
                <div>Centro</div>
                <div>Apoio</div>
            </div>
            <div className={'left-navbar-secao'}>
                <div><span style={{backgroundColor: "#68999e"}}></span>ARMAZENAMENTO</div>
                <div>Estantes</div>
                <div>Armários</div>
                <div>Prateleiras e painéis</div>
                <div>Sapateiras</div>
            </div>
            <div className={'left-navbar-secao'}>
                <div><span style={{backgroundColor: "#feba12"}}></span>ACESSÓRIOS</div>
                <div>Iluminação</div>
                <div>Escritório</div>
            </div>
            <div className={'left-navbar-texto-vazado'}><span style={{backgroundColor: "red"}}></span>OFERTAS/<br/>FRETE GRÁTIS</div>
        </div>
    );
}

const ItensLoja = function() {
    const [itensLoja, setItensLoja] = useState<any[]>([]);
    
    useEffect(()=>{
        GetItensLoja()
        .then((resp:any)=>{
            setItensLoja(resp)
        })
        .catch((error)=>console.log(error))
    }, [])

    return (
        <div className={'itens-loja-box'}>
            {itensLoja.map((i)=>{
                return (
                    <div className={'item-loja-card'}>
                        <Link to={`/item/${i.id}`}>
                            <div className={'item-loja-card-minibox'}>
                                <img src={i.imagemPrincipal} className={'item-loja-card-img'}/>
                            </div>
                        </Link>
                        <div className={'item-loja-nome-preco-minibox'}>
                            <span>{i.nome}</span><br/>
                            <span style={{fontSize: '1.2em'}}>R$ {i.preco.toFixed(2)}</span>
                        </div>
                        <div className={'item-loja-tags-minibox'}>
                            {i.tags?.map((t:any)=>{
                                <span className={'item-loja-tag ' + t.className}><span className={'item-loja-tag-text'}>{t.texto}</span></span>
                            })}
                        </div>
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
                <ItensLoja/>
            </div>
        </>
    )
}

export default Loja;