/*
lead Routes
*/

const LeadsController = require('../controllers/lead.controller');
const ValidationMiddleware = require('../middlewares/lead.middleware');

const config = require('../../config/default.config');


exports.routesConfig = function (app) {
  app.post('/leads', [
    ValidationMiddleware.validateLeads,
    LeadsController.createLeads
  ]);

  app.post('/lead/single', [
    ValidationMiddleware.validateLead,
    LeadsController.createLead
  ]);

  app.get('/leads', [
    LeadsController.list
  ]);

  app.get('/leads/:leadId', [
    LeadsController.listLeadById
  ]);


  return app
};
