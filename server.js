const express = require('express');
const cors = require('cors');
const musicRoutes = require('./app/routes/music.routes');
const app = express();

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/music', musicRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
