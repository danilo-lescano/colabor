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

const mountResponse = (statusCode, data, message) => {
    const resp = {};
    if(data) resp.data = data;
    if(message) resp.message = message;
    return {
        statusCode: statusCode,
        headers: {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(resp)
    }
}

const createItem = async (data, callback) => {
    //const token = await amILogged(data.tokenid);
    //if(!token || token.role !== "admin")
    //callback(mountResponse(403, null, 'não autorizado'));
    
    callback(mountResponse(400, null, 'METHOD NOT IMPLEMENTED'));

    //TO DO
};

const updateItem = async (data, callback) => {
    callback(mountResponse(400, null, 'METHOD NOT IMPLEMENTED'));
    //TO DO
};

const getAllItems = async (data, callback) => {
    callback(mountResponse(400, null, 'METHOD NOT IMPLEMENTED'));
    //TO DO
};

const getItem = async (data, callback) => {
    callback(mountResponse(400, null, 'METHOD NOT IMPLEMENTED'));
    //TO DO
};

const deleteItem = async (data, callback) => {
    callback(mountResponse(400, null, 'METHOD NOT IMPLEMENTED'));
    //TO DO
};

exports.handler = async (event, content, callback) => {
    if(event.operation === 'getall')
        getAllItems(event.data, callback);
    else if(event.operation === 'getitem')
        getItem(event.data, callback);
    else if(event.operation === 'create')
        createItem(event.data, callback);
    else if(event.operation === 'update')
        updateItem(event.data, callback);
    else if(event.operation === 'delete')
        deleteItem(event.data, callback);
    else
        callback({
            statusCode: 400,
            headers: {'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({message:'operação não encontrada'})
        });
};