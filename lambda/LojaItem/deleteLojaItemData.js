const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const db = new AWS.DynamoDB.DocumentClient({ region: 'sa-east-1' });

AWS.config.update({ region: 'sa-east-1' });

const amILogged = async (tokenid) => {
    const tokenparams = {
        TableName: "logintoken",
        Key: {
            id: tokenid
        }
    };
    return (await db.get(tokenparams).promise()).Item;
};

exports.handler = async (event, content) => {
    const params = {
        TableName: "lojaitem",
        Key: {
            id: event.id,
        }
    };

    const token = await amILogged(event.tokenid);
    
    if(!token || token.role !== "admin")
        return { statusCode: 403, data: false };
    try {
        await db.delete(params).promise();
        return { statusCode: 200, data: true };
    } catch(err) {
        console.log(err);
        return { statusCode: 500, data: false };
    }
};