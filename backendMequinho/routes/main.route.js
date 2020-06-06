const router =require('express').Router();

const controllerBolt = require('../controllers/boltMoloni.controller.js');
const controllerCompany = require('../controllers/company.controller.js');
const controllerCategory = require('../controllers/category.controller.js');
const controllerUber = require('../controllers/uberJasmin.controller.js');
const controllerKapten = require('../controllers/kaptenPipeDrive.controller.js');
const controllerPaypal = require('../controllers/paypalPayment.controller.js');
const controllerUser = require('../controllers/user.controller.js');


//Bolt using moloni
router.get('/bolt/', controllerBolt.getPackages);
router.get('/company/', controllerCompany.getCompany);
router.get('/category/', controllerCategory.getCategory);

//Uber using Jasmin
router.get('/uber/', controllerUber.getPacotes);

//Kapten using Pipedrive
router.get('/kapten/', controllerKapten.getPackages);

//Paypal payment
router.get('/paypal/', controllerPaypal.getPay); //mudar o nome da funçao 'getPay' se for preciso
router.get('/success/', controllerPaypal.getParameters);
router.get('/cancel/', controllerPaypal.getCancel);

//Rota Users
router.get('/users/', controllerUser.read);



module.exports = router;
