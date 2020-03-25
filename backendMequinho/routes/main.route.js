const router =require('express').Router();
const controllerFormacoes = require('../controllers/formacoes.controller.js');
const controllerEventos = require('../controllers/eventos.controller.js');
const controllerAdmin = require('../controllers/admin.controller.js');
const controllerEmpresa = require('../controllers/empresa.controller.js');
const controllerSocio = require('../controllers/socio.controller.js');
const controllerVolunt = require('../controllers/volunt.controller.js');
const controllerTabelaAssociados = require('../controllers/tabelaAssociados.controller.js');
const controllerTabelaEmpresas = require('../controllers/tabelaEmpresas.controller.js');
const controllerTabelaVoluntarios = require('../controllers/tabelaVoluntarios.controller.js');
const controllerInscricaoAssociados = require('../controllers/inscricaoAssociados.controller.js');
const controllerInscricaoVoluntarios = require('../controllers/inscricaoVoluntarios.controller.js');
const controllerInscricaoEmpresas = require('../controllers/inscricaoEmpresas.controller.js');
const controllerProdutos = require('../controllers/produtos.controller.js');
const controllerInscricaoGeral = require('../controllers/inscricaoGeral.controller.js');

//formaçoes
router.get('/formations/', controllerFormacoes.read);
router.get('/formations/:id', controllerFormacoes.readID);
router.post('/formations/', controllerFormacoes.save);
router.put('/formations/:id', controllerFormacoes.update);
router.delete('/formations/:id', controllerFormacoes.deleteID);

//eventos
router.get('/events/', controllerEventos.read);
router.get('/events/:id', controllerEventos.readID);
router.post('/events/', controllerEventos.save);
router.put('/events/:id', controllerEventos.update);
router.delete('/events/:id', controllerEventos.deleteID);

//administradores
router.get('/admins/', controllerAdmin.read);
router.get('/admins/:id', controllerAdmin.readID);
router.post('/admins/', controllerAdmin.save);
router.put('/admins/:id', controllerAdmin.update);
router.delete('/admins/:id', controllerAdmin.deleteID);

//empresas
router.get('/companies/', controllerEmpresa.read);
router.get('/companies/:id', controllerEmpresa.readID);
router.post('/companies/', controllerEmpresa.save);
router.put('/companies/:id', controllerEmpresa.update);
router.post('/companies/:id', controllerEmpresa .activate);
router.delete('/companies/:id', controllerEmpresa.deleteID);

//socios
router.get('/partners/', controllerSocio.read);
router.get('/partners/:id', controllerSocio.readID);
router.post('/partners/', controllerSocio.save);
router.put('/partners/:id', controllerSocio.update);
router.post('/partners/:id', controllerSocio .activate);
router.delete('/partners/:id', controllerSocio.deleteID);

//voluntarios
router.get('/volunteers/', controllerVolunt .read);
router.get('/volunteers/:id', controllerVolunt .readID);
router.post('/volunteers/', controllerVolunt .save);
router.put('/volunteers/:id', controllerVolunt .update);
router.post('/volunteers/:id', controllerVolunt .activate);
router.delete('/volunteers/:id', controllerVolunt .deleteID);
//NAO VOU PRECISAR /////////////////////////////////////////////////////////////
//tabela associados
router.get('/parttables/', controllerTabelaAssociados .read); 
router.get('/parttables/:id', controllerTabelaAssociados .readID);
router.post('/parttables/', controllerTabelaAssociados .save);
router.put('/parttables/:id', controllerTabelaAssociados .update);
router.delete('/parttables/:id', controllerTabelaAssociados .deleteID);

//tabela empresas
router.get('/comptables/', controllerTabelaEmpresas .read);
router.get('/comptables/:id', controllerTabelaEmpresas .readID);
router.post('/comptables/', controllerTabelaEmpresas .save);
router.put('/comptables/:id', controllerTabelaEmpresas .update);
router.delete('/comptables/:id', controllerTabelaEmpresas .deleteID);

//tabela voluntários
router.get('/volunttables/', controllerTabelaVoluntarios .read);
router.get('/volunttables/:id', controllerTabelaVoluntarios .readID);
router.post('/volunttables/', controllerTabelaVoluntarios .save);
router.put('/volunttables/:id', controllerTabelaVoluntarios .update);
router.delete('/volunttables/:id', controllerTabelaVoluntarios .deleteID);
///////////////////////////////////////////////////////////////////////////////
//inscricaoAssociados
router.get('/insPartners/', controllerInscricaoAssociados .read);
router.get('/insPartners/:id', controllerInscricaoAssociados .readID);
router.post('/insPartners/', controllerInscricaoAssociados .save);
router.put('/insPartners/:id', controllerInscricaoAssociados .update);
router.delete('/insPartners/:id', controllerInscricaoAssociados .deleteID);

//incricaoVoluntarios
router.get('/insVolunteers/', controllerInscricaoVoluntarios .read);
router.get('/insVolunteers/:id', controllerInscricaoVoluntarios .readID);
router.post('/insVolunteers/', controllerInscricaoVoluntarios .save);
router.put('/insVolunteers/:id', controllerInscricaoVoluntarios .update);
router.delete('/insVolunteers/:id', controllerInscricaoVoluntarios .deleteID);

//inscricaoEmpresas
router.get('/insCompanies/', controllerInscricaoEmpresas .read);
router.get('/insCompanies/:id', controllerInscricaoEmpresas .readID);
router.post('/insCompanies/', controllerInscricaoEmpresas .save);
router.put('/insCompanies/:id', controllerInscricaoEmpresas .update);
router.delete('/insCompanies/:id', controllerInscricaoEmpresas .deleteID);

//produtos
router.get('/products/', controllerProdutos .read);
router.get('/products/:id', controllerProdutos .readID);
router.post('/products/', controllerProdutos .save);
router.put('/products/:id', controllerProdutos .update);
router.delete('/products/:id', controllerProdutos .deleteID);

//inscricaoGeral
router.get('/insGeral/', controllerInscricaoGeral .read);
router.get('/insGeral/:id', controllerInscricaoGeral .readID);
router.post('/insGeral/', controllerInscricaoGeral .save);
router.put('/insGeral/:id', controllerInscricaoGeral .update);
router.delete('/insGeral/:id', controllerInscricaoGeral .deleteID);


module.exports = router;