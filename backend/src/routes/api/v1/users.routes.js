const express =  require("express");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User } = require("../../../models");

// Middlewares
const { verifyToken, verifyUserEditionAuthorization } = require("../../../middlewares/errors/token");
const { validateName, validateEmail, validatePassword } = require("../../../middlewares/errors/users");

dotenv.config();
const SALT_ROUNDS = 5;

// Users

// Create
router.post("/sign-up/", validateName);
router.post("/sign-up/", validateEmail);
router.post("/sign-up/", validatePassword);
router.post("/sign-up/", async (req, res) => {
	try {
		const existingUser = await User.findOne({
			where: { username: req.body.username },
		});
		if (existingUser) {
			res.status(400).json({error: "Username en uso"});
		} else {
			const hashedPassword = await bcrypt.hash(
				req.body.password,
				SALT_ROUNDS
			);
			const user = await User.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				username: req.body.username,
				email: req.body.email,
				password: hashedPassword,
				img: req.body.img,
				rating: 5,
			});
			res.status(201).json(user);
		}
	} catch(e) {
		res.status(400).json({ error: e });
	}
});

// perfil
router.post("/profile", verifyToken);
router.post("/profile", async (req, res) => {
	const decodedToken = jwt.decode(req.body.token);
    const user = await User.findOne({
        where: {username: decodedToken.username}
    })
	console.log(user);
	if (!user) {
		res.status(404).json({ error: "Usuario no existe" });
	} else {
		res.status(200).json(user);
	}
});

// Update
router.put("/", verifyToken);
router.put("/", verifyUserEditionAuthorization);
router.put("/", validatePassword);
router.put("/", async (req, res) => {
	// Search for modified user
	const user = await User.findOne({
		where: { username: req.body.username },
	});
	if (!user) {
		res.status(404).json({ error: "Usuario no existe" });
	} 
	else {
		const hashedPassword = await bcrypt.hash(
			req.body.password,
			SALT_ROUNDS
		);
		await user.update({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});
		await user.save();
		res.status(200).json(user);
	}
});


// Delete
router.delete("/", verifyToken);
router.delete("/", verifyUserEditionAuthorization);
router.delete("/", async (req, res) => {
	const user = await User.findOne({
		where: { username: req.body.username },
	});
	if (!user) {
		res.status(400).json({ error: "Usuario no existe" });
	} 
	else {
		await user.destroy();
		res.status(200).json(user);
	}
});

// Login
router.post("/login/", async (req, res) => {
	const user = await User.findOne({
		where: { username: req.body.username },
	});
	console.log("user", user);
	if (!user) {
		res.status(400).json({ error: "El usuario y la contraseña no coinciden" });
	} else {
		const correctPassword = bcrypt.compareSync(req.body.password, user.password);
		if (correctPassword) {
			const token = jwt.sign(
				{
					username: user.username,
				},
				process.env.SECRET_KEY,
				{
					expiresIn: "1800s",
				}
			);
			res.status(200).json({ token, token });
		} else {
			res
				.status(400)
				.json({ error: "El usuario y la contraseña no coinciden" });
		}
	}
});

module.exports = router;
