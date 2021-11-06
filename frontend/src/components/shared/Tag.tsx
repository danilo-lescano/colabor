const Tag = (value: {categoria: string, subcategoria: string, renderMode: string, cor: string}) => {
    const sizes = [6, 5, 5, 6, 4, 4, 7, 6, 2, 3, 5, 3, 8, 7, 7, 4, 7, 5, 4, 4, 6, 5, 9, 5, 5, 5, 6, 5, 5, 6, 4, 4, 7, 6, 2, 3, 5, 3, 8, 7, 7, 4, 7, 5, 4, 4, 6, 5, 9, 5, 5, 5, 2];
    sizes[-1] = 9;
    const a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";//alfabeto

    const calcFontSize = (str: string) => {
        let cont = 0;
        for(let i = 0; i < str.length; i++)
            cont += sizes[a.indexOf(str[i])];
        if(value.renderMode === 'card-mode') {
            if(cont < 85)
                return '1.2em';
            else if(cont < 90)
                return '1.1em';
            else if(cont < 94)
                return '1em';
            else if(cont <= 100)
                return '.9em';
            else
                return '.8em';
        }
        else if(value.renderMode === 'tuple-mode') {
            if(cont < 50)
                return '1.1em';
            else if(cont < 55)
                return '1.0em';
            else if(cont < 60)
                return '.9em';
            else if(cont <= 65)
                return '.8em';
            else
                return '.7em';
        }
        else if(value.renderMode === 'page-mode') {
            if(cont < 85)
                return '1.2em';
            else if(cont < 90)
                return '1.1em';
            else if(cont < 94)
                return '1em';
            else if(cont <= 100)
                return '.9em';
            else
                return '.8em';
        }
    }

    return (
        <>
            <span className={'item-loja-tag ' + value.renderMode + ' ' + 'sc.cssClass'} style={{backgroundColor: value.cor}}>
                <span className={'item-loja-tag-text ' + value.renderMode} style={{fontSize: calcFontSize(value.categoria)}}>{value.categoria}</span>
            </span>
            <span className={'item-loja-tag ' + value.renderMode + ' subcategoria'}><span className={'item-loja-tag-text ' + value.renderMode} style={{fontSize:calcFontSize(value.subcategoria)}}>{value.subcategoria}</span></span>
        </>
    )
}

export default Tag;