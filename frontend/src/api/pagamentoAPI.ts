import API from "./API";

interface item {
    id: string;
    quantidade: number;
}

const GetTokenPagSeguro = async () => {
    let tokenid = JSON.parse(localStorage.getItem('session') as string).id;
    return await API('tokenpagseguro', 'get', {tokenid: tokenid});
}

const CheckoutNow = async (senderHash: string, creditCardToken: string, items: item[], creditCardHolderName: string, creditCardHolderCPF: string, creditCardHolderBirthDate: string, creditCardHolderAreaCode: string, creditCardHolderPhone: string, senderEmail: string, addressStreet: string, addressNumber: string, addressComplement: string, addressDistrict: string, addressPostalCode: string, addressCity: string, addressState: string, addressCountry: string, numParcela: number, parcelaComJuros: number) => {
    let tokenid = JSON.parse(localStorage.getItem('session') as string).id;
    let data: any = {
        tokenid: tokenid,
        options:{
            items: items,
            senderHash: senderHash,
            senderName: creditCardHolderName,
            senderEmail: senderEmail,
            senderAreaCode: creditCardHolderAreaCode,
            senderPhone: creditCardHolderPhone,
            senderCPF: creditCardHolderCPF,
            creditCardToken: creditCardToken,
            creditCardHolderName: creditCardHolderName,
            creditCardHolderCPF: creditCardHolderCPF,
            creditCardHolderBirthDate: creditCardHolderBirthDate,
            creditCardHolderAreaCode: creditCardHolderAreaCode,
            creditCardHolderPhone: creditCardHolderPhone,
            billingAddressStreet: addressStreet,
            billingAddressNumber: addressNumber,
            billingAddressComplement: addressComplement,
            billingAddressDistrict: addressDistrict,
            billingAddressPostalCode: addressPostalCode,
            billingAddressCity: addressCity,
            billingAddressState: addressState,
            billingAddressCountry: addressCountry,
            installmentQuantity: 1,
            //installmentValue: '',
            noInterestInstallmentQuantity: 0,
            /*shippingAddressStreet: 'Av. Brig. Faria Lima',
            shippingAddressNumber: '1384',
            shippingAddressComplement: '5o andar',
            shippingAddressDistrict: 'Jardim Paulistano',
            shippingAddressPostalCode: '01452002',
            shippingAddressCity: 'Sao Paulo',
            shippingAddressState: 'SP',
            shippingAddressCountry: 'BRA',
            shippingType: 1,
            shippingCost: '01.00',*/
        }
    }
    return await API('tokenpagseguro', 'checkout', data);
}

export {GetTokenPagSeguro};