const GetItemLoja = async (id: any) => {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://5im5aom4s4.execute-api.sa-east-1.amazonaws.com/final/lojaitem", true);
        xhr.onload = async function () {
            if (this.status >= 200 && this.status < 300) {
                let resp = JSON.parse(xhr.response);  
                if(xhr && xhr.response && resp) {
                    console.log(resp.data.Item);
                    resolve(resp.data);
                } else {
                    resolve(false);
                }
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
        console.log(JSON.stringify({id: id}))
        xhr.send(JSON.stringify({id: id}));
    });
}

export default GetItemLoja;