var moloni_access_token = '';
var moloni_refresh_token = '';
var moloni_client_secret = '125463ae6755e5308d9f6b86728022805d1582ec';
var request = require('request');
var express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var packages = [];
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
qs: { access_token: '' + moloni_access_token },
  headers: {
   'cache-control': 'no-cache',
   'content-type': 'application/x-www-form-urlencoded'
   },

    form: {
    company_id: '12345',
    category_id: '1101'
    }
};

request(options, function(error, response, body) {
  if (error) throw new Error(error);
   //res.status(200).send(body);
    var packages_data = JSON.parse(response.body);
    for (var i = 0; i < packages_data.length; i++) {
    packages.push(packages_data[i].package_id);
    }
    console.log(packages_data);
    console.log(packages);

    });

console.log(packages);

}

//exportar as funções
module.exports = {
    getPackages: getPackages
   };
