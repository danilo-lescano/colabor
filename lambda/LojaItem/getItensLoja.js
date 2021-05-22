const AWS = require('aws-sdk');

AWS.config.update({ region: 'sa-east-1' });

exports.handler = async (event, content) => {
    const db = new AWS.DynamoDB.DocumentClient({ region: 'sa-east-1' });
    
    const params = {
        TableName: "lojaitem",
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