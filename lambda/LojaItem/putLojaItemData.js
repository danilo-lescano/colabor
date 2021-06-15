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

async function uploadImage(file) {
    if(!file) return;
    let resp = [];
    for(let i = 0; i < file.length; i++) {
        let base64Data = new Buffer.from(file[i].replace(/^data:image\/\w+;base64,/, ""), 'base64');
        let type = file[i].split(';')[0].split('/')[1];
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
            resp[resp.length] = 'https://colabor-s3-image.s3-sa-east-1.amazonaws.com/' + s3Params.Key;
        } catch (error) {
            console.error(error);
            throw error;
            //return { statusCode: 500, data: {mensagem: 'Erro interno no servidor (err A2)', status: false} };
        }
    }
    return resp;
}

const putItem = async (data) => {
    const item = data.item;
    const params = {
        TableName: "lojaitem",
        Item: {
            id: item.id ? item.id : Date.now().toString(),
            ...item
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
const _getItem = async (id) => {
    const params = {
        TableName: "lojaitem",
        Key: { id: id }
    };
    try {
        const resp = await db.get(params).promise();
        return resp.Item;
    } catch(err) {
        return { statusCode: 500, data: {mensagem: 'Erro interno no servidor (err A3)', status: false} };
    }
};
const _deleteImageS3 = async (url) => {
    //todo
    return;
};
const removeImagem = async (data) => {
    const item = await _getItem(data.id);
    if(item.statusCode) return item;
    await _deleteImageS3(item[data.imagemNome]);
    item[data.imagemNome] = '';
    return await putItem({item:item});
};
const putImagem = async (data) => {
    const item = await _getItem(data.id);
    if(item.statusCode) return item;
    if(item[data.imagemNome])
        await _deleteImageS3(item[data.imagemNome]);
    item[data.imagemNome] = await uploadImage(data.imagem);
    return await putItem({item:item});
};

exports.handler = async (event, content) => {
    const token = await amILogged(event.tokenid);
    
    if(!token || token.role !== "admin")
        return { statusCode: 403, data: false };
    
    if(event.operation === 'putItem') //or update item
        return await putItem(event.data);
    else if(event.operation === 'putImagem')
        return await putImagem(event.data);
    else if(event.operation === 'removeImagem')
        return await removeImagem(event.data);
    else
        return { statusCode: 400 }
};