const express = require("express");
const { verifyToken } = require("../../../middlewares/errors/token");
const router = express.Router();
const { Chat, Message, User } = require("../../../models");
const jwt = require("jsonwebtoken");


// Create
router.post("/", async (req, res) => {
    try {
        const decodedToken = jwt.decode(req.body.token);
        const user = await User.findOne({
            where: { username: decodedToken.username }
        });
        const message = await Message.create({
            body: req.body.content,
            userId: user.id,
            user: user.username,
            chatId: req.body.chatId,
        });
        res.status(201).json(message);
    } catch(e) {
        console.log(e);
        res.status(400).send({"error": e});
    }
})


// Delete
router.delete("/", verifyToken);
router.delete("/", async (req, res) => {
	const message = await Message.findOne({
		where: { id: req.body.messageId },
	});
	if (!message) {
		res.status(400).json({ error: "Mensaje no existe" });
	} 
	else {
		await message.destroy();
		res.status(200).json(message);
	}
});

module.exports = router;