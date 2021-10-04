const API = async (apiName: string, operation: string, data?: any, url?: string) => {
    return new Promise(function (resolve, reject) {
        let resp: any;
        let resolveRejectFlag: boolean;
        let xhr = new XMLHttpRequest();
        let URL: string = url ? url : "https://5im5aom4s4.execute-api.sa-east-1.amazonaws.com/final/" + apiName;
        xhr.open("POST", URL, true);
        xhr.onload = async function () {
            console.log('not err')
            console.log(xhr)
            if (this.status >= 200 && this.status < 300) {
                let aux = JSON.parse(xhr.response);
                if(xhr && xhr.response && aux){
                    resolveRejectFlag = true;
                    try{resp = JSON.parse(aux.body);}
                    catch(e){resp = aux.body;}
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
            console.log('err')
            console.log(xhr)
            resp = {message: xhr.statusText};
            reject(resp)
        };

        let dados:any;
        dados = data ? {operation: operation, data: data} : {operation: operation};
        xhr.send(JSON.stringify(dados));
    });
}

export default API;