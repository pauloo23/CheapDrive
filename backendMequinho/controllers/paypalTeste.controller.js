var request = require('request');
var express = require('express');
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AUXuU3YjylULntAdjR8jQG5GLz-WidAxeDFIWTYfd9BiZoTPTBrZY2lkaCIQ_BrjjTCoPD19e9E5fIr9',
    'client_secret': 'EGKOe4octZMssbTDt1zMJ5U4N6O54MNJxzJRMXNYcoLu7SxujbdCBms2FnN9mqIMXc5gopaRXOpaZS35'
});

function postPaypal(req, res) {

const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:8080/success",
            "cancel_url": "http://localhost:8080/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Viagem",
                    "sku": "001",
                    "price": "25.00", //depois usar o body parser para ir busar o valor do preço
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "Viagem mais barata"
        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for(let i = 0;i < payment.links.length;i++){
                    if(payment.links[i].rel === 'approval_url'){
                        res.redirect(payment.links[i].href);
                    }
                }
            }
        });

        }


function getPaypal(req, res) {

 const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "25.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            console.log("TESTEEE");
            res.send('Success');
        }
    });
}


//exportar as funções
module.exports = {
    postPaypal: postPaypal,
    getPaypal: getPaypal

   };













