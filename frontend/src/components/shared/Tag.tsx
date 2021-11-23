import { useEffect, useRef, useState } from "react";

const Tag = (value: {categoria: string, subcategoria: string, renderMode: string, cor: string}) => {
    const [fontSize1, setFontSize1] = useState(14);
    const [fontSize2, setFontSize2] = useState(14);
    const tag1 = useRef(null);
    const tag2 = useRef(null);

    useEffect(()=>{
        if((tag1 as any).current?.offsetWidth > 92)
            setFontSize1(fontSize1 - 0.1);
        if((tag2 as any).current?.offsetWidth > 92)
            setFontSize2(fontSize2 - 0.1);
    }, [fontSize1, fontSize2])


    return (
        <>
            {value.categoria ? 
                <><span className={'item-loja-tag ' + value.renderMode + ' ' + 'sc.cssClass'} style={{backgroundColor: value.cor}}>
                    <span ref={tag1} className={'item-loja-tag-text ' + value.renderMode} style={{fontSize: `${fontSize1}px`}}>{value.categoria}</span>
                </span><br/></>
            : null}
            {value.subcategoria ? 
                <span className={'item-loja-tag ' + value.renderMode + ' subcategoria'}><span ref={tag2} className={'item-loja-tag-text ' + value.renderMode} style={{fontSize: `${fontSize2}px`}}>{value.subcategoria}</span></span>
            : null}
        </>
    )
}

export default Tag;