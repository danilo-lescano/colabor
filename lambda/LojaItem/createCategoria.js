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

const createCategoria = async (data) => {
    const params = {
        TableName: "categoria",
        Item: {
            id: data.id ? data.id : Date.now().toString(),
            ...data
        }
    };
    try {
        await db.put(params).promise();
        return { statusCode: 200, data: {mensagem: '', status: true} };
    } catch(err) {
        console.log(err);
        return { statusCode: 500, data: {mensagem: 'Erro interno no servidor (err A1)', status: false} };
    }
};

const getAllCategoria = async () => {
    const params = {
        TableName: "categoria",
    };
    
    try {
        const data = await db.scan(params).promise();
        console.log(data);
        return {
            statusCode: 200,
            data: data.Items
        };
    } catch(err) {
        console.log(err);
    }
};

const deleteCategoria = async (data) => {
    const params = {
        TableName: "categoria",
        Key: {
            id: data.id,
        }
    };
    try {
        await db.delete(params).promise();
        return { statusCode: 200, data: true };
    } catch(err) {
        console.log(err);
        return { statusCode: 500, data: false };
    }
};

exports.handler = async (event, content) => {
    const token = await amILogged(event.tokenid);
    if(event.operation === 'getall')
        return await getAllCategoria();
    if(!token || token.role !== "admin")
        return { statusCode: 403, data: false };
    
    if(event.operation === 'create') //or update item
        return await createCategoria(event.data);
    else if(event.operation === 'delete')
        return await deleteCategoria(event.data);
    else
        return { statusCode: 400 }
};