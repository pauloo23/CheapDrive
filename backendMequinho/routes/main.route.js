const router =require('express').Router();

/*
const controllerAdmin = require('../controllers/admin.controller.js');
*/
const controllerBolt = require('../controllers/boltMoloni.controller.js');

/*
//administradores
router.get('/admins/', controllerAdmin.read);
router.get('/admins/:id', controllerAdmin.readID);
router.post('/admins/', controllerAdmin.save);
router.put('/admins/:id', controllerAdmin.update);
router.delete('/admins/:id', controllerAdmin.deleteID);
*/


//Bolt using moloni
router.get('/bolt/', controllerBolt.read);
router.get('/bolt/:id', controllerBolt.readID);
router.post('/bolt/', controllerBolt.save);
router.put('/bolt/:id', controllerBolt.update);
router.delete('/bolt/:id', controllerBolt.deleteID);



module.exports = router;