import Item from "../model/Item";
import API from "./API";

const GetItem = async (id: string) => {
    return await API('item', 'get', {id: id});
}

const GetItens = async (data?: any) => {
    return await API('item', 'getall', data);
}

const CreateItem = async (item: Item) => {
    let tokenid = JSON.parse(localStorage.getItem('session') as string).id;
    return await API('item', 'create', {tokenid: tokenid, item: item});
}

const UpdateItem = async (item: Item) => {
    let tokenid = JSON.parse(localStorage.getItem('session') as string).id;
    return await API('item', 'update', {tokenid: tokenid, item: item});
}

const DeleteItem = async (id: string) => {
    let tokenid = JSON.parse(localStorage.getItem('session') as string).id;
    return await API('item', 'delete', {tokenid: tokenid, id: id});
}

const UploadImage = async (file: any) => {
    let tokenid = JSON.parse(localStorage.getItem('session') as string).id;
    return await API('item', 'uploadimage', {tokenid: tokenid, file: file});
}

export { GetItem, GetItens, CreateItem, UpdateItem, DeleteItem, UploadImage };