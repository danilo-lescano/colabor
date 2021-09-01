const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'sa-east-1' });

AWS.config.update({ region: 'sa-east-1' });

const saveTokenLogin = async (usuario) => {
    const params = {
        TableName: "logintoken",
        Item: {
            id: Date.now() + "-" + usuario.id,
            usuarioId: usuario.id,
            role: usuario.role
        }
    }
    await db.put(params).promise();
    return params.Item;
};

exports.handler = async (event, content, callback) => {
    const params = {
        TableName: "usuario",
    };
    
    try {
        const data = await db.scan(params).promise();
        if(data.Items && data.Items.filter(i => i.email === event.email && i.senha === event.senha)) {
            const u = data.Items.filter(i => i.email === event.email && i.senha === event.senha)[0];
            const token = await saveTokenLogin(u);
            if(token)
                return callback({
                    statusCode: 200,
                    headers: {'Access-Control-Allow-Origin': '*'},
                    body: JSON.stringify({data: t})
                });
        }
        return callback({
            statusCode: 400,
            headers: {'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({mensagem: 'login inválido'})
        });;
    } catch(err) {
        callback({
            statusCode: 500,
            headers: {'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({message:'erro no servidor login-42', erro: err})
        });
    }
};