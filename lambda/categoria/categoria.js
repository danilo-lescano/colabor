const AWS = require('aws-sdk');
const s3 = new AWS.S3();
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

const createCategoria = async (data, callback) => {
    //const token = await amILogged(data.tokenid);
    //if(!token || token.role !== "admin")
    //mountResponse(403, null, 'não autorizado', callback);
    
    mountResponse(400, null, 'METHOD NOT IMPLEMENTED', callback);

    //TO DO
};

const updateCategoria = async (data, callback) => {
    mountResponse(400, null, 'METHOD NOT IMPLEMENTED', callback);
    //TO DO
};

const getAllCategorias = async (data, callback) => {
    mountResponse(400, null, 'METHOD NOT IMPLEMENTED', callback);
    //TO DO
};

const getCategoria = async (data, callback) => {
    mountResponse(400, null, 'METHOD NOT IMPLEMENTED', callback);
    //TO DO
};

const deleteCategoria = async (data, callback) => {
    mountResponse(400, null, 'METHOD NOT IMPLEMENTED', callback);
    //TO DO
};

exports.handler = async (event, content, callback) => {
    if(event.operation === 'getall')
        getAllCategorias(event.data, callback);
    else if(event.operation === 'get')
        getCategoria(event.data, callback);
    else if(event.operation === 'create')
        createCategoria(event.data, callback);
    else if(event.operation === 'update')
        updateCategoria(event.data, callback);
    else if(event.operation === 'delete')
        deleteCategoria(event.data, callback);
    else
        mountResponse(400, null, 'operação não encontrada', callback);
};