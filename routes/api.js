const express = require('express');
const { isAuthenticated, isClientAuthenticated } = require('../controllers/auth');
const { authorization, decision, token } = require('../controllers/oauth2');

const router = express.Router();

const Pet = require('../models/pet');
const { postPets, getPet, getPets, updatePet, deletePet } = require('../controllers/pet');
const { getUsers, postUsers } = require('../controllers/user');
const { getClients, postClients } = require('../controllers/client');

router.route('/users').get(isAuthenticated, getUsers).post(postUsers);

router.route('/pets/:id')
  .put(isAuthenticated, updatePet)
  .delete(isAuthenticated, deletePet)
  .get(isAuthenticated, getPet);
router.route('/pets')
  .post(isAuthenticated, postPets)
  .get(isAuthenticated, getPets);
router.route('/clients')
  .post(isAuthenticated, postClients)
  .get(isAuthenticated, getClients);

router.route('/oauth2/authorize')
  .post(isAuthenticated, authorization)
  .get(isAuthenticated, decision);

router.route('/oauth2/token')
  .post(isClientAuthenticated, token);


module.exports = router;