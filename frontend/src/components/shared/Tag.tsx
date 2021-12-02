import { useEffect, useRef, useState } from "react";
import Categoria from "../../model/Categoria";

const Tag = (value: {categoria: Categoria, subcategoria: string, renderMode: string, cor: string, onClick: (categoria: string, subCategorias: string[])=>void}) => {
    const [fontSize1, setFontSize1] = useState(14);
    const [fontSize2, setFontSize2] = useState(14);
    const tag1 = useRef(null);
    const tag2 = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);
    
    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize)
    })

    useEffect(()=>{
        let maxSize = width <= 600 ? 72 : 92;
        if((tag1 as any).current?.offsetWidth > maxSize)
            setFontSize1(fontSize1 - 0.1);
        if((tag2 as any).current?.offsetWidth > maxSize)
            setFontSize2(fontSize2 - 0.1);
    }, [fontSize1, fontSize2, width])

    const getSubcategorias = (sub?: string[]) => {
        return sub ? sub : [];
    }

    return (
        <>
            {value.categoria ? 
                <><span className={'item-loja-tag clickable ' + value.renderMode + ' ' + 'sc.cssClass'} style={{backgroundColor: value.cor}} onClick={()=>{value.onClick(value.categoria.nome, getSubcategorias(value.categoria.subcategorias)); console.log(1111)}}>
                    <span ref={tag1} className={'item-loja-tag-text ' + value.renderMode} style={{fontSize: `${fontSize1}px`}}>{value.categoria.nome}</span>
                </span><br/></>
            : null}
            {value.subcategoria ? 
                <span className={'item-loja-tag clickable ' + value.renderMode + ' subcategoria'} onClick={()=>value.onClick(value.categoria.nome, [value.subcategoria])}><span ref={tag2} className={'item-loja-tag-text ' + value.renderMode} style={{fontSize: `${fontSize2}px`}}>{value.subcategoria}</span></span>
            : null}
        </>
    )
}

export default Tag;