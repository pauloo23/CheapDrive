const router =require('express').Router();
const controllerApolice = require('../controllers/Apolice.controller.js');
const controllerCliente = require('../controllers/Cliente.controller.js');
const controllerDaaa = require('../controllers/Daaa.controller.js');
const controllerReboque = require('../controllers/Reboque.controller.js');
const controllerSeguradora = require('../controllers/Seguradora.controller.js');
const controllerSinistro = require('../controllers/Sinistro.controller.js');
const controllerVeiculo = require('../controllers/Veiculo.controller.js');



//apolice
router.get('/policy/', controllerApolice.read);
router.get('/policy/:id', controllerApolice.readID);
router.post('/policy/', controllerApolice.save);
router.put('/policy/:id', controllerApolice.update);
router.delete('/policy/:id', controllerApolice.deleteID);

//cliente
router.get('/clients/', controllerCliente.read);
router.get('/clients/:id', controllerCliente.readID);
router.post('/clients/', controllerCliente.save);
router.put('/clients/:id', controllerCliente.update);
router.delete('/clients/:id', controllerCliente.deleteID);

//DAAA
router.get('/daaa/', controllerDaaa.read);
router.get('/daaa/:id', controllerDaaa.readID);
router.post('/daaa/', controllerDaaa.save);
router.put('/daaa/:id', controllerDaaa.update);
router.delete('/daaa/:id', controllerDaaa.deleteID);

//reboque
router.get('/trailer/', controllerReboque.read);
router.get('/trailer/:id', controllerReboque.readID);
router.post('/trailer/', controllerReboque.save);
router.put('/trailer/:id', controllerReboque.update);
router.delete('/trailer/:id', controllerReboque.deleteID);

//seguradora
router.get('/insurer/', controllerSeguradora.read);
router.get('/insurer/:id', controllerSeguradora.readID);
router.post('/insurer/', controllerSeguradora.save);
router.put('/insurer/:id', controllerSeguradora.update);
router.delete('/insurer/:id', controllerSeguradora.deleteID);


//sinistro
router.get('/sinister/', controllerSinistro.read);
router.get('/sinister/:id', controllerSinistro.readID);
router.post('/sinister/', controllerSinistro.save);
router.put('/sinister/:id', controllerSinistro.update);
router.delete('/sinister/:id', controllerSinistro.deleteID);

//veiculo
router.get('/vehicle/', controllerVeiculo.read);
router.get('/vehicle/:id', controllerVeiculo.readID);
router.post('/vehicle/', controllerVeiculo.save);
router.put('/vehicle/:id', controllerVeiculo.update);
router.delete('/vehicle/:id', controllerVeiculo.deleteID);
