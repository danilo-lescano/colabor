import Payment from "../model/Payment";
import API from "./API";

const EMAIL = 'nq3i4fsx@hotmail.com';
const TOKEN = '0856E23EE68745FD862A08B66A9038F0';

interface item {
    id: string;
    quantidade: number;
}

const GetTokenPagSeguro = async () => {
    let tokenid = JSON.parse(localStorage.getItem('session') as string).id;
    return await API('tokenpagseguro', 'get', {tokenid: tokenid});
}

const CheckoutNow = async (payment: Payment) => {
    let tokenid = JSON.parse(localStorage.getItem('session') as string).id;
    return await API('tokenpagseguro', 'checkout', {tokenid: tokenid, payment: payment});

}

export {GetTokenPagSeguro, CheckoutNow};