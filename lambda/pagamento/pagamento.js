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
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=ISO-8859-1'
    },
};

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

const checkout = async (data, callback) => {
    if(!amILogged(data.tokenid)) {
        mountResponse(403, null, 'Não autorizado!', callback);
        return;
    }
    let dataString = '';
    await new Promise(async (resolve, reject) => {
        options.path = `/v2/transactions?email=${EMAIL}&token=${TOKEN}`;
        options.headers['Content-Type'] = 'application/xml; charset=ISO-8859-1';
        let items = [];
        let referencia = `REF-${Date.now()}`;
        let total = 0;
        for(let i = 0; i < data.payment.items.length; ++i) {
            try {
                let resp = await db.get({
                    TableName: "item",
                    Key: { id: data.payment.items[i].id }
                }).promise();
                items.push({...resp.Item, quantity: data.payment.items[i].quantity});
                total += resp.Item.preco * data.payment.items[i].quantity;
            } catch(err) {console.log(err);}
        }
        const req = https.request(options, function(res) {
            res.on('data', chunk => {
                dataString += chunk;
                console.log('000')
            });
            res.on('end', () => {
                console.log(1111);
                console.log(dataString);
                console.log(1111);
                mountResponse(200, dataString, '', callback);
            });
        });
        console.log(1111);
        req.on('error', e => console.log(e));
        let xml = `<payment>
            <mode>default</mode>
            <method>creditCard</method>
            <sender>
                <name>${data.payment.sender.name}</name>
                <email>${data.payment.sender.email}</email>
                <phone>
                    <areaCode>${data.payment.sender.phone.areaCode}</areaCode>
                    <number>${data.payment.sender.phone.number}</number>
                </phone>
                <documents>
                    <document>
                        <type>CPF</type>
                        <value>${data.payment.sender.cpf}</value>
                    </document>
                </documents>
                <hash>${data.payment.sender.hash}</hash>
            </sender>
            <currency>BRL</currency>
            <items>
                ${
                    Object.values(items).map((i, j) =>
                        `<item>
                            <id>${j+1}</id>
                            <description>${i.descricao.substring(0, 30)}</description>
                            <quantity>${i.quantity}</quantity>
                            <amount>${i.preco.toFixed(2)}</amount>
                        </item>
                    `).toString().replace(/,/g,'')
                }
            </items>
            <extraAmount>0.00</extraAmount>
            <reference>${referencia}</reference>
            <shippingAddressRequired>${data.payment.shippingAddressRequired}</shippingAddressRequired>
            <shipping>
                <address>
                    <street>${data.payment.shipping.address.street}</street>
                    <number>${data.payment.shipping.address.number}</number>
                    <complement>${data.payment.shipping.address.complement}</complement>
                    <district>${data.payment.shipping.address.distric}</district>
                    <city>${data.payment.shipping.address.city}</city>
                    <state>${data.payment.shipping.address.state}</state>
                    <country>BRA</country>
                    <postalCode>${data.payment.shipping.address.postalCode}</postalCode>
                </address>
                <type>3</type>
                <cost>0.00</cost>
            </shipping>
            <creditCard>
                <token>${data.payment.creditCard.token}</token>
                <installment>
                    <quantity>${data.payment.creditCard.installment.quantity}</quantity>
                    <value>${total.toFixed(2)}</value>
                    <noInterestInstallmentQuantity>${data.payment.creditCard.installment.noInterestInstallmentQuantity}</noInterestInstallmentQuantity>
                </installment>
                <holder>
                    <name>${data.payment.creditCard.holder.name}</name>
                    <documents>
                        <document>
                            <type>CPF</type>
                            <value>${data.payment.creditCard.holder.cpf}</value>
                        </document>
                    </documents>
                    <birthDate>${data.payment.creditCard.holder.birthDate}</birthDate>
                    <phone>
                        <areaCode>${data.payment.creditCard.holder.phone.areaCode}</areaCode>
                        <number>${data.payment.creditCard.holder.phone.number}</number>
                    </phone>
                </holder>
                <billingAddress>
                    <street>${data.payment.creditCard.billingAddress.street}</street>
                    <number>${data.payment.creditCard.billingAddress.number}</number>
                    <complement>${data.payment.creditCard.billingAddress.complement}</complement>
                    <district>${data.payment.creditCard.billingAddress.district}</district>
                    <city>${data.payment.creditCard.billingAddress.city}</city>
                    <state>${data.payment.creditCard.billingAddress.state}</state>
                    <country>${data.payment.creditCard.billingAddress.country}</country>
                    <postalCode>${data.payment.creditCard.billingAddress.postalCode}</postalCode>
                </billingAddress>
            </creditCard>
        </payment>`;
        console.log(xml);
        req.write(xml);
        req.end();
        console.log(2222);
    });
    return;
}

const getIdPagSeguro = async (data, callback) => {
    if(!amILogged(data.tokenid)) {
        mountResponse(403, null, 'Não autorizado!', callback);
        return;
    }
    let dataString = '';
    await new Promise((resolve, reject) => {
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
    return;
}

exports.handler = async (event, content, callback) => {
    if(event.operation === 'get')
        await getIdPagSeguro(event.data, callback);
    else if(event.operation === 'checkout')
        await checkout(event.data, callback);
    return;
};