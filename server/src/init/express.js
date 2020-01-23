const express = require('express');
const config = require('../config');
const makeLogger = require('../middlewares/makeLogger');
const path = require('path')

const reqPath = path.join(__dirname, '../../public');
console.log(reqPath);


module.exports = (app) => {
  app.set('PORT', config.PORT);
  app.use(express.json());
  app.use(express.static(reqPath));
  app.use(express.text());
  app.use(makeLogger());
  app.use(express.static('documentation'));
};
