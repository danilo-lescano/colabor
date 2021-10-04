import { useContext, useEffect, useState } from "react"
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { CheckoutNow, GetTokenPagSeguro } from "../../api/pagamentoAPI";
import Item from "../../model/Item";
import Session from "../../session/Session";
import Spinner from "../acessorios/Spinner";

interface Brand {
    name: string,
    bin: number,
    cvvSize: number,
    expirable: boolean,
    validationAlgorithm: string
}

interface Cartao {
    cardNumber: string, // Número do cartão de crédito
    brand: string, // Bandeira do cartão
    cvv: string, // CVV do cartão
    expirationMonth: string, // Mês da expiração do cartão
    expirationYear: string, // Ano da expiração do cartão, é necessário os 4 dígitos.
}

interface Parcela {
    quantity: number,
    totalAmount: number,
    installmentAmount: number,
    interestFree: boolean
}

const Checkout = function () {
    const {carrinho} = useContext(Session);
    const [creditCardOptions, setCreditCardOptions] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [sessaoPagSeguro, setSessaoPagSeguro] = useState('');
    const [senderHash, setSenderHash] = useState('');
    const [brand, setBrand] = useState<Brand>({name: '', bin: 0, cvvSize: 0, expirable: false, validationAlgorithm: ''});
    const [numCartao, setNumCartao] = useState('');
    const [cartao, setCartao] = useState<Cartao>({cardNumber: '', brand: '', cvv: '', expirationMonth: '', expirationYear: ''});
    const [parcelas, setParcelas] = useState<Parcela[]>([]);
    const [cardToken, setCardToken] = useState('');
    const [nomeCartao, setNomeCartao] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [cpf, setcpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [ddd, setddd] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setcep] = useState('');
    const [email, setEmail] = useState('');
    

    useEffect(() => {
        let valor = 0;
        for(let i = 0; i < carrinho.length; ++i)
            valor += carrinho[i].preco;
        setTotal(valor);
        updateSessaoPagSeguro();
    }, []);

    useEffect(() => {
        if(sessaoPagSeguro) {
            updateCreditCardOptions();
            updateSenderHash();
        }
    }, [sessaoPagSeguro]);

    useEffect(() => {
        if(cartao.cardNumber.length >= 6) {
            updateParcelas();
            cartao.brand = brand.name;
        }
        else {
            setParcelas([]);
            cartao.brand = '';
        }
        setCartao({...cartao});
    }, [brand]);

    useEffect(() => {
        if(numCartao.length >= 6)
            updateBrand();
        cartao.cardNumber = numCartao;
        setCartao({...cartao});
    }, [numCartao]);

    useEffect(() => {
        createCardToken();
    }, [cartao]);

    const updateCreditCardOptions = () => {
        const success = (response: any) => {
            if(response && response.paymentMethods)
                setCreditCardOptions(Object.values(response.paymentMethods.CREDIT_CARD.options));
        }
        eval(`
            PagSeguroDirectPayment.getPaymentMethods({
                amount: ${total.toFixed(2)},
                success: success,
                error: function(response) {},
                complete: function(response) {}
            });
        `);
    }

    const updateSenderHash = () => {
        const success = (response: any) => {
            if(response && response.senderHash)
                setSenderHash(response.senderHash);
        }
        eval(`
            PagSeguroDirectPayment.onSenderHashReady(function(response){
                if(response.status == 'error') {
                    console.log(response.message);
                    return false;
                }
                success(response);
            });
        `);
    }

    const updateBrand = () => {
        const success = (response: any) => {
            if(response && response.brand)
                setBrand(response.brand);
        }
        eval(`
            PagSeguroDirectPayment.getBrand({
                cardBin: '${numCartao.substring(0,6)}',
                success: success
            });
        `);
    }

    const updateParcelas = () => {
        const success = (response: any) => {
            if(response && response.error) return;
            else if(response.installments[brand.name]) {
                setParcelas(response.installments[brand.name]);
                console.log(response.installments[brand.name])
            }
        }
        eval(`
            PagSeguroDirectPayment.getInstallments({
                amount: ${total.toFixed(2)},
                maxInstallmentNoInterest: 2,
                brand: '${brand.name}',
                success: success,
                error: function(response) {},
                complete: function(response) {}
            });
        `);
    }

    const validacaoDoCartao = () => {
        if(cartao.cardNumber.length === 16 && cartao.cvv.length === brand.cvvSize && cartao.expirationMonth.length === 2 && cartao.expirationYear.length === 4)
            return true;
        return false;
    }

    const createCardToken = () => {
        if(!validacaoDoCartao()) return;
        const success = (response: any) => {
            if(!response || response.error) return;
            else if(response.card && response.card.token) {
                setCardToken(response.card.token);
            }
        }
        eval(`
            PagSeguroDirectPayment.createCardToken({
                cardNumber: ${cartao.cardNumber},
                brand: '${cartao.brand}',
                cvv: ${cartao.cvv},
                expirationMonth: '${cartao.expirationMonth}',
                expirationYear: '${cartao.expirationYear}',
                success: success,
                error: function(response) {},
                complete: function(response) {}
            });
        `);
    }

    const updateSessaoPagSeguro = async () => {
        let id: any = await GetTokenPagSeguro();
        if(id && id.data && id.data.idPagSeguro) {
            eval(`PagSeguroDirectPayment.setSessionId('${id.data.idPagSeguro}');`);
            setSessaoPagSeguro(id.data.idPagSeguro);
        }
    };


    const sendCheckout = async () => {
        let itens: {id: string, description: string, quantity: number, amount: number}[] = [];
        for(let i = 0; i < carrinho.length; ++i){
            let flag = true;
            for(let j = 0; j < itens.length; ++j)
                if(itens[j].id === carrinho[i].id) {
                    flag = false;
                    itens[j].quantity ++;
                    break;
                }
            if(flag)
                itens.push({id: carrinho[i].id, description: carrinho[i].descricao, amount: carrinho[i].preco, quantity: 1});
        }
        const aux = await CheckoutNow({
            sender: {
                name: nomeCartao,
                email: email,
                phone: {
                    areaCode: ddd,
                    number: telefone
                },
                cpf: cpf,
                hash: senderHash
            },
            currency: 'BRL',
            items: itens,
            extraAmount: 0,
            shippingAddressRequired: true,
            shipping: {
                address: {
                    street: rua,
                    number: parseInt(numero),
                    complement: complemento,
                    district: bairro,
                    country: 'BRA',
                    city: cidade,
                    state: estado,
                    postalCode: cep
                },
                type: 3,
                cost: 0
            },
            creditCard: {
                token: cardToken,
                installment: {
                    quantity: 1,
                    value: 0,
                    noInterestInstallmentQuantity: 2
                },
                holder: {
                    name: nomeCartao,
                    cpf: cpf,
                    birthDate: dataNasc,
                    phone: {
                        areaCode: ddd,
                        number: telefone
                    }
                },
                billingAddress: {
                    street: rua,
                    number: parseInt(numero),
                    complement: complemento,
                    district: bairro,
                    country: 'BRA',
                    city: cidade,
                    state: estado,
                    postalCode: cep
                }
            }
        });
        console.log(aux);
    }

    return (
        <>
            <div className={'block'} style={{marginBottom:50}}>
                <h1 className={'admin-navgation carrinho-titulo'}>CHECKOUT</h1>
                <div style={{height:1, backgroundColor:'black'}}></div>
                1: {sessaoPagSeguro}<br/>
                2: {senderHash}<br/>
                3: {brand.name}<br/>
                4: {cartao.cardNumber}<br/>
                5: {cardToken}<br/>
            </div>

            <div className={'block'}>
                <div className={'carrinho-colabor-checkout-block'}>
                    <h2 className={'admin-navgation carrinho-titulo'}>ENDEREÇO</h2><br/>
                    Rua<br/>
                    <input type={'text'} onChange={e => setRua(e.target.value)}/><br/><br/>
                    Número<br/>
                    <input type={'text'} onChange={e => setNumero(e.target.value)}/><br/><br/>
                    Bairro<br/>
                    <input type={'text'} onChange={e => setBairro(e.target.value)}/><br/><br/>
                    Complemento<br/>
                    <input type={'text'} onChange={e => setComplemento(e.target.value)}/><br/><br/>
                    Cidade<br/>
                    <input type={'text'} onChange={e => setCidade(e.target.value)}/><br/><br/>
                    Estado<br/>
                    <input type={'text'} onChange={e => setEstado(e.target.value)}/><br/><br/>
                    CEP<br/>
                    <input type={'text'} onChange={e => setcep(e.target.value)}/><br/><br/>
                </div>
                <div className={'carrinho-colabor-checkout-block'}>
                    <h2 className={'admin-navgation carrinho-titulo'}>
                        <span className={'ativo'}>CARTÃO</span> /
                        <span>BOLETO</span> /
                        <span>PIX</span>
                    </h2><br/>
                    Número do Cartão<br/>
                    <input type={'text'} onChange={e => setNumCartao(e.target.value)}/><br/><br/>
                    Nome no Cartão<br/>
                    <input type={'text'} onChange={e => setNomeCartao(e.target.value)}/><br/><br/>
                    Mês<br/>
                    <input type={'text'} onChange={e =>{cartao.expirationMonth = e.target.value; setCartao({...cartao});}}/><br/><br/>
                    Ano<br/>
                    <input type={'text'} onChange={e =>{cartao.expirationYear = e.target.value; setCartao({...cartao});}}/><br/><br/>
                    CVV<br/>
                    <input type={'text'} onChange={e =>{cartao.cvv = e.target.value; setCartao({...cartao});}}/><br/><br/>
                    Data de nasc. dono cartão<br/>
                    <input type={'text'} placeholder={'dd/MM/aaaa'} onChange={e => setDataNasc(e.target.value)}/><br/><br/>
                    cpf dono cartão<br/>
                    <input type={'text'} onChange={e => setcpf(e.target.value)}/><br/><br/>
                </div>
                <div className={'carrinho-colabor-checkout-block'}>
                    ddd<br/>
                    <input type={'text'} onChange={e => setddd(e.target.value)}/><br/><br/>
                    telefone<br/>
                    <input type={'text'} onChange={e => setTelefone(e.target.value)}/><br/><br/>
                    email<br/>
                    <input type={'text'} onChange={e => setEmail(e.target.value)}/><br/><br/>
                </div>
                <div className={'carrinho-colabor-checkout-block'}>
                    <h2 className={'admin-navgation carrinho-titulo'} style={{color:'black'}}>
                    TOTAL: {total.toFixed(2)}
                    </h2><br/>
                </div>
            </div>

            <div className={'block'} style={{marginBottom:50}}>
                <div style={{height:1, backgroundColor:'black'}}></div>
                <h1 className={'admin-navgation carrinho-titulo'}>VOLTAR</h1>
                <button className={'carrinho-btn-compra'}><span className={'carrinho-btn-compra-text'} onClick={sendCheckout}>FINALIZAR COMPRA!</span></button>
            </div>
        </>
    )
}

export default Checkout;