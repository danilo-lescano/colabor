import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Item from "../../model/Item";


const getCarrouselImages = (itens?: Item[]) => {
    itens = itens ? itens : [];
    let srcAndLink: any[] = [];
    let prioridade: Item[] = [];
    let normal: Item[] = [];
    itens.forEach(item=>{
        if(item.fixarNoInicio)
            prioridade.push(item);
        else
            normal.push(item);
    });

    for(let i = 0; i < prioridade.length; ++i) {
        let imgs = prioridade[i].imagensCarrossel;
        if(imgs && imgs.length > 0) {
            srcAndLink.push({
                src: imgs[0],
                link: '/item/'+prioridade[i].id,
            })
        }
    }
    for(let i = 0; i < normal.length && srcAndLink.length < 6; ++i) {
        let imgs = normal[i].imagensCarrossel;
        if(imgs && imgs.length > 0) {
            srcAndLink.push({
                src: imgs[0],
                link: '/item/'+normal[i].id,
            })
        }
    }

    return srcAndLink;
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

const Carrousel = (values: {itens?: Item[]}) => {
    let { itens } = {...values};

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
    }, [indexCurentImage, carrouselImages]);

    useEffect(()=>{
        setCarrouselImages(getCarrouselImages(itens));
        setIndexCurentImage(0);
    }, [itens])

    return (
        <div className={'carrousel-box'}>
            <div className={'carrousel-inner-box'} style={{width: 'calc( 100% *' + carrouselImages.length + ' )', transform: 'translateX(-' + 100/carrouselImages.length*indexCurentImage + '%)', height: 'calc( 100vw * 0.5625)'}}>
                {Object.values(carrouselImages).map((image) =>
                    <span style={{width: 'calc( 100% /' + carrouselImages.length + ' )', height: 'calc( 100vw * 0.5625)'}}>
                        <Link to={image.link}><img key={image.src} src={image.src} className={'carrousel-inner-box-img'}/></Link>
                    </span>
                )}
            </div>
            {carrouselImages.length > 0 ?
                <CarrouselButtons numDots={carrouselImages.length} indexCurentImage={indexCurentImage} updateDotBtn={updateDotBtn}/> : null
            }
        </div>
    );
}

export default Carrousel;