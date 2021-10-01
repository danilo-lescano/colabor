//api doc https://dev.pagseguro.uol.com.br/v1.0/reference#transparente-cartao-de-credito

const AWS = require('aws-sdk');
const https = require('https');
const db = new AWS.DynamoDB.DocumentClient({ region: 'sa-east-1' });
AWS.config.update({ region: 'sa-east-1' });

const EMAIL = 'nq3i4fsx@hotmail.com';
const TOKEN = '0856E23EE68745FD862A08B66A9038F0';
const options = {
    hostname: 'ws.sandbox.pagseguro.uol.com.br',
    path: `/v2/sessions?email=${EMAIL}&token=${TOKEN}`,
    port: 443,
    method: 'POST',
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
};

const optionsPag = {
    paymentMode: 'default',//k
    paymentMethod: 'creditCard',//k
    currency: 'BRL',//k
    receiverEmail: `${EMAIL}`,//k
    shippingAddressRequired: false,//k
    extraAmount: '0.00',//k
    reference: `REF-COMPRA-${Date.now()}`,//k
    //notificationURL: 'https://sualoja.com.br/notificacao.html',

    itemId1: '0001',
    itemDescription1: 'Notebook Prata',
    itemAmount1: '10300.00',
    itemQuantity1: 1,
    itemId2: '0002',
    itemDescription2: 'Notebook Azul',
    itemAmount2: '10000.00',
    itemQuantity2: 1,

    //installmentQuantity: 1,
    installmentValue: '3030.94',
    //noInterestInstallmentQuantity: 1,


}

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

exports.handler = async (event, content, callback) => {
    if(!amILogged(event.data.tokenid)) {
        mountResponse(403, null, 'Não autorizado!', callback);
        return;
    }
    let dataString = '';
    const response = await new Promise((resolve, reject) => {
        const req = https.request(options, function(res) {
            res.on('data', chunk => {
                dataString += chunk;
            });
            res.on('end', () => {
                let id = dataString.split('<id>')[1].split('</id>')[0];
                mountResponse(200, {idPagSeguro: id}, '', callback);
            });
        });

        req.on('error', (e) => {
            mountResponse(400, null, '', callback);
        });
        req.write('');
        req.end();
    });

    return response;
};