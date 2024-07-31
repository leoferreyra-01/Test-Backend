const express = require('express');
import { Application } from "express";
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet')
import {routes as initRoutes} from './routes/index';

const app : Application = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
initRoutes(app);

module.exports = app;