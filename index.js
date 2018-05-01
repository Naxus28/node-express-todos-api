import express from 'express';
import mongoose from 'mongoose';

import config from './server/config/config.js';
import appMiddleware from './server/middleware/appMiddleware';
import errorHandlerMiddleware from './server/middleware/errorHandlerMiddleware';
import api from './server/api/api';
import fourZeroFour from './server/api/fourZeroFour';

const PORT = 3000;
const app = express();

mongoose.connect(config.db.url)
  .then(
    conn => 'Mongoose connected',
    err => `Mongoose error: ${err}`
  );

appMiddleware(app);
api(app);
fourZeroFour(app);
errorHandlerMiddleware(app);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

