import API from "./API";

const GetCategoria = async (data?: any) => {
    return await API('categoria', 'get', data);
}

const GetCategorias = async () => {
    return await API('categoria', 'getall');
}

const CreateCategoria = async (data?: any) => {
    return await API('categoria', 'create', data);
}

const UpdateCategoria = async (data?: any) => {
    return await API('categoria', 'update', data);
}

const DeleteCategoria = async (data?: any) => {
    return await API('categoria', 'delete', data);
}


export {GetCategoria, GetCategorias, CreateCategoria, UpdateCategoria, DeleteCategoria};