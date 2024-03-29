const {Router} = require('express');
const loanController = require('../controllers/loanController');
const bodyParser = require('body-parser');

const router = Router();

router.get('/api/clients/:id/loans', loanController.loan_index);
router.post('/api/clients/:id/loans', bodyParser.json(), loanController.loan_create);
router.put('/api/clients/:id/loans/:id', bodyParser.json(), loanController.loan_update);
router.delete('/api/clients/:id/loans/:id', loanController.loan_delete);

module.exports = router;

