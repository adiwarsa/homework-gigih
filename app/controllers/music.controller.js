const Music = require('../models/music.model');

exports.create = (req, res) => {
  const { title, artist1, artist2, url } = req.body;

  const music = Music.create(title, artist1, artist2, url);

  res.status(201).json({ message: 'Music created successfully', music });
};

exports.findAll = (req, res) => {
  const music = Music.findAll();
  res.status(200).json({ music });
};

exports.mostPlayed = (req, res) => {
  const music = Music.mostPlayed();
  res.status(200).json({ music });
}

exports.show = (req, res) => {
  const { id } = req.params;
  const music = Music.findById(id);

  if (!music) {
    return res.status(404).json({ message: 'Music not found' });
  }

  res.status(200).json({ music });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { title, artist1, artist2, url } = req.body;

  const updatedMusic = Music.update(id, { title, artist1, artist2, url });

  if (!updatedMusic) {
    return res.status(404).json({ message: 'Music not found' });
  }

  res.status(200).json({ message: 'Music updated successfully', music: updatedMusic });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  const musicDeleted = Music.delete(id);

  if (!musicDeleted) {
    return res.status(404).json({ message: 'Music not found' });
  }

  res.status(200).json({ message: 'Music deleted successfully' });
};
