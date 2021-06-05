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
        }
    }
    return resp;
}

exports.handler = async (event, content) => {
    const params = {
        TableName: "lojaitem",
        Item: {
            id: event.id ? event.id : Date.now().toString(),
            nome: event.nome,
            preco: event.preco,
            descricao: event.descricao,
            descricaoTecnica: event.descricaoTecnica,
            peso: event.peso,
            altura: event.altura,
            largura: event.largura,
            profundidade: event.profundidade,
            imagemPrincipal: await uploadImage(event.imagemPrincipal),
            imagensCarrossel: await uploadImage(event.imagensCarrossel),
            imagensMosaico: await uploadImage(event.imagensMosaico),
            imagemIcone: await uploadImage(event.imagemIcone),
            categorias: event.categorias
        }
    };

    const token = await amILogged(event.tokenid);
    
    if(!token || token.role !== "admin")
        return { statusCode: 403, data: false };
    try {
        const data = await db.put(params).promise();
        return { statusCode: 200, data: true };
    } catch(err) {
        console.log(err);
        return { statusCode: 500, data: false };
    }
};