const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'sa-east-1' });

AWS.config.update({ region: 'sa-east-1' });

const amILogged = async (tokenid) => {
    if(!tokenid) return false;
    const tokenparams = {
        TableName: "logintoken",
        Key: {
            id: tokenid
        }
    };
    return (await db.get(tokenparams).promise()).Item;
};

const mountResponse = (statusCode, data, message, callback) => {
    const resp = {};
    if(data) resp.data = data;
    if(message) resp.message = message;
    callback(null, {
        statusCode: statusCode,
        headers: {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(resp)
    });
}

const createOrUpdateCategoria = async (data, callback) => {
    let token = await amILogged(data.tokenid);
    if(!token || token.role !== "admin") {
        mountResponse(403, null, 'Não autorizado!', callback);
        return;
    }
    let item = data.item;
    item.lastModification = Date.now();
    item.autor = token.usuarioId;
    let params = {
        TableName: "categoria",
        Item: {
            id: item.id ? item.id : Date.now().toString(),
            ...item
        }
    };
    try {
        await db.put(params).promise();
        mountResponse(200, true, 'Item criado com sucesso', callback);
    } catch(err) {
        mountResponse(200, false, 'Falha na criação do item', callback);
    }
};

const getAllCategorias = async (data, callback) => {
    let params = { TableName: "categoria" };
    try {
        let resp = await db.scan(params).promise();
        mountResponse(200, resp.Items, '', callback);
    } catch(err) {
        mountResponse(400, null, err, callback);
    }
};

const getCategoria = async (data, callback) => {
    let params = {
        TableName: "categoria",
        Key: { id: data.id }
    };
    try {
        let resp = await db.get(params).promise();
        mountResponse(200, resp.Item, '', callback);
    } catch(err) {
        mountResponse(400, null, err, callback);
    }
};

const deleteCategoria = async (data, callback) => {
    let token = await amILogged(data.tokenid);
    if(!token || token.role !== "admin") {
        mountResponse(403, false, 'Não autorizado!', callback);
        return;
    }
    let params = {
        TableName: "categoria",
        Key: { id: data.id }
    };
    try {
        await db.delete(params).promise();
        mountResponse(200, true, 'Categoria deletada com sucesso', callback);
    } catch(err) {
        mountResponse(400, false, err, callback);
    }
};

exports.handler = async (event, content, callback) => {
    if(event.operation === 'getall')
        getAllCategorias(event.data, callback);
    else if(event.operation === 'get')
        getCategoria(event.data, callback);
    else if(event.operation === 'create')
        createOrUpdateCategoria(event.data, callback);
    else if(event.operation === 'delete')
        deleteCategoria(event.data, callback);
    else
        mountResponse(400, null, 'operação não encontrada', callback);
};