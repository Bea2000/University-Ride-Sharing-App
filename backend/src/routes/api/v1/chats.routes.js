const express = require("express");
const { verifyToken } = require("../../../middlewares/errors/token");
const router = express.Router();
const { Chat, Ride, User, Message } = require("../../../models");
const jwt = require("jsonwebtoken");

const app = require("../../../app")

// Create
router.post("/", verifyToken)
router.post("/", async (req, res) => {
    try {
        const decodedToken = jwt.decode(req.body.token);
        // console.log(decodedToken.username)
        const driver = await User.findOne({
            where: { username: decodedToken.username}
        });
        // console.log(driver.toJSON());
        const chat = await Chat.create({
            name: driver.username + "-ride",
            userId: driver.id,
            rideId: req.body.rideId
        });
        res.status(201).json(chat);
    } catch(e) {
        // console.log(e);
        res.status(400).send({"error": e});
    }
})


// Read
// Entregamos los mensajes asociados al chat
router.get("/:id", async (req, res) => {
	const chat = await Chat.findOne({
		where: { rideId: req.params.id },
	});
	if (!chat) {
		res.status(404).json({ error: "Chat no existe" });
	} else {
        const messages = await Message.findAll({
            where: { chatId: chat.id }
        })
        // console.log(messages);
        // io.emit(messages);
		res.status(200).json(messages);
        // Aqui emitimos los mensajes con io
	}
});


// Delete
router.delete("/", async (req, res) => {
    const chat = await Chat.findOne({
		where: { id: req.body.chatId },
	});
	if (!chat) {
		res.status(404).json({ error: "Chat no existe" });
	} 
	else {
		await chat.destroy();
		res.status(200).json(chat);
	}
})


module.exports = router;