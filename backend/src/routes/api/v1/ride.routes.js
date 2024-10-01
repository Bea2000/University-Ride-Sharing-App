const express = require('express');
const db = require('../../../models');
const { Ride, User } = db;
const router = express.Router();
const { verifyToken, verifyAuthorizationRides } = require("../../../middlewares/errors/token");
const jwt = require("jsonwebtoken");


router.get('/', async (req, res) => {
  try{
  const ride = await Ride.findAll();
  res.status(200).send(ride);
  } catch(e){
    res.status(400).json({error: e});
  }
});


// Read
router.get('/:id', async (req, res) => {
  try{
    const ride = await Ride.findOne({
      where: {id: req.params.id}
    })
    const user = await User.findOne({
      where: {username: ride.driver}
    })
    console.log(user.id);
    const resp = {
      driver: ride.driver,
      rating: user.rating,
      comuna: ride.comuna,
      modelo: ride.modelo,
      patente: ride.patente,
      precio: ride.precio,
      campus: ride.campus,
      direccion: ride.direccion,
      img: ride.img,
    }
    res.status(200).send(resp);
  } catch(e){
    console.log(e);
    res.status(400).json({error: e});
  }
});

// Update
router.put("/update/:id", verifyToken);
router.put("/update/:id", verifyAuthorizationRides);
router.put('/update/:id', async (req,res) => {
  console.log(req.body);
  const decodedToken = jwt.decode(req.body.token);
  const user = await User.findOne({
    where: {username: decodedToken.username}
  })
  try {
    var selector = {
      where: {id: req.params.id}
    }
    const ride = {
      driver: user.username,
      comuna: req.body.comuna,
      modelo: req.body.modelo,
      patente: req.body.patente,
      precio: req.body.precio,
      campus: req.body.campus,
      direccion: req.body.direccion,
      img: user.img,
    };
    await Ride.update(ride, selector);
    res.status(200).send({"message":"accepted"});
  } catch (e) {
    res.status(400).json({error: e});
  }
});

// Delete
router.delete("/delete/:id", verifyToken);
router.delete("/delete/:id", verifyAuthorizationRides);
router.delete('/delete/:id', async (req, res) => {
  console.log(req);
  try{
    await Ride.destroy({
      where: {id: req.params.id}
    });
    res.status(200).send({"message":"accepted"});
  } catch(e) {
      res.status(400).json({error: e});
  }
});

// Create
router.post("/new-ride", verifyToken);
router.post("/new-ride",  async (req, res) => {
    //if (validateAddUserInput(req.body)) {
    console.log(req.body);
    const decodedToken = jwt.decode(req.body.token);
    // console.log(decodedToken.username);
    const user = await User.findOne({
      where: {username: decodedToken.username}
    })
    // console.log(user.img);
    try{
    const ride = await Ride.create({
      driver: user.username,
      comuna: req.body.comuna,
      modelo: req.body.modelo,
      patente: req.body.patente,
      precio: req.body.precio,
      campus: req.body.campus,
      direccion: req.body.direccion,
      img: user.img,
    });
    res.status(201).json(ride);
    } catch (e) {
      res.status(400).json({error: e});
    }
});

module.exports = router;