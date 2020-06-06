var request = require('request');
var token_jasmin;
var dados_pacotes;
var preco;
var description;


//Tou a testar o IntelliJ com o git


function getTokenJasmin() {
    var url = 'https://identity.primaverabss.com/core/connect/token';
    var headers = {
        "Accept": "application/json"
    };
    var form = {
        "client_id": "CHAVE123456",
        "client_secret": "a230a832-d574-44c3-89a0-695b298098c7",
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
            url: 'https://my.jasminsoftware.com/api/235684/235684-0001/materialsCore/materialsItems',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'bearer ' + token_jasmin
            },
            form: {}
        };

        console.log("2--------------------------------------");
        console.log(token_jasmin);

        var data = {};
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                var dados_pacotes = JSON.parse(response.body);
                var pacotes = [];
                for (var i = 0; i < dados_pacotes.length; i++) {
                    if(dados_pacotes[i].itemSubtype){
                        pacotes.push(dados_pacotes[i]);           
					}
                }
                
                var barCode = [];
                var itemKey = [];
                var description = [];
                for (var i = 0; i < pacotes.length; i++) {
                    itemKey.push(pacotes[i].itemKey);
                    barCode.push(pacotes[i].barcode);
                    description.push(pacotes[i].description);
                }
                var data = {};
                data.itemKey = itemKey;
                data.description = description;
                data.barCode = barCode;
                data.pacotes = pacotes;
                res.end(JSON.stringify(data));
            });
    }, 2000);
}

function updatePackage(idCondutor, active) {
    getTokenJasmin();
    setTimeout(function () {
        var options = {
            method: 'PUT',
            url: 'https://my.jasminsoftware.com/api/235684/235684-0001/materialsCore/materialsItems/' + idCondutor + '/itemSubtype',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'bearer ' + token_jasmin
            },
            data: active ? '1' : '0',
        };

        var data = {};
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                console.log(body);
            });
    }, 2000);
}

//exportar as funções
module.exports = {
    getPacotes: getPacotes,
    updatePackage: updatePackage
};