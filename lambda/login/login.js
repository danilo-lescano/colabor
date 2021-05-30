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

exports.handler = async (event, content) => {
    
    const params = {
        TableName: "usuario",
    };
    
    try {
        const data = await db.scan(params).promise();
        if(data.Items && data.Items.filter(i => i.email === event.email && i.senha === event.senha)) {
            const u = data.Items.filter(i => i.email === event.email && i.senha === event.senha)[0];
            const t = await saveTokenLogin(u);
            if(t)
                return {
                    statusCode: 200,
                    data: t
                };
        }
        return null;
    } catch(err) {
        console.log(err);
    }
};