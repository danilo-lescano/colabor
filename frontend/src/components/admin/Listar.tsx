import { useEffect, useState } from "react"
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { GetItens } from "../../api/ItemAPI";
import Item from "../../model/Item";
import Spinner from "../acessorios/Spinner";

const Listar = function (args:{update: (id:string)=>void, reRender?:Boolean}) {
	const [session, setSession] = useState<any>(JSON.parse(localStorage.getItem('session') as string));
    const [items, setItems] = useState<Item[]>([]);
    const [spinerFlag, setSpinnerFlag] = useState<any>({});

    const {update, reRender} = {...args};

    const getItems = async () => {
        let aux: any = await GetItens();
        setItems(aux.data as Item[]);
    };

    useEffect(()=>{
        getItems();
    }, [reRender])
    
    const deleteItem = async (id: string) => {
        spinerFlag[id] = true;
        setSpinnerFlag({...spinerFlag});
        //await DeleteItemLoja({id: id, tokenid: session.id});
        await getItems();
        spinerFlag[id] = false;
        setSpinnerFlag({...spinerFlag});
    };

    return (
        <div className={'listar-box'}>
            <h1>Listar & Organizar</h1>
            {Object.values(items).map((i:any)=>{
                return (
                    <div style={{position:'relative', height: 70}}>
                        <img style={{marginLeft: 5, position:'absolute',top:'50%',transform:'translateY(-50%)',width: 50}} src={i.imagemPrincipal}/>
                        <span style={{marginLeft: 10, position:'absolute',top:'50%',transform:'translateY(-50%)', left:50}}>{i.nome}</span>
                        
                        {spinerFlag[i.id] ? <span style={{transform:'translateY(-50%)', right: 10}}><Spinner/></span> : <div style={{display:'inline-block', fontSize: '1.2em', right: 40, top: '50%', transform:'translateY(-50%)', position:'absolute', cursor:'pointer'}} onClick={()=>update(i.id)} >
                            <AiFillEdit/>
                        </div>}
                        {spinerFlag[i.id] ? <span style={{position:'absolute', transform:'translateY(-50%)', top:'50%', right: 10}}><Spinner/></span> : <div style={{display:'inline-block', fontSize: '1.2em', right: 10, top: '50%', transform:'translateY(-50%)', position:'absolute', cursor:'pointer'}} onClick={()=>deleteItem(i.id)}>
                            <AiFillDelete/>
                        </div>}
                    </div>
                );
            })}
        </div>
    )
}

export default Listar;