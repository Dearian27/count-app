import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { MongoClient } from "mongodb";
import cors from 'cors';
import mongoose from 'mongoose';

config();

// import indexRouter from './routes/index.js';
// import usersRouter from './routes/users.js';

const connectionString = process.env.ATLAS_URI || "";
const app = express();
// require('dotenv').config();

const PORT = process.env.PORT || 8879;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
mongoose.set('strictQuery', false);
app.use(cors({
  // origin: [process.env.CORS_ORIGIN, process.env.CORS_ORIGIN_LOCAL],
  // origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.get('/', function(req, res, next) {
  res.send('Hello World!');
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

const connect = () => {
  mongoose.connect(process.env.MONGO, {}).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.log('Irror');
    throw err;
  })
}

app.listen(PORT, () => {
  connect();
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;