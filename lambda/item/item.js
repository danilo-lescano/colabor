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
};

const uploadImage = async (data, callback) => {
    let token = await amILogged(data.tokenid);
    let file = data.file;
    if(!token || token.role !== "admin") {
        mountResponse(403, null, 'Não autorizado!', callback);
        return;
    }
    if(file) {
        mountResponse(403, false, '', callback);
        return;
    }
    let base64Data = new Buffer.from(file[0].replace(/^data:image\/\w+;base64,/, ""), 'base64');
    let type = file[0].split(';')[0].split('/')[1];
    let s3Params = {
        Bucket: 'colabor-s3-image',
        Key: `${Date.now()}-${Math.random().toString().replace('.', '')}.${type}`,
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type}`
    };
    try {
        await s3.putObject(s3Params).promise();
        mountResponse(200, 'https://colabor-s3-image.s3-sa-east-1.amazonaws.com/' + s3Params.Key, 'Imagem salva com sucesso', callback);
    } catch (error) {
        mountResponse(200, false, 'Erro ao salvar a imagem', callback);
    }
}

const createOrUpdateItem = async (data, callback) => {
    let token = await amILogged(data.tokenid);
    if(!token || token.role !== "admin") {
        mountResponse(403, null, 'Não autorizado!', callback);
        return;
    }
    let item = data.item;
    item.lastModification = Date.now();
    item.autor = token.usuarioId;
    let params = {
        TableName: "item",
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

const getAllItems = async (data, callback) => {
    let params = { TableName: "item" };
    try {
        let resp = await db.scan(params).promise();
        mountResponse(200, resp.Items, '', callback);
    } catch(err) {
        mountResponse(400, null, err, callback);
    }
};

const getItem = async (data, callback) => {
    let params = {
        TableName: "item",
        Key: { id: data.id }
    };
    try {
        let resp = await db.get(params).promise();
        mountResponse(200, resp.Item, '', callback);
    } catch(err) {
        mountResponse(400, null, err, callback);
    }
};

const deleteItem = async (data, callback) => {
    let token = await amILogged(data.tokenid);
    if(!token || token.role !== "admin") {
        mountResponse(403, false, 'Não autorizado!', callback);
        return;
    }
    let params = {
        TableName: "item",
        Key: { id: data.id }
    };
    try {
        await db.delete(params).promise();
        mountResponse(200, true, 'Item deletado com sucesso', callback);
    } catch(err) {
        mountResponse(400, false, err, callback);
    }
};

exports.handler = async (event, content, callback) => {
    if(event.operation === 'getall')
        await getAllItems(event.data, callback);
    else if(event.operation === 'get')
        await getItem(event.data, callback);
    else if(event.operation === 'create' || event.operation === 'update')
        await createOrUpdateItem(event.data, callback);
    else if(event.operation === 'delete')
        await deleteItem(event.data, callback);
    else if(event.operation === 'uploadimage')
        await uploadImage(event.data, callback);
    else
        mountResponse(400, null, 'operação não encontrada', callback);
};