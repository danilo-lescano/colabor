import { useEffect, useState } from "react"
import GetItemLoja from "../../api/getItemLoja";
import PutItemLoja from '../../api/putItemLoja';
import Spinner from "../acessorios/Spinner";

const SendItem = async function (args: any) {
    if(!args.nome || !args.preco || !args.descricao)
        return;
    await PutItemLoja(args);
    return;
}

const Checkbox = function (values: {tag: string, onChange: (e:any)=>void, checked?:boolean}) {
    const {tag, onChange, checked} = {...values}
    return (
        <label><input type={'checkbox'} name={tag} onChange={(e)=>onChange(e as any)} checked={checked}/>{tag}</label>
    )
}

const Adicionar = function (args: {id?:string}) {
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
    const [imagemPrincipal, setImagemPrincipal] = useState<any[]>();
    const [imagensCarrossel, setImagensCarrossel] = useState<any[]>();
    const [imagensMosaico, setImagensMosaico] = useState<any[]>();
    const [imagemIcone, setImagemIcone] = useState<any[]>();
    const [categorias, setCatecorias] = useState([] as string[]);
    const [sendItesFlag, setSendItesFlag] = useState(false);

    useEffect(()=>{
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

                let arr = [] as any[];
                for(let i = 0; i < item.imagensCarrossel.length; i++) {
                    let xhr = new XMLHttpRequest();
                    xhr.open("GET", item.imagensCarrossel[i], true); 
                    xhr.responseType = "blob";
                    xhr.onload = function (e) {
                        if (this.status === 200) {
                            let reader = new FileReader();
                            reader.onload = function(e:any) {
                                arr[arr.length] = e.target.result; setImagemPrincipal(arr);
                            };
                            reader.readAsDataURL(this.response);
                        };
                    };
                    xhr.send();
                }

                let arr2 = [] as any[];
                for(let i = 0; i < item.imagensCarrossel.length; i++) {
                    let xhr = new XMLHttpRequest();
                    xhr.open("GET", item.imagensCarrossel[i], true); 
                    xhr.responseType = "blob";
                    xhr.onload = function (e) {
                        if (this.status === 200) {
                            let reader = new FileReader();
                            reader.onload = function(e:any) {
                                arr2[arr2.length] = e.target.result; setImagemPrincipal(arr2);
                            };
                            reader.readAsDataURL(this.response);
                        };
                    };
                    xhr.send();
                }

                let arr3 = [] as any[];
                for(let i = 0; i < item.imagensCarrossel.length; i++) {
                    let xhr = new XMLHttpRequest();
                    xhr.open("GET", item.imagensCarrossel[i], true); 
                    xhr.responseType = "blob";
                    xhr.onload = function (e) {
                        if (this.status === 200) {
                            let reader = new FileReader();
                            reader.onload = function(e:any) {
                                arr3[arr3.length] = e.target.result; setImagemPrincipal(arr3);
                            };
                            reader.readAsDataURL(this.response);
                        };
                    };
                    xhr.send();
                }

                let arr4 = [] as any[];
                for(let i = 0; i < item.imagensCarrossel.length; i++) {
                    let xhr = new XMLHttpRequest();
                    xhr.open("GET", item.imagensCarrossel[i], true); 
                    xhr.responseType = "blob";
                    xhr.onload = function (e) {
                        if (this.status === 200) {
                            let reader = new FileReader();
                            reader.onload = function(e:any) {
                                arr4[arr4.length] = e.target.result; setImagemPrincipal(arr4);
                            };
                            reader.readAsDataURL(this.response);
                        };
                    };
                    xhr.send();
                }

            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },[args])

    const addCategoria = (e: any) => {
        if(e.target.checked) {
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
    }

    return (
        <div style={{position: 'relative', width: '70%', maxWidth: '1080px', minWidth: '1000px', marginLeft: '50%', transform: 'translate(-50%)'}}>
            <div style={{display: 'inline-block'}}>
                <span>Categorias</span><br/><br/>
                <Checkbox tag={'Assentos'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Assentos')}/><br/>
                <Checkbox tag={'Cadeiras'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Cadeiras')}/><br/>
                <Checkbox tag={'Poltronas'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Poltronas')}/><br/>
                <Checkbox tag={'Bancos'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Bancos')}/><br/>
                <Checkbox tag={'Banquetas'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Banquetas')}/><br/>
                <Checkbox tag={'Mesas'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Mesas')}/><br/>
                <Checkbox tag={'Estar/Jantar'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Estar/Jantar')}/><br/>
                <Checkbox tag={'Bancada'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Bancada')}/><br/>
                <Checkbox tag={'Escritório'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Escritório')}/><br/>
                <Checkbox tag={'Centro'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Centro')}/><br/>
                <Checkbox tag={'Apoio'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Apoio')}/><br/>
                <Checkbox tag={'Armazenamento'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Armazenamento')}/><br/>
                <Checkbox tag={'Estantes'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Estantes')}/><br/>
                <Checkbox tag={'Armários'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Armários')}/><br/>
                <Checkbox tag={'Aparador'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Aparador')}/><br/>
                <Checkbox tag={'Prateleiras e painéis'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Prateleiras e painéis')}/><br/>
                <Checkbox tag={'Sapateiras'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Sapateiras')}/><br/>
                <Checkbox tag={'Acessórios'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Acessórios')}/><br/>
                <Checkbox tag={'Iluminação'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Iluminação')}/><br/>
                <Checkbox tag={'Escritório'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Escritório')}/><br/>
                <Checkbox tag={'Ofertas'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Ofertas')}/><br/>
                <Checkbox tag={'Frete Grátis'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('Frete Grátis')}/><br/>
                <Checkbox tag={'10%'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('10%')}/><br/>
                <Checkbox tag={'30%'} onChange={(e: any) => addCategoria(e)} checked={categorias.includes('30%')}/><br/>
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
                <label>Imagem principal</label><br/>
                <input type={'file'} onChange={(e)=>{
                    if(!e.target.files) setImagemPrincipal([]);
                    else {
                        let arr = [] as any[];
                        for(let i = 0; i < e.target.files.length; i++) {
                            let r = new FileReader();
                            r.onload = ()=>{arr[arr.length] = r.result; setImagemPrincipal(arr)}
                            r.readAsDataURL(e.target.files[i]);
                        }
                    }
                }}/><br/><br/>
                <label>Imagens Carrossel</label><br/>
                <input type={'file'} onChange={(e)=>{
                    if(!e.target.files) setImagensCarrossel([]);
                    else {
                        let arr = [] as any[];
                        for(let i = 0; i < e.target.files.length; i++) {
                            let r = new FileReader();
                            r.onload = ()=>{arr[arr.length] = r.result; setImagensCarrossel(arr)}
                            r.readAsDataURL(e.target.files[i]);
                        }
                    }
                }} multiple/><br/><br/>
                <label>Imagens Mosaico</label><br/>
                <input type={'file'} multiple onChange={(e)=>{
                    if(!e.target.files) setImagensMosaico([]);
                    else {
                        let arr = [] as any[];
                        for(let i = 0; i < e.target.files.length; i++) {
                            let r = new FileReader();
                            r.onload = ()=>{arr[arr.length] = r.result; setImagensMosaico(arr)}
                            r.readAsDataURL(e.target.files[i]);
                        }
                    }
                }}/><br/><br/>
                <label>Icone produto</label><br/>
                <input type={'file'} onChange={(e)=>{
                    if(!e.target.files) setImagemIcone([]);
                    else {
                        let arr = [] as any[];
                        for(let i = 0; i < e.target.files.length; i++) {
                            let r = new FileReader();
                            r.onload = ()=>{arr[arr.length] = r.result; setImagemIcone(arr)}
                            r.readAsDataURL(e.target.files[i]);
                        }
                    }
                }}/><br/><br/>
            </div>
            <button disabled={sendItesFlag} onClick={async()=>{
                setSendItesFlag(true);
                try {
                    await SendItem({
                        tokenid: session.id,
                        id: id,
                        nome: nome,
                        preco: preco,
                        descricao: descricao,
                        descricaoTecnica: descricaoTecnica,
                        peso: peso,
                        altura: altura,
                        largura: largura,
                        profundidade: profundidade,
                        imagemPrincipal: imagemPrincipal,
                        imagensCarrossel: imagensCarrossel,
                        imagensMosaico: imagensMosaico,
                        imagemIcone: imagemIcone,
                        categorias: categorias
                    });
                }catch(err){
                    setSendItesFlag(false);
                }
                setSendItesFlag(false);
            }}>send {sendItesFlag ? <Spinner/> : null}</button>
        </div>
    )
}

export default Adicionar;