var request = require('request');

function getPackages(req, res) {

    console.log("Init getPackages function...")
    var options = {
        method: 'GET',
        url:'https://api.pipedrive.com/v1/products?start=0&api_token=6abe6de80e6a85e62b0bdb1bb8021c58f94223f5',
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