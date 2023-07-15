const express = require('express');
const router = express.Router();
const music = require('../controllers/music.controller');

router.get('/', music.findAll);
router.get('/:id', music.show);
router.post('/', music.create);
router.put('/:id', music.update);
router.delete('/:id', music.delete);
router.get('/most-played', music.mostPlayed);

module.exports = router;
