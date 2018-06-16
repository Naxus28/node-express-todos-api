import express from 'express';
import mongoose from 'mongoose';

import config from './server/config/config.js';
import appMiddleware from './server/middleware/appMiddleware';
import errorHandlerMiddleware from './server/middleware/errorHandlerMiddleware';
import auth from './server/auth/authRoutes';
import api from './server/api/api';
import fourZeroFour from './server/api/fourZeroFour';

const app = express();

mongoose.connect(config.db.url)
  .then(
    conn => console.log('Mongoose connected'),
    err => console.log(`Mongoose error: ${err}`)
  );

appMiddleware(app);
auth(app);
api(app);
fourZeroFour(app);
errorHandlerMiddleware(app);

app.listen(config.port, () => console.log(`Listening on http://localhost:${config.port}`));

