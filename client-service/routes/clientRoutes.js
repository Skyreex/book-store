const {Router} = require('express');
const clientController = require('../controllers/clientController');
const bodyParser = require('body-parser');

const router = Router();

router.get('/api/clients', clientController.client_index);
router.get('/api/clients/:id', clientController.client_details);
router.post('/api/clients', bodyParser.json(), clientController.client_create);
router.put('/api/clients/:id', bodyParser.json(), clientController.client_update);
router.delete('/api/clients/:id', clientController.client_delete);

module.exports = router;

