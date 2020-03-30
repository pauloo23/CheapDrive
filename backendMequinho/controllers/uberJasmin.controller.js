var request = require('request');
var token_jasmin;
var pacotes = [];
var dados_pacotes;




function getTokenJasmin() {
    var url = 'https://identity.primaverabss.com/core/connect/token';
    var headers = {
        "Accept": "application/json"
    };
    var form = {
        "client_id": "CHAVEAPP",
        "client_secret": "efbcbc31-5e82-4630-bb14-351e3d67d52c",
        "grant_type": "client_credentials",
        "scope": "application",
    };

    request.post({ url: url, form: form, headers: headers }, function (e, r, body) {
        var t = JSON.parse(body);
        token_jasmin = t.access_token;

    });
    console.log("AQUI VAI O TOKEN:");
   // console.log(token_jasmin);
};



function getPacotes(req, res) {
    getTokenJasmin();
    setTimeout(function () {
        var options = {
            method: 'GET',
            url: 'https://my.jasminsoftware.com/api/233762/233762-0001/materialsCore/materialsItems',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'bearer ' + token_jasmin
            },
            form: {}
        };

        console.log("1--------------------------------------");
        console.log(token_jasmin);

        var data = {};


            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                var dados_pacotes = JSON.parse(response.body);
                for (var i = 0; i < dados_pacotes.length; i++) {
                    pacotes.push(dados_pacotes[i].itemKey);
                }
                console.log(dados_pacotes);
                console.log(pacotes);
               /* var ola = JSON.parse(response.body);
                console.log(ola);
                var dados = ola;
                var barCode = [];
                var itemKey = [];
                for (var i = 0; i < dados.length; i++) {
                    itemKey.push(dados[i].itemKey);
                    console.log(itemKey);
                    barCode.push(dados[i].barcode);
                }
                var data = {};
                data.itemKey = itemKey;
                data.barCode = barCode;*/
                data.pacotes = {};
                data.pacotes = dados_pacotes;
                res.end(JSON.stringify(data));
                console.log(data);
                console.log(dados_pacotes);
               
               // res.end(JSON.stringify(data));
                //console.log(data);
            });
    }, 2000);
}

//exportar as funções
module.exports = {
    getPacotes: getPacotes
};
