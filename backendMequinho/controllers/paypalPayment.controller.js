const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AZ7R6f00m8OlcTmjYQOs8GqmlntIEcgALSossGO-q7UvuMFuZPiUcwtoWi9pCd5_cDapwIA28kAJcazl',
    'client_secret': 'EEBeh4eLSfaMine3ZyeWoKCQd5JnziTtO4ymZWh31xBbvHyi2FC5z6igtH76Svsogkdu5YUDexiC_v65'
});

function getPay(req, res) {
    const preco = req.query.preco;

    var create_payment_json = {
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
                    "price": preco,
                    "currency": "EUR",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "EUR",
                "total": preco
            },
            "description": "Viagem na cheapdrive."
        }]
    };

    paypal.payment.create(create_payment_json, function(error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
}

function getParameters(req, res) {

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {

        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "EUR",
                "total": "25.00"
            }
        }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function(error, payment) {

        if (error) {
            console.log(error.response);
            throw error;
        } else {

            console.log(JSON.stringify(payment));
            res.send("success");
        }
    });
}

function getCancel(req, res) {
    res.send("cancelled");

}

//exportar as funções
module.exports = {
    getPay: getPay,
    getParameters: getParameters,
    getCancel: getCancel
};