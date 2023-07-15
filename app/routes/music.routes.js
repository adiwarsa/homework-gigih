const express = require('express');
const router = express.Router();
const music = require('../controllers/music.controller');

//Route for music
router.get('/', music.findAll);
router.get('/most-played', music.mostPlayed);
router.get('/:id', music.show);
router.post('/', music.create);
router.put('/:id', music.update);
router.delete('/:id', music.delete);


module.exports = router;
