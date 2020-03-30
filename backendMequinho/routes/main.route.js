const router =require('express').Router();

const controllerBolt = require('../controllers/boltMoloni.controller.js');
const controllerCompany = require('../controllers/company.controller.js');
const controllerCategory = require('../controllers/category.controller.js');


//Bolt using moloni
router.get('/bolt/', controllerBolt.getPackages);
router.get('/company/', controllerCompany.getCompany);
router.get('/category/', controllerCategory.getCategory);

/*
router.get('/bolt/:id', controllerBolt.readID);
router.post('/bolt/', controllerBolt.save);
router.put('/bolt/:id', controllerBolt.update);
router.delete('/bolt/:id', controllerBolt.deleteID);
*/


module.exports = router;
