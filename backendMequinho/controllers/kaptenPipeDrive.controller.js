var request = require('request');

function getPackages(req, res) {

    console.log("Init getPackages function...")
    var options = {
        method: 'GET',
        url:'https://api.pipedrive.com/v1/products?start=0&api_token=1342c3a366d4a54c321ea28bad40b488699c658c',
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