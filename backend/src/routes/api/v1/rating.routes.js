const express =  require("express");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User, Rating } = require("../../../models");

// Middlewares
const { verifyToken, verifyUserEditionAuthorization } = require("../../../middlewares/errors/token");
const { validateName, validateEmail, validatePassword } = require("../../../middlewares/errors/users");

dotenv.config();
const SALT_ROUNDS = 5;

router.post("/new-rating", verifyToken);
router.post("/new-rating",  async (req, res) => {
    //if (validateAddUserInput(req.body)) {
    const decodedToken = jwt.decode(req.body.token);
    const user_reviewer = await User.findOne({
      where: {username: decodedToken.username}
    });

    //ver que tirarle
    const user_reviewed = await User.findOne({
        where: {username: req.body.user_reviewed}
    })

    try{
    const rating = await Rating.create({
      reviewed_id: user_reviewed.id,
      reviewer: user_reviewer.username,
      rating: req.body.rating,
    });

    let score_sum = 5;
    let n_scores = 1;

    const ratings_reviewed = await Rating.findAll({
        where: {reviewed_id: user_reviewed.id}
    });


    ratings_reviewed.map((score)=>(
        console.log(score.rating),
        score_sum += score.rating,
        n_scores += 1
    ));

    const score_result = score_sum/n_scores;

    var selector = {
        where: {id: user_reviewed.id}
    }
    user_reviewed.rating = score_result;
    console.log(user_reviewed);

    await user_reviewed.update({
		rating: score_result,
	});
	await user_reviewed.save();

    res.status(201).json(rating);
    } catch (e) {
      res.status(400).json({error: e});
    }
});

module.exports = router;