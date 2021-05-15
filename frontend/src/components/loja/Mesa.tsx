import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import placeholder3 from '../../assets/placeholder3.png';
import placeholder4 from '../../assets/placeholder4.png';

interface ICarrouselImage {
    src: string;
    link: string;
}
const getCarrouselImages = () => {
    return [
        {
            src: 'https://a-static.mlcdn.com.br/618x463/mesa-industrial-bernardo-madeira-macica-c-ferragem-preta-180m-maharaecodesign/enebuy/535333/bc9f390b8fc37dde0f02dbf5041b599f.jpg',
            link: '/'
        },
        {
            src: 'https://a-static.mlcdn.com.br/618x463/mesa-industrial-lanna-madeira-macica-c-ferragem-preta-220m-maharaecodesign/enebuy/535318/883b58a5ac3259222a21ab4431af12cd.jpg',
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


const Mesa = () => {
    return (
        <>
            <Carrousel/>
            <img src={placeholder3} style={{margin: '100px 15%'}}/>
            <br/>
            <p style={{margin: '100px 15%', maxWidth: '500px'}}>Lorem ipsum dolor sit amet, consectetuer adipiscing
elit, sed diam nonummy nibh euismod tincidunt ut
laoreet dolore magna aliquam erat volutpat. Ut wisi
enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
consequat. Duis autem vel eum iriure dolor in hendrerit
in vulputate velit esse molestie consequat, vel illum
dolore eu feugiat nulla facilisis at vero eros et accumsan
et iusto odio dignissim qui blandit praesent luptatum</p>
            <img src={placeholder4} style={{margin: '100px 15%', float: 'right'}}/>
        </>
    )
}

export default Mesa;