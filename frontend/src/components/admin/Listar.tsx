import { useEffect, useState } from "react"
import GetItensLoja from "../../api/getItensLoja";
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import DeleteItemLoja from "../../api/deleteItemLoja";

const Listar = function (args:{update: (id:string)=>void}) {
	const [session, setSession] = useState<any>(JSON.parse(localStorage.getItem('session') as string));
    const [items, setItems] = useState<any>([]);

    const {update} = {...args};

    const getItems = () => {
        GetItensLoja()
        .then((items)=>{
            setItems(items);
        })
        .catch((e)=>console.log(e))
    };
    useEffect(()=>{
        getItems();
    }, [])
    
    const deleteItem = async (id: string) => {
        await DeleteItemLoja({id: id, tokenid: session.id});
        getItems();
    };

    return (
        <div className={'listar-box'}>
            <h1>Listar & Organizar</h1>
            {Object.values(items).map((i:any)=>{
                return (
                    <div style={{position:'relative', height: 70}}>
                        <img style={{marginLeft: 5, position:'absolute',top:'50%',transform:'translateY(-50%)',width: 50}} src={i.imagemPrincipal}/>
                        <span style={{marginLeft: 10, position:'absolute',top:'50%',transform:'translateY(-50%)', left:50}}>{i.nome}</span>
                        <div style={{display:'inline-block', fontSize: '1.2em', right: 40, top: '50%', transform:'translateY(-50%)', position:'absolute', cursor:'pointer'}} onClick={()=>update(i.id)} >
                            <AiFillEdit/>
                        </div>
                        <div style={{display:'inline-block', fontSize: '1.2em', right: 10, top: '50%', transform:'translateY(-50%)', position:'absolute', cursor:'pointer'}} onClick={()=>deleteItem(i.id)}>
                            <AiFillDelete/>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Listar;