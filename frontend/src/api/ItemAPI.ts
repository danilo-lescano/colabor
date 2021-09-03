import API from "./API";

const GetItem = async (id: string) => {
    return await API('item', 'get', {id: id});
}

const GetItens = async (data?: any) => {
    return await API('item', 'getall', data);
}

const CreateItem = async (data?: any) => {
    return await API('item', 'create', data);
}

const UpdateItem = async (data?: any) => {
    return await API('item', 'update', data);
}

const DeleteItem = async (data?: any) => {
    return await API('item', 'delete', data);
}

export { GetItem, GetItens, CreateItem, UpdateItem, DeleteItem };