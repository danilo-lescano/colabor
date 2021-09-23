import { useContext, useEffect, useState } from "react"
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Item from "../../model/Item";
import Session from "../../session/Session";
import Spinner from "../acessorios/Spinner";

interface ItemCarrinho {
    item: Item;
    num: number;
}

const Carrinho = function () {
    const {carrinho} = useContext(Session);
    const [itensCarrinho, setItensCarrinho] = useState<ItemCarrinho[]>([]);

    useEffect(() => {
        while(itensCarrinho.length) itensCarrinho.pop();
        for(let i = 0; i < carrinho.length; ++i) {
            let flag: boolean = true;
            for(let j = 0; j < itensCarrinho.length; ++j) {
                if(carrinho[i].id === itensCarrinho[j].item.id) {
                    itensCarrinho[j].num++;
                    flag = false;
                    break;
                }
            }
            if(flag) {
                itensCarrinho.push({
                    item: carrinho[i] as Item,
                    num: 1
                });
            }
        }
        setItensCarrinho([...itensCarrinho]);
    }, [carrinho]);

    return (
        <>
            <div className={'block'} style={{marginBottom:50}}>
                <h1 className={'admin-navgation'}>CARRINHO</h1>
                <div style={{height:1, backgroundColor:'black'}}></div>
            </div>

            <div className={'listar-box'}>
                {Object.values(itensCarrinho).map((itemCarrinho)=>{
                    let preco: number = itemCarrinho.item.preco ? itemCarrinho.item.preco : 0 * itemCarrinho.num;
                    return (
                        <div style={{position:'relative', height: 70}}>
                            <img style={{marginLeft: 5, position:'absolute',top:'50%',transform:'translateY(-50%)',width: 50}} src={itemCarrinho.item.imagemPrincipal}/>
                            <span style={{marginLeft: 10, position:'absolute',top:'50%',transform:'translateY(-50%)', left:50}}>{itemCarrinho.item.nome}</span>
                            
                            <div style={{display:'inline-block', fontSize: '1.2em', right: 40, top: '50%', transform:'translateY(-50%)', position:'absolute', cursor:'pointer'}}>
                                Preço: {preco.toFixed(2)} | Qntd: <input type={'number'} value={itemCarrinho.num} style={{textAlign:'center', width:55, backgroundColor:'initial', border:'0 0 1 0', outline:'none', borderColor:'black', borderStyle:'none none solid none'}}/>
                            </div>
                            <div style={{display:'inline-block', fontSize: '1.2em', right: 10, top: '50%', transform:'translateY(-50%)', position:'absolute', cursor:'pointer'}}>
                                <AiFillDelete/>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default Carrinho;