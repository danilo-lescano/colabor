import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import placeholder1 from '../../assets/placeholder1.png';

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
        <div>
            
        </div>
    );
}

const Loja = () => {
    return (
        <>
            <Carrousel/>
            <img src={placeholder1} style={{margin: '100px 15%'}}/>
        </>
    )
}

export default Loja;