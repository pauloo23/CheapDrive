var request = require('request');
global.app.get('/lista_utilizadores_pipedrive', function(req, res) {

     console.log('body: ' + JSON.stringify(req.body));

         var options = {
             method: 'GET',
             url:'',

        headers:
     { 'content-type': 'application/json' },

        };

     request(options, function (error, response, body) {
         if (error) throw new Error(error);
         //res.status(200).send(body);

         var oi = JSON.parse(response.body);

         var dados = oi.data;
         var nomes = [];
         var email = [];
         var telemovel = [];
         for (var i = 0; i < dados.length; i++) {
                nomes.push(dados[i].name);
                email.push(dados[i].email[0].value);
                telemovel.push(dados[i].phone[0].value);
                console.log(nomes);
    }
    var oi = {};
            oi.nome= nomes;
            oi.email=email;
            oi.phone=telemovel;
            res.send(oi);

     });


});