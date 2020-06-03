var request = require('request');

function getPackages(req, res) {

    console.log("Init getPackages function...")
    var options = {
        method: 'GET',
        url:'https://api.pipedrive.com/v1/products?start=0&api_token=c8b64dfd1d3cc8e532203f76ff81055eac5de6e1',
        headers: { 'content-type': 'application/json' },
    };
    var data = {};
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.end(response.body);
    });


}

//exportar as funções
module.exports = {
    getPackages: getPackages
};