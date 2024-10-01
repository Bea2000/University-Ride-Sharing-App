const express = require('express');
const db = require('../../../models');
const { Request, Ride, User } = db;
const router = express.Router();
const { verifyToken, verifyAuthorizationRequests, verifyAuthorizationEditRequests } = require("../../../middlewares/errors/token");
const jwt = require("jsonwebtoken");

router.put("/update/:id", verifyToken);
router.put("/update/:id", verifyAuthorizationEditRequests);
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
    const request = {
      accepted: req.body.accepted,
    };
    await Request.update(request, selector);
    const requests = await Request.findAll({
      where: {ride_driver: user.username}
     });
    res.status(200).send(requests);
  } catch (e) {
    res.status(400).json({error: e});
  }
});

router.post("/received", verifyToken);
router.post('/received', async (req, res) => {
    const decodedToken = jwt.decode(req.body.token);
    const user = await User.findOne({
        where: {username: decodedToken.username}
    })
    try{
    const requests = await Request.findAll({
        where: {ride_driver: user.username}
    });
    res.status(200).send(requests);
    } catch(e){
      res.status(400).json({error: e});
    }
});
  
router.post("/sent", verifyToken);
router.post('/sent', async (req, res) => {
  const decodedToken = jwt.decode(req.body.token);
  const user = await User.findOne({
      where: {username: decodedToken.username}
  })
  try{
    const requests = await Request.findAll({
      where: {requester: user.username}
    })
    res.status(200).send(requests);
  } catch(e){
    res.status(400).json({error: e});
  }
});

router.post("/find", verifyToken);
router.post('/find', async (req, res) => {
  const decodedToken = jwt.decode(req.body.token);
  const user = await User.findOne({
      where: {username: decodedToken.username}
  })
  try{
    const request = await Request.findOne({
      where: {requester: user.username,
              ride_id: req.body.id
      }
    })
    if(request){
      value = true;
      id_value = request.id;
    } else{
      value = false;
      id_value =  0;
    }
    res.status(200).send({"id":id_value,"find":value, "ride_id": req.body.id});
  } catch(e){
    res.status(400).json({error: e});
  }
});

router.delete("/delete/:id", verifyToken);
router.delete("/delete/:id", verifyAuthorizationRequests);
router.delete('/delete/:id', async (req, res) => {
  console.log(req);
  try{
    await Request.destroy({
      where: {id: req.params.id}
    });
    res.status(200).send({"message":"accepted"});
  } catch(e) {
      res.status(400).json({error: e});
  }
});

router.post("/new-request", verifyToken);
router.post("/new-request",  async (req, res) => {
    const decodedToken = jwt.decode(req.body.token);
    const ride = await Ride.findOne({
        where: {id: req.body.ride}
    })
    const requester = await User.findOne({
      where: {username: decodedToken.username}
    })
    try{
    const request = await Request.create({
      requester: requester.username,
      ride_id: ride.id,
      ride_driver: ride.driver,
      accepted: false,
    });
    res.status(200).json(request);
    } catch (e) {
      res.status(400).json({error: e});
    }
});

module.exports = router;