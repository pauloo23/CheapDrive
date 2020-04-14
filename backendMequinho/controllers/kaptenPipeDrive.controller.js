var request = require('request');

function getPackages(req, res) {
//teste
console.log("Init getPackages function...")



         var options = {
             method: 'GET',
             url:'https://api.pipedrive.com/v1/products?start=0&api_token=e5552dfcf767e06f352894293743f6fbecf170cb',


        headers:
     { 'content-type': 'application/json' },

        };
var data = {};


     request(options, function (error, response, body) {
         if (error) throw new Error(error);
         //res.status(200).send(body);

         var oi = JSON.parse(response.body);

         var dados = oi.data;
         var nomes = [];
         var code = [];


         for (var i = 0; i < dados.length; i++) {
                nomes.push(dados[i].name);
                code.push(dados[i].code);


                console.log(nomes);
                console.log(code);
    }
    var oi = {};
            oi.nomes= nomes;
            oi.code= code;


     });


}

//exportar as funções
module.exports = {
    getPackages: getPackages
};