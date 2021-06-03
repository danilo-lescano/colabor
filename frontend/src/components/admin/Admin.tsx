import { useState } from "react"
import PutItemLoja from '../../api/putItemLoja';

const SendItem = async function (args: any) {
    if(!args.nome || !args.preco || !args.descricao)
        return;
    console.log(await PutItemLoja(args));
}

const Checkbox = function (values: {tag: string, onChange: (e:any)=>void}) {
    const {tag, onChange} = {...values}
    return (
        <label><input type={'checkbox'} name={tag} onChange={(e)=>onChange(e as any)}/>{tag}</label>
    )
}

const Admin = function () {
	const [session, setSession] = useState<any>(JSON.parse(localStorage.getItem('session') as string));
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
            <h1>Admin</h1>
            <div style={{display: 'inline-block'}}>
                <span>Categorias</span><br/><br/>
                <Checkbox tag={'Assentos'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Cadeiras'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Poltronas'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Bancos'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Banquetas'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Mesas'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Estar/Jantar'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Bancada'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Escritório'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Centro'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Apoio'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Armazenamento'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Estantes'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Armários'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Aparador'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Prateleiras e painéis'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Sapateiras'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Acessórios'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Iluminação'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Escritório'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Ofertas'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'Frete Grátis'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'10%'} onChange={(e: any) => addCategoria(e)}/><br/>
                <Checkbox tag={'30%'} onChange={(e: any) => addCategoria(e)}/><br/>
            </div>
            <div style={{display: 'inline-block', verticalAlign: 'top', marginLeft: '30px'}}>
                <label>Nome do Produto</label><br/>
                <input type={'text'} onChange={(e)=>setNome(e.target.value)}/><br/><br/>
                <label>Preço</label><br/>
                <input type={'text'} onChange={(e) => {
                    let aux: any = parseFloat(e.target.value.replace(',', '.'));
                    if(isNaN(aux)) {
                        e.target.value = '';
                        return;
                    }
                    setPreco(aux);
                }}/><br/><br/>
                <label>Descrição/Apresentação</label><br/>
                <input type={'text'} onChange={(e)=>setDescricao(e.target.value)}/><br/><br/>
                <label>Descrição Técnica</label><br/>
                <input type={'text'} onChange={(e)=>setDescricaoTecnica(e.target.value)}/><br/><br/>
                <label>Peso (kg)</label><br/>
                <input type={'text'} onChange={(e)=>setPeso(e.target.value)}/><br/><br/>
                <label>Altura (cm)</label><br/>
                <input type={'text'} onChange={(e)=>setAltura(e.target.value)}/><br/><br/>
                <label>Largura (cm)</label><br/>
                <input type={'text'} onChange={(e)=>setLargura(e.target.value)}/><br/><br/>
                <label>Profundidade (cm)</label><br/>
                <input type={'text'} onChange={(e)=>setProfundidade(e.target.value)}/><br/><br/>
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
                <input type={'file'} onChange={(e)=>{
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
                }} multiple/><br/><br/>
            </div>
            <button onClick={()=>SendItem({
                tokenid: session.id,
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
            })}>send</button>
        </div>
        
    )
}

export default Admin;