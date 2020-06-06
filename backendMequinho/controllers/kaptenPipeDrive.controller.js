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
    
    updatePackage(3, false);
}

function updatePackage(id, active) {
    console.log("Init updatePackage function...")
    var options = {
        method: 'PUT',
        url:'https://api.pipedrive.com/v1/products/' + id + '?api_token=c8b64dfd1d3cc8e532203f76ff81055eac5de6e1',
        json: {
            "selectable": "0",
            "active_flag": "1"
        },
        headers: {     
            "Accept": "application/json",
            "Content-Type": "application/json" },
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
    });
}

//exportar as funções
module.exports = {
    getPackages: getPackages,
    updatePackage: updatePackage
};