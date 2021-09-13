import { useEffect, useState } from "react"
import { GetCategorias } from "../../api/categoriaAPI";
import { GetItem, UpdateItem, UploadImage } from "../../api/ItemAPI";
import Categoria from "../../model/Categoria";
import Item from "../../model/Item";
import Spinner from "../acessorios/Spinner";

const SendItem = async function (args: any) {
    console.log(args.item)
    console.log(await UpdateItem(args.item));
    return;
}

const itemInitialState: Item = {
    id: '',
    nome: '',
    imagensCarrossel: ['','','','','',''],
    imagensMosaico: ['','','','']
};

const Checkbox = function (values: {tag: string, onClick: (e:any)=>void, checked: boolean}) {
    const {tag, onClick, checked} = {...values}
    const [flag, setFlag] = useState(false);
    const updateOnChange = ()=>setFlag(!flag);
    return (
        <label key={tag+"-checkbox"}><input type={'radio'} name={'categoria-radio'} value={tag} onClick={(e)=>{onClick(e as any); updateOnChange();}} checked={checked}/>{tag}</label>
    )
}

const DropImage = function (values: {url: string, onChange: (url:string)=>void}) {
    const {url, onChange} = {...values};
    const [isDropover, setIsDropover] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onDrop = async (e: any) => {
        e.preventDefault();
        setIsDropover(false);
        if (e.dataTransfer.files.length) {
            setIsLoading(true);
            let r = new FileReader();
            r.onload = async ()=>{
                let newurl: string = (await UploadImage([r.result]) as any).data as string;
                console.log(newurl);
                onChange(newurl);
                setIsLoading(false);
            }
            r.readAsDataURL(e.dataTransfer.files[0]);
        }
    };
    
    return (
        <div style={{display:'inline-block', width: 100, height: 100, backgroundColor: 'rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden'}}>
            {url && url.length > 0 ? <img style={{width:'100%', left: '50%', top: '50%', position: 'absolute', transform: 'translate(-50%, -50%)'}} src={url}/> :
            <div style={{border: isDropover ? 'solid 3px black' : 'dotted 3px black', width: 80, height: 80, left: '50%', top: '50%', position: 'absolute', transform: 'translate(-50%, -50%)'}}>
                <span style={{left: '50%', top: '50%', position: 'absolute', transform: 'translate(-50%, -50%)', fontWeight: 'bold', fontSize: '2em'}}>+</span>
            </div>}
            {isLoading ? <div style={{width: 100, height: 100, backgroundColor: 'rgba(0,0,0,0.2)', position: 'relative'}}><span style={{left: '50%', top: '50%', position: 'absolute', transform: 'translate(-50%, -50%)'}}><Spinner/></span></div>: null}
            <div style={{position: 'absolute', top: 0, left: 0, width: 100, height: 100}}
                onDragOver={(e)=>{setIsDropover(true); e.preventDefault();}}
                onDragLeave={()=>{setIsDropover(false);}}
                onDrop={(e)=>onDrop(e)}></div>
        </div>
    )
};

