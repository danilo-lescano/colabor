const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'sa-east-1' });

AWS.config.update({ region: 'sa-east-1' });

const amILogged = async (tokenid) => {
    const tokenparams = {
        TableName: "logintoken",
        Key: {
            id: tokenid
        }
    };
    return await db.get(tokenparams).promise();
};

exports.handler = async (event, content) => {
    const params = {
        TableName: "lojaitem",
        Item: {
            id: Date.now().toString(),
            nome: event.nome,
            preco: event.preco
        }
    };
    const token = await amILogged(event.tokenid);
    
    if(!token || token.Item.role !== "admin")
        return { statusCode: 403 };
    try {
        const data = await db.put(params).promise();
        console.log(data);
    } catch(err) {
        console.log(err);
    }
    
};