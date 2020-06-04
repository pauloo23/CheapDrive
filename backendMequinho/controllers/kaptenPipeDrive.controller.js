var request = require('request');

function getPackages(req, res) {

    console.log("Init getPackages function...")
    var options = {
        method: 'GET',
        url:'https://api.pipedrive.com/v1/products?start=0&api_token=c8b64dfd1d3cc8e532203f76ff81055eac5de6e1',
        headers: { 'content-type': 'application/json' },
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        const data = JSON.parse(response.body).data;
        const disponiveis = data.filter(condutor => condutor.selectable);
        res.end(JSON.stringify(disponiveis));
    });


}

//exportar as funções
module.exports = {
    getPackages: getPackages
};