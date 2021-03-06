var moloni_access_token = '';
var moloni_refresh_token = '';
var moloni_client_secret = '125463ae6755e5308d9f6b86728022805d1582ec';
var request = require('request');
var express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var packages_data;


function getToken() {

    var url =
        "https://api.moloni.pt/v1/grant/?grant_type=password&client_id=universidadedominho203&client_secret=125463ae6755e5308d9f6b86728022805d1582ec&username=a85365@alunos.uminho.pt&password=cheapdrive203";

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    var jsonStructure = '[' + xmlHttp.responseText + ']';
    var json = JSON.parse(jsonStructure);
    moloni_access_token = json[0]["access_token"];
    moloni_refresh_token = json[0]["refresh_token"];
    console.log("moloni_access_token: " + moloni_access_token + "   moloni_refresh_token: " + moloni_refresh_token);

}

function getPackages(req, res) {
    getToken();
    console.log("Getting acess_token");

    var options = {
        method: 'POST',
        url: 'https://api.moloni.pt/v1/products/getAll/',
        qs: {
            access_token: '' + moloni_access_token
        },
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        },

        form: {
            company_id: '127896',
            category_id: '2183110',
            name: req.body.name,
            reference: req.body.reference
        }
    };
    var data = {};
    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        //res.status(200).send(body);
        var packages_data = JSON.parse(response.body);
        console.log(packages_data);

        var packages = [];
        for (var i = 0; i < packages_data.length; i++) {
            if(packages_data[i].notes){
                packages.push(packages_data[i]);
			}
        }

        data.packages = {};
        data.packages = packages;
        res.end(JSON.stringify(data));
    });
}


function updatePackage(id, active) {
    getToken();
    console.log("Getting acess_token");

    var options = {
        method: 'POST',
        url: 'https://api.moloni.pt/v1/products/update/',
        qs: {
            access_token: '' + moloni_access_token
        },
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        },

        form: {
            company_id: '127896',
            product_id: id,
            notes: active? 'Disponivel' : '',
        }
    };
    var data = {};
    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
    });
}

//exportar as funções
module.exports = {
    getPackages: getPackages,
    updatePackage: updatePackage
};