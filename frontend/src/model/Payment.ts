interface CreditCard {
    token: string;//"{creditCard_token_obtido_no_passo_8}",
    installment: Installment;
    holder: Holder;
    billingAddress: Address;
}
interface Shipping{
    address: Address;
    type: number;//"3",
    cost: number;//"0.00"
}
interface Installment {
    quantity: number;//"{quantidade_de_parcelas_escolhida}",
    value: number;//"{installmentAmount_obtido_no_retorno_do_passo_7}",
    noInterestInstallmentQuantity: number;//"{valor_maxInstallmentNoInterest_incluido_no_passo_7}"
}
interface Address {
    street: string;// "Av. Brigadeiro Faria Lima",
    number: number;// "1384",
    complement: string;// "1 andar",
    district: string;// "Jardim Paulistano",
    city: string;// "Sao Paulo",
    state: string;// "SP",
    country: string;// "BRA",
    postalCode: string;// "01452002"
}
interface Item {
    id: string;//"1",
    description: string;//"Descricao do item a ser vendido",
    quantity: number;//"1",
    amount: number;//"10.00"
}
interface Phone{
    areaCode: string;//"11",
    number: string;//"30380000"
}
interface Holder {
    name: string;//"Fulano Silva",
    cpf: string;
    birthDate: string;// "20/10/1980",
    phone: Phone;
}
interface Sender {
    name: string;//"Fulano Silva",
    email: string;//"fulano.silva@uol.com.br",
    phone: Phone;
    cpf: string;
    hash: string;//"{hash_obtido_no_passo_5}"
}
export default interface Payment {
    //mode: string;//"default",
    //method: string;//"creditCard",
    sender: Sender; 
    currency: string;//"BRL",
    //notificationURL: string;//"https://sualoja.com.br/notificacao",
    items: Item[];
    extraAmount: number;//"0.00",
    //reference: string;//"R123456",
    shippingAddressRequired: boolean//"true",
    shipping: Shipping;
    creditCard: CreditCard;
}