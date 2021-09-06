import Categoria from "../model/Categoria";
import API from "./API";

const GetCategoria = async (data?: any) => {
    return await API('categoria', 'get', data);
}

const GetCategorias = async () => {
    return await API('categoria', 'getall');
}

const CreateCategoria = async (categoria: Categoria) => {
    let tokenid = JSON.parse(localStorage.getItem('session') as string).id;
    return await API('categoria', 'create', {tokenid: tokenid, categoria: categoria});
}

const UpdateCategoria = async (categoria: Categoria) => {
    let tokenid = JSON.parse(localStorage.getItem('session') as string).id;
    return await API('categoria', 'update', {tokenid: tokenid, categoria: categoria});
}

const DeleteCategoria = async (id: string) => {
    let tokenid = JSON.parse(localStorage.getItem('session') as string).id;
    return await API('categoria', 'delete', {tokenid: tokenid, id: id});
}


export {GetCategoria, GetCategorias, CreateCategoria, UpdateCategoria, DeleteCategoria};