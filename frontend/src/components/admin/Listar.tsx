import { useEffect, useState } from "react"
import GetItensLoja from "../../api/getItensLoja";
import { AiFillDelete } from 'react-icons/ai';
import DeleteItemLoja from "../../api/deleteItemLoja";

const Listar = function (args:{update: (id:string)=>void}) {
	const [session, setSession] = useState<any>(JSON.parse(localStorage.getItem('session') as string));
    const [items, setItems] = useState<any>([]);

    const {update} = {...args};

    useEffect(()=>{
        GetItensLoja()
        .then((items)=>{
            setItems(items);
        })
        .catch((e)=>console.log(e))
    }, [])
    
    const deleteItem = (id: string) => {
        DeleteItemLoja({id: id, tokenid: session.id});
    };

    return (
        <div className={'listar-box'}>
            <h1>Listar & Organizar</h1>
            {Object.values(items).map((i:any)=>{
                return (
                    <div onClick={()=>update(i.id)} style={{position:'relative', height: 70}}>
                        <img style={{marginLeft: 5, position:'absolute',top:'50%',transform:'translateY(-50%)',width: 50}} src={i.imagemPrincipal}/>
                        <span style={{marginLeft: 10, position:'absolute',top:'50%',transform:'translateY(-50%)', left:50}}>{i.nome}</span>
                        <div style={{display:'inline-block', right: 10, top: '50%', transform:'translateY(-50%)', position:'absolute', cursor:'pointer'}} onClick={()=>deleteItem(i.id)}>
                            <AiFillDelete/>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Listar;