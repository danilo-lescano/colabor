const AWS = require('aws-sdk');

AWS.config.update({ region: 'sa-east-1' });

exports.handler = async (event, content) => {
    const db = new AWS.DynamoDB.DocumentClient({ region: 'sa-east-1' });
    
    const params = {
        TableName: "lojaitem",
        Key: {
            id: event.id
        }
    };
    
    try {
        const data = await db.get(params).promise();
        console.log(data);
        return {
            statusCode: 200,
            data: data.Item
        };
    } catch(err) {
        console.log(err);
    }
    
};