const API = async (apiName: string, operation: string, data?: any) => {
    return new Promise(function (resolve, reject) {
        let resp: any;
        let resolveRejectFlag: boolean;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://5im5aom4s4.execute-api.sa-east-1.amazonaws.com/final/" + apiName, true);
        xhr.onload = async function () {
            if (this.status >= 200 && this.status < 300) {
                let aux = JSON.parse(xhr.response);
                if(xhr && xhr.response && aux){
                    resolveRejectFlag = true;
                    resp = JSON.parse(aux.body);
                } else {
                    resolveRejectFlag = false;
                    resp = {data: false};
                }
            } else {
                resolveRejectFlag = false;
                resp = {message: xhr.statusText};
            }
            if(resolveRejectFlag)
                resolve(resp);
            else
                reject(resp)
        };
        xhr.onerror = function () {
            resp = {message: xhr.statusText};
            reject(resp)
        };

        let dados:any;
        dados = data ? {operation: operation} : {operation: operation, ...data};
        
        xhr.send(JSON.stringify(dados));
    });
}

export default API;