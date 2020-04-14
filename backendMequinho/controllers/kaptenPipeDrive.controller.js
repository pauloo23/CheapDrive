var request = require('request');

function getPackages(req, res) {

console.log("Init getPackages function...")



         var options = {
             method: 'GET',
             url:'https://api.pipedrive.com/v1/products?start=0&api_token=1342c3a366d4a54c321ea28bad40b488699c658c',


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