const jwt = require("jsonwebtoken");
const db = require('../../models');
const { Ride, User, Request } = db;


// Autentificación de usuario
function verifyToken(req, res, next) {
    try {
        const tokenVerification = jwt.verify(req.body.token, process.env.SECRET_KEY);
		if (tokenVerification) {
            next();
        }
    } catch(e) {
        res.status(401).json({
            error: "No autorizado",
        });
    }
};

// Verifica si un usuario esta autorizado para modificar un usuario
function verifyUserEditionAuthorization(req, res, next) {
		const decodedToken = jwt.decode(req.body.token);
		const authorisedUser = decodedToken.username === req.body.username;
        console.log(decodedToken);
        console.log(req.body);
        if (authorisedUser) {
        next()
    } else {
        res.status(403).json({
            error: "No autorizado"
        })
    }
};

async function verifyAuthorizationRides(req, res, next){
    const decodedToken = jwt.decode(req.body.token);
    console.log(req.params.id);
    try{
        const ride = await Ride.findOne({
          where: {id: req.params.id}
        })
        console.log(ride.driver);
        console.log(decodedToken.username);
        if (ride.driver == decodedToken.username){
            next();
        }
        else{
            res.status(400).json({
                error: "No eres el usuario"
            });
        }
      } catch(e){
        res.status(400).json({error: e});
      }
}

async function verifyAuthorizationRequests(req, res, next){
    const decodedToken = jwt.decode(req.body.token);
    try{
        const request = await Request.findOne({
          where: {id: req.params.id}
        })
        if (request.requester == decodedToken.username){
            next();
        }
        else{
            res.status(400).json({
                error: "No eres el usuario"
            });
        }
      } catch(e){
        res.status(400).json({error: e});
      }
}

async function verifyAuthorizationRatings(req, res, next){
    const decodedToken = jwt.decode(req.body.token);
    try{
        const user = await User.findOne({
            where: {username: decodedToken.username}
        })
        const request = await Request.findOne({
          where: {id: user.id}
        })
        if (request.accepted == true){
            next();
        }
        else{
            res.status(400).json({
                error: "No eres el usuario"
            });
        }
      } catch(e){
        res.status(400).json({error: e});
      }
}

async function verifyAuthorizationEditRequests(req, res, next){
    const decodedToken = jwt.decode(req.body.token);
    try{
        const request = await Request.findOne({
          where: {id: req.params.id}
        })
        if (request.ride_driver == decodedToken.username){
            next();
        }
        else{
            res.status(400).json({
                error: "No eres el usuario"
            });
        }
      } catch(e){
        res.status(400).json({error: e});
      }
}

module.exports ={
    verifyToken,
    verifyUserEditionAuthorization,
    verifyAuthorizationRides,
    verifyAuthorizationRequests,
    verifyAuthorizationEditRequests,
}