const Adicionar = function (args: {id?:string, iAddCallback:()=>void}) {
    const {iAddCallback} = {...args};
	const [session] = useState<any>(JSON.parse(localStorage.getItem('session') as string));
    const [item, setItem] = useState<Item>(itemInitialState);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const [sendItesFlag, setSendItesFlag] = useState(false);

    useEffect(()=>{
        loadItem();
    },[args]);

    useEffect(()=>{
        getAllCategorias();
    },[]);

    const getAllCategorias = async () => {
        const aux_categorias: any = await GetCategorias();
        if(aux_categorias)
            setCategorias(aux_categorias.data as Categoria[]);
    }
    const loadItem = async () => {
        if(args && args.id) {
            let aux: Item = (await GetItem(args.id) as any).data as Item;
            for(var i = 0; i < 6; ++i) {
                if(!aux.imagensCarrossel) aux.imagensCarrossel = [];
                aux.imagensCarrossel[i] = aux.imagensCarrossel[i] ? aux.imagensCarrossel[i] : '';
            }
            for(var i = 0; i < 4; ++i) {
                if(!aux.imagensMosaico) aux.imagensMosaico = [];
                aux.imagensMosaico[i] = aux.imagensMosaico[i] ? aux.imagensMosaico[i] : '';
            }

            setItem(aux);
        }
    };

    const addCategoria = (categoriaId: string, subcategoria: string) => {
        if(item) {
            item.subcategoria = {
                idCategoria: categoriaId,
                nome: subcategoria
            }
        }
        console.log(item)
        setItem({...item});
    };

    const deleteImage = async (inputId: string) => {
        await SendItem({
            tokenid: session.id,
            operation: 'removeImagem',
            data:{id: item.id, imagemNome: inputId}    
        })
        iAddCallback();
    };

    return (
        <div style={{position: 'relative', width: '70%', maxWidth: '1080px', minWidth: '1000px', marginLeft: '50%', transform: 'translate(-50%)'}}>
            <div style={{display: 'inline-block'}}>
                <span>Categorias</span><br/><br/>

                {Object.values(categorias).map((c:Categoria)=>{
                    return (<>
                        {c.nome !== 'oferta' ? <span style={{width:15, height: 15, backgroundColor:c.cor, position: 'relative', display: "inline-block", borderRadius:'100%'}}></span> : null}
                        <b>{c.nome}</b><br/>
                        {c.subcategorias ? Object.values(c.subcategorias).map((sc:any)=>{
                            return (<>
                                <Checkbox tag={sc} onClick={(e: any) => addCategoria(c.id, e.target.value)} checked={item.subcategoria?.idCategoria === c.id && item.subcategoria?.nome === sc}/><br/>
                            </>);
                        }) : null}
                        <br/>
                    </>);
                })}
            </div>
            <div style={{display: 'inline-block', verticalAlign: 'top', marginLeft: '30px'}}>
                <input type={'hidden'} value={item.id}/>
                <label>Nome do Produto</label><br/>
                <input type={'text'} value={item.nome} onChange={(e)=>{item.nome = e.target.value; setItem({...item})}}/><br/><br/>
                <label>Preço</label><br/>
                <input type={'text'} value={item.preco ? parseFloat(item.preco.toString()) : ''} onChange={(e) => {
                    let aux: any = parseFloat(e.target.value.replace(',', '.'));
                    if(isNaN(aux)) {
                        e.target.value = '';
                        return;
                    }
                    item.preco = aux;
                    setItem({...item});
                }}/><br/><br/>
                <label>Descrição/Apresentação</label><br/>
                <input type={'text'} value={item.descricao} onChange={(e)=>{item.descricao = e.target.value; setItem({...item})}}/><br/><br/>
                <label>Descrição Técnica</label><br/>
                <input type={'text'} value={item.descricaoTecnica} onChange={(e)=>{item.descricaoTecnica = e.target.value; setItem({...item})}}/><br/><br/>
                <label>Peso (kg)</label><br/>
                <input type={'text'} value={item.peso} onChange={(e)=>{item.peso = parseFloat(e.target.value); setItem({...item})}}/><br/><br/>
                <label>Altura (cm)</label><br/>
                <input type={'text'} value={item.altura} onChange={(e)=>{item.altura = parseFloat(e.target.value); setItem({...item})}}/><br/><br/>
                <label>Largura (cm)</label><br/>
                <input type={'text'} value={item.largura} onChange={(e)=>{item.largura = parseFloat(e.target.value); setItem({...item})}}/><br/><br/>
                <label>Profundidade (cm)</label><br/>
                <input type={'text'} value={item.profundidade} onChange={(e)=>{item.profundidade = parseFloat(e.target.value); setItem({...item})}}/><br/><br/>
            </div>
            <div style={{display: 'inline-block', verticalAlign: 'top', marginLeft: '30px'}}>
                <label>Promoção %</label><br/>
                <input type={'text'} value={item.promocaoPorcentagem} onChange={(e)=>{item.promocaoPorcentagem = parseFloat(e.target.value); setItem({...item})}}/><br/><br/>
                <label>Promoção fixa</label><br/>
                <input type={'text'} value={item.promocaoFixa} onChange={(e)=>{item.promocaoFixa = parseFloat(e.target.value); setItem({...item})}}/><br/><br/>
                <label>Quantidade</label><br/>
                <input type={'text'} value={item.quantidade} onChange={(e)=>{item.quantidade = parseFloat(e.target.value); setItem({...item})}}/><br/><br/>
                <label><input type='checkbox' checked={item.freteGratis} onClick={()=>{item.freteGratis = !item.freteGratis; setItem({...item})}}/> Frete Grátis</label><br/><br/>
                <label><input type='checkbox' checked={item.fixarNoInicio} onClick={()=>{item.fixarNoInicio = !item.fixarNoInicio; setItem({...item})}}/> Fixar no inicio</label><br/><br/>
            </div>
            <div style={{display: 'inline-block', verticalAlign: 'top', marginLeft: '30px'}}>
                <div>Imagem Principal</div>
                <span style={{position:'relative', display:'inline-block'}}>
                    <DropImage url={item.imagemPrincipal ? item.imagemPrincipal : ''} onChange={url=>{item.imagemPrincipal = url; setItem({...item});}}/>
                    {item.imagemPrincipal ? <span onClick={()=>deleteImage('imagemPrincipal')} style={{position:'absolute', top:0, right:0, fontWeight:'bold', cursor: 'pointer'}}>X</span> : null}
                </span><br/><br/>
                <div>Imagens Carrosel</div>
                {item.imagensCarrossel ? item.imagensCarrossel.map((imageURL, index)=>{
                    return(
                        <span key={'carrossel' + imageURL + index}>
                            <span style={{position:'relative', display:'inline-block'}}>
                                <DropImage url={imageURL} onChange={url=>{
                                    if(item.imagensCarrossel){
                                        for(let i = 0; i < item.imagensCarrossel.length; ++i)
                                            if(i === index || item.imagensCarrossel[i] === "") {
                                                item.imagensCarrossel[i] = url;
                                                break;
                                            }
                                    }
                                    else if(!item.imagensCarrossel)
                                        item.imagensCarrossel = [url];
                                    setItem({...item});
                                }}/>
                                {imageURL ? <span onClick={()=>deleteImage(imageURL)} style={{position:'absolute', top:0, right:0, fontWeight:'bold', cursor: 'pointer'}}>X</span> : null}
                            </span><div style={{width: 5, display: 'inline-block'}}></div>
                            {index > 0 && index % 2 ? <br/> : null}
                        </span>
                )}) : null}
            </div>
            <div style={{display: 'inline-block', verticalAlign: 'top', marginLeft: '30px'}}>
                <div>Imagem Icone</div>
                <span style={{position:'relative', display:'inline-block'}}>
                    <DropImage url={item.imagemIcone ? item.imagemIcone : ''} onChange={url=>{item.imagemIcone = url; setItem({...item});}}/>
                    {item.imagemIcone ? <span onClick={()=>deleteImage('imagemIcone')} style={{position:'absolute', top:0, right:0, fontWeight:'bold', cursor: 'pointer'}}>X</span> : null}
                </span><br/><br/>
                <div>Imagens Mosaico</div>
                {item.imagensMosaico ? item.imagensMosaico.map((imageURL, index)=>{
                    return(
                        <span key={'mosaico' + imageURL + index}>
                            <span style={{position:'relative', display:'inline-block'}}>
                                <DropImage url={imageURL} onChange={url=>{
                                    if(item.imagensMosaico){
                                        for(let i = 0; i < item.imagensMosaico.length; ++i)
                                            if(i === index || item.imagensMosaico[i] === "") {
                                                item.imagensMosaico[i] = url;
                                                break;
                                            }
                                        console.log("aqui")
                                    }
                                    else if(!item.imagensMosaico)
                                        item.imagensMosaico = [url];
                                    setItem({...item});
                                }}/>
                                {imageURL ? <span onClick={()=>deleteImage(imageURL)} style={{position:'absolute', top:0, right:0, fontWeight:'bold', cursor: 'pointer'}}>X</span> : null}
                            </span><div style={{width: 5, display: 'inline-block'}}></div>
                            {index > 0 && index % 2 ? <br/> : null}
                        </span>
                )}) : null}
            </div><br/>
            <button disabled={sendItesFlag} onClick={async()=>{
                setSendItesFlag(true);
                try {
                    await SendItem({
                        tokenid: session.id,
                        operation: 'putItem',
                        item: item
                    });
                    iAddCallback();
                }catch(err){
                    setSendItesFlag(false);
                }
                setSendItesFlag(false);
            }}>send {sendItesFlag ? <Spinner/> : null}</button>
        </div>
    )
}

export default Adicionar;