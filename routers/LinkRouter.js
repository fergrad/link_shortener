const express = require('express');
const LinkController = require('../controllers/LinkController');
const router = express.Router();

router.get('/api/links', LinkController.getAllLinks);
router.post('/api/addURL', LinkController.addURL)
router.delete('/api/deleteURL/:id', LinkController.deleteURL)
router.get('/:alias', LinkController.redirectToOrigin);

module.exports = router;