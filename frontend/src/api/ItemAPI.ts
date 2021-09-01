const GetItens = async () => {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://5im5aom4s4.execute-api.sa-east-1.amazonaws.com/final/item", true);
        xhr.onload = async function () {
            if (this.status >= 200 && this.status < 300) {
                let resp = JSON.parse(xhr.response);  
                if(xhr && xhr.response && resp){
                    resolve(JSON.parse(resp.body));
                }
                else
                    resolve(false);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };

        let data = {operation: 'getall'}
        xhr.send(JSON.stringify(data));
    });
}

export default GetItens;