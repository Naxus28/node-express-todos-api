import express from 'express';
import morgan from 'morgan';

export default (app) => {
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};