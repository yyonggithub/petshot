var Pet = require('../models/pet');

function postPets(req, res) {
  const pet = new Pet;
  pet.name = req.body.name;
  pet.type = req.body.type;
  pet.quantity = req.body.quantity;

  pet.save((err) => {
    if (err) {
      res.json({ message: 'error', data: err });
      return;
    }
    res.json({ message: 'done', data: pet });
  });
}

function getPets(req, res) {
  Pet.find((err, pets) => {
    if (err) {
      res.json({ message: 'error', data: err });
      return;
    }
    res.json({ message: 'done', data: pets });
  });
}

function getPet(req, res) {
  Pet.findById(req.params.id, (err, pet) => {
    if (err) {
      res.json({ message: 'error', data: err });
      return;
    }
    res.json({ message: 'done', data: pet });
  });
}

function updatePet(req, res) {
  Pet.findById(req.params.id, (err, pet) => {
    if (err) {
      res.json({ message: 'error', data: err });
      return;
    }
    pet.quantity = req.params.quantity;
    pet.save((err) => {
      if (err) {
        res.json({ message: 'error', data: err });
        return;
      }
      res.json({ message: 'done', data: pet });
    });
  });
}

function deletePet(req, res) {
  Pet.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.json({ message: 'error', data: err });
      return;
    }
    res.json({ message: 'done', data: {} });
  })
}

module.exports = {
  getPet,
  getPets,
  updatePet,
  deletePet,
  postPets,
}