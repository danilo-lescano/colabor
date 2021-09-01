import { useEffect, useState } from "react"
import { GetCategorias } from "../../api/categoriaAPI";
import GetItemLoja from "../../api/getItemLoja";
import PutItemLoja from '../../api/putItemLoja';
import Spinner from "../acessorios/Spinner";

const SendItem = async function (args: any) {
    await PutItemLoja(args);
    return;
}

const Checkbox = function (values: {tag: string, onClick: (e:any)=>void, lista?:any}) {
    const {tag, onClick, lista} = {...values}
    const [flag, setFlag] = useState(false);
    const updateOnChange = ()=>setFlag(!flag);
    return (
        <label key={tag+"-checkbox"}><input type={'checkbox'} name={tag} onClick={(e)=>{onClick(e as any); updateOnChange();}} checked={lista.includes(tag)}/>{tag}</label>
    )
}

const DropImage = function (values: {url?: string, onChange: (e:any, c:()=>void)=>void}) {
    const {url, onChange} = {...values};
    const [isDropover, setIsDropover] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onDrop = async (e: any) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
            setIsLoading(true);
            await onChange(e.dataTransfer.files, ()=>setIsLoading(false));
        }
    };
    
    return (
        <div style={{display:'inline-block', width: 100, height: 100, backgroundColor: 'rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden'}} onDragOver={(e)=>{e.preventDefault(); setIsDropover(true)}} onDragEnd={()=>setIsDropover(false)} onDragLeave={()=>setIsDropover(false)} onDrop={(e)=>onDrop(e)}>
            {url && url.length > 0 ? <img style={{width:'100%', left: '50%', top: '50%', position: 'absolute', transform: 'translate(-50%, -50%)'}} src={url}/> :
            <div style={{border: isDropover ? 'solid 3px black' : 'dotted 3px black', width: 80, height: 80, left: '50%', top: '50%', position: 'absolute', transform: 'translate(-50%, -50%)'}}>
                <span style={{left: '50%', top: '50%', position: 'absolute', transform: 'translate(-50%, -50%)', fontWeight: 'bold', fontSize: '2em'}}>+</span>
            </div>}
            {isLoading ? <div style={{width: 100, height: 100, backgroundColor: 'rgba(0,0,0,0.2)', position: 'relative'}}><span style={{left: '50%', top: '50%', position: 'absolute', transform: 'translate(-50%, -50%)'}}><Spinner/></span></div>: null}
        </div>
    )
};

const Adicionar = function (args: {id?:string, iAddCallback:()=>void}) {
    const {iAddCallback} = {...args};
	const [session, setSession] = useState<any>(JSON.parse(localStorage.getItem('session') as string));
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState<number>();
    const [descricao, setDescricao] = useState('');
    const [descricaoTecnica, setDescricaoTecnica] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [largura, setLargura] = useState('');
    const [profundidade, setProfundidade] = useState('');
    const [imagemPrincipal, setImagemPrincipal] = useState('');
    const [imagemCarrossel1, setImagemCarrossel1] = useState('');
    const [imagemCarrossel2, setImagemCarrossel2] = useState('');
    const [imagemCarrossel3, setImagemCarrossel3] = useState('');
    const [imagemCarrossel4, setImagemCarrossel4] = useState('');
    const [imagemCarrossel5, setImagemCarrossel5] = useState('');
    const [imagemCarrossel6, setImagemCarrossel6] = useState('');
    const [imagemMosaico1, setImagemMosaico1] = useState('');
    const [imagemMosaico2, setImagemMosaico2] = useState('');
    const [imagemMosaico3, setImagemMosaico3] = useState('');
    const [imagemIcone, setImagemIcone] = useState('');
    const [categorias, setCatecorias] = useState([] as string[]);
    const [categoriasTipo, setCategoriaTipos] = useState<any>([] as string[]);
    
    const [sendItesFlag, setSendItesFlag] = useState(false);

    useEffect(()=>{
        loadItem();
    },[args])

    useEffect(()=>{
        callGetAllCategorias();
    },[])


    const callGetAllCategorias = async () => {
        const aux_categorias = await GetCategorias({tokenid: session.id});
        if(aux_categorias) {
            setCategoriaTipos(aux_categorias);
        }
    }
    const loadItem = () => {
        if(args && args.id) {
            GetItemLoja(args.id)
            .then((item:any)=>{
                setId(item.id);
                setNome(item.nome);
                setPreco(item.preco);
                setDescricao(item.descricao);
                setDescricaoTecnica(item.descricaoTecnica);
                setPeso(item.peso);
                setAltura(item.altura);
                setLargura(item.largura);
                setProfundidade(item.profundidade);
                setCatecorias(item.categorias);
                setImagemPrincipal(item.imagemPrincipal);
                setImagemCarrossel1(item.imagemCarrossel1);
                setImagemCarrossel2(item.imagemCarrossel2);
                setImagemCarrossel3(item.imagemCarrossel3);
                setImagemCarrossel4(item.imagemCarrossel4);
                setImagemCarrossel5(item.imagemCarrossel5);
                setImagemCarrossel6(item.imagemCarrossel6);
                setImagemMosaico1(item.imagemMosaico1);
                setImagemMosaico2(item.imagemMosaico2);
                setImagemMosaico3(item.imagemMosaico3);
                setImagemIcone(item.imagemIcone);
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    };

    const addCategoria = (e: any) => {
        if(!categorias.includes(e.target.name)) {
            categorias[categorias.length] = e.target.name;
            setCatecorias(categorias);
        }
        else {
            let arr = [] as string[];
            for (let i = 0; i < categorias.length; i++) {
                if(categorias[i] !== e.target.name)
                    arr[arr.length] = categorias[i];
            }
            setCatecorias(arr);
        }
        //console.log(categorias, categorias.includes(e.target.name))
    };

    const updateImagem = async (e: any, callback:()=>void, inputId: string) => {
        let arr = [] as any[];
        if(e.length > 0) {
            let r = new FileReader();
            r.onload = async ()=>{
                arr[arr.length] = r.result;
                await SendItem({
                    tokenid: session.id,
                    operation: 'putImagem',
                    data:{id: id, imagemNome: inputId, imagem: arr}    
                })
                console.log(2)
                callback()
                iAddCallback();
            }
            r.readAsDataURL(e[0]);
        }
        else
            callback()
    };
    const deleteImage = async (inputId: string) => {
        await SendItem({
            tokenid: session.id,
            operation: 'removeImagem',
            data:{id: id, imagemNome: inputId}    
        })
        iAddCallback();
    };

    return (
        <div style={{position: 'relative', width: '70%', maxWidth: '1080px', minWidth: '1000px', marginLeft: '50%', transform: 'translate(-50%)'}}>
            <div style={{display: 'inline-block'}}>
                <span>Categorias</span><br/><br/>

                {Object.values(categoriasTipo).map((c:any)=>{
                    return (<>
                        {c.titulo !== 'oferta' ? <span style={{width:15, height: 15, backgroundColor:c.categoriaCor, position: 'relative', display: "inline-block", borderRadius:'100%'}}></span> : null}
                        <b>{c.titulo}</b><br/>
                        {Object.values(c.subCategorias).map((sc:any)=>{
                            return (<>
                                <Checkbox tag={sc} onClick={(e: any) => addCategoria(e)} lista={categorias}/><br/>
                            </>);
                        })}
                        <br/>
                    </>);
                })}
            </div>
            <div style={{display: 'inline-block', verticalAlign: 'top', marginLeft: '30px'}}>
                <input type={'hidden'} value={id}/>
                <label>Nome do Produto</label><br/>
                <input type={'text'} value={nome} onChange={(e)=>setNome(e.target.value)}/><br/><br/>
                <label>Preço</label><br/>
                <input type={'text'} value={preco ? parseFloat(preco.toString()) : ''} onChange={(e) => {
                    let aux: any = parseFloat(e.target.value.replace(',', '.'));
                    if(isNaN(aux)) {
                        e.target.value = '';
                        return;
                    }
                    setPreco(aux);
                }}/><br/><br/>
                <label>Descrição/Apresentação</label><br/>
                <input type={'text'} value={descricao} onChange={(e)=>setDescricao(e.target.value)}/><br/><br/>
                <label>Descrição Técnica</label><br/>
                <input type={'text'} value={descricaoTecnica} onChange={(e)=>setDescricaoTecnica(e.target.value)}/><br/><br/>
                <label>Peso (kg)</label><br/>
                <input type={'text'} value={peso} onChange={(e)=>setPeso(e.target.value)}/><br/><br/>
                <label>Altura (cm)</label><br/>
                <input type={'text'} value={altura} onChange={(e)=>setAltura(e.target.value)}/><br/><br/>
                <label>Largura (cm)</label><br/>
                <input type={'text'} value={largura} onChange={(e)=>setLargura(e.target.value)}/><br/><br/>
                <label>Profundidade (cm)</label><br/>
                <input type={'text'} value={profundidade} onChange={(e)=>setProfundidade(e.target.value)}/><br/><br/>
            </div>
            <div style={{display: 'inline-block', verticalAlign: 'top', marginLeft: '30px'}}>
                <div>Imagem Principal</div>
                <span style={{position:'relative', display:'inline-block'}}>
                    <DropImage url={imagemPrincipal} onChange={(e, c:()=>void)=>{updateImagem(e, c, 'imagemPrincipal')}}/>
                    {imagemPrincipal && imagemPrincipal.length > 0 ? <span onClick={()=>deleteImage('imagemPrincipal')} style={{position:'absolute', top:0, right:0, fontWeight:'bold', cursor: 'pointer'}}>X</span> : null}
                </span><br/><br/>
                <div>Imagens Carrosel</div>
                <span style={{position:'relative', display:'inline-block'}}>
                    <DropImage url={imagemCarrossel1} onChange={(e, c:()=>void)=>{updateImagem(e, c, 'imagemCarrossel1')}}/>
                    {imagemCarrossel1 && imagemCarrossel1.length > 0 ? <span onClick={()=>deleteImage('imagemCarrossel1')} style={{position:'absolute', top:0, right:0, fontWeight:'bold', cursor: 'pointer'}}>X</span> : null}
                </span><div style={{width: 5, display: 'inline-block'}}></div>
                <span style={{position:'relative', display:'inline-block'}}>
                    <DropImage url={imagemCarrossel2} onChange={(e, c:()=>void)=>{updateImagem(e, c, 'imagemCarrossel2')}}/>
                    {imagemCarrossel2 && imagemCarrossel2.length > 0 ? <span onClick={()=>deleteImage('imagemCarrossel2')} style={{position:'absolute', top:0, right:0, fontWeight:'bold', cursor: 'pointer'}}>X</span> : null}
                </span><br/>
                <span style={{position:'relative', display:'inline-block'}}>
                    <DropImage url={imagemCarrossel3} onChange={(e, c:()=>void)=>{updateImagem(e, c, 'imagemCarrossel3')}}/>
                    {imagemCarrossel3 && imagemCarrossel3.length > 0 ? <span onClick={()=>deleteImage('imagemCarrossel3')} style={{position:'absolute', top:0, right:0, fontWeight:'bold', cursor: 'pointer'}}>X</span> : null}
                </span><div style={{width: 5, display: 'inline-block'}}></div>
                <span style={{position:'relative', display:'inline-block'}}>
                    <DropImage url={imagemCarrossel4} onChange={(e, c:()=>void)=>{updateImagem(e, c, 'imagemCarrossel4')}}/>
                    {imagemCarrossel4 && imagemCarrossel4.length > 0 ? <span onClick={()=>deleteImage('imagemCarrossel4')} style={{position:'absolute', top:0, right:0, fontWeight:'bold', cursor: 'pointer'}}>X</span> : null}
                </span><br/>
                <span style={{position:'relative', display:'inline-block'}}>
                    <DropImage url={imagemCarrossel5} onChange={(e, c:()=>void)=>{updateImagem(e, c, 'imagemCarrossel5')}}/>
                    {imagemCarrossel5 && imagemCarrossel5.length > 0 ? <span onClick={()=>deleteImage('imagemCarrossel5')} style={{position:'absolute', top:0, right:0, fontWeight:'bold', cursor: 'pointer'}}>X</span> : null}
                </span><div style={{width: 5, display: 'inline-block'}}></div>
                <span style={{position:'relative', display:'inline-block'}}>
                    <DropImage url={imagemCarrossel6} onChange={(e, c:()=>void)=>{updateImagem(e, c, 'imagemCarrossel6')}}/>
                    {imagemCarrossel6 && imagemCarrossel6.length > 0 ? <span onClick={()=>deleteImage('imagemCarrossel6')} style={{position:'absolute', top:0, right:0, fontWeight:'bold', cursor: 'pointer'}}>X</span> : null}
                </span>
            </div>
            <div style={{display: 'inline-block', verticalAlign: 'top', marginLeft: '30px'}}>
                <div>Imagem Icone</div>
                <span style={{position:'relative', display:'inline-block'}}>
                    <DropImage url={imagemIcone} onChange={(e, c:()=>void)=>{updateImagem(e, c, 'imagemIcone')}}/>
                    {imagemIcone && imagemIcone.length > 0 ? <span onClick={()=>deleteImage('imagemIcone')} style={{position:'absolute', top:0, right:0, fontWeight:'bold', cursor: 'pointer'}}>X</span> : null}
                </span><br/><br/>
                <div>Imagens Mosaico</div>
                <span style={{position:'relative', display:'inline-block'}}>
                    <DropImage url={imagemMosaico1} onChange={(e, c:()=>void)=>{updateImagem(e, c, 'imagemMosaico1')}}/>
                    {imagemMosaico1 && imagemMosaico1.length > 0 ? <span onClick={()=>deleteImage('imagemMosaico1')} style={{position:'absolute', top:0, right:0, fontWeight:'bold', cursor: 'pointer'}}>X</span> : null}
                </span><div style={{width: 5, display: 'inline-block'}}></div>
                <span style={{position:'relative', display:'inline-block'}}>
                    <DropImage url={imagemMosaico2} onChange={(e, c:()=>void)=>{updateImagem(e, c, 'imagemMosaico2')}}/>
                    {imagemMosaico2 && imagemMosaico2.length > 0 ? <span onClick={()=>deleteImage('imagemMosaico2')} style={{position:'absolute', top:0, right:0, fontWeight:'bold', cursor: 'pointer'}}>X</span> : null}
                </span><br/>
                <span style={{position:'relative', display:'inline-block'}}>
                    <DropImage url={imagemMosaico3} onChange={(e, c:()=>void)=>{updateImagem(e, c, 'imagemMosaico3')}}/>
                    {imagemMosaico3 && imagemMosaico3.length > 0 ? <span onClick={()=>deleteImage('imagemMosaico3')} style={{position:'absolute', top:0, right:0, fontWeight:'bold', cursor: 'pointer'}}>X</span> : null}
                </span><div style={{width: 5, display: 'inline-block'}}></div>
            </div><br/>
            <button disabled={sendItesFlag} onClick={async()=>{
                setSendItesFlag(true);
                try {
                    await SendItem({
                        tokenid: session.id,
                        operation: 'putItem',
                        data:{
                            item: {
                                id: id,
                                nome: nome,
                                preco: preco,
                                descricao: descricao,
                                descricaoTecnica: descricaoTecnica,
                                peso: peso,
                                altura: altura,
                                largura: largura,
                                profundidade: profundidade,
                                categorias: categorias,
                                imagemPrincipal: imagemPrincipal,
                                imagemCarrossel1: imagemCarrossel1,
                                imagemCarrossel2: imagemCarrossel2,
                                imagemCarrossel3: imagemCarrossel3,
                                imagemCarrossel4: imagemCarrossel4,
                                imagemCarrossel5: imagemCarrossel5,
                                imagemCarrossel6: imagemCarrossel6,
                                imagemMosaico1: imagemMosaico1,
                                imagemMosaico2: imagemMosaico2,
                                imagemMosaico3: imagemMosaico3,
                                imagemIcone: imagemIcone
                            }
                        }
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