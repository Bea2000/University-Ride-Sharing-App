// Middleware usuarios

function validateEmail(req, res, next) {
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email);
    if (validEmail) {
        next();
    } else {
        res.status(400).json({
            error: "Formato email invalido"
    })
    }
};


function validateName(req, res, next) {
    const validUsername = req.body.username && req.body.username.length >= 2;
    const validFirstName = req.body.firstName && req.body.firstName.length >= 2;
    const validLastName = req.body.lastName && req.body.lastName.length >= 2;

    if (validUsername && validFirstName && validLastName) {
        next();
    } else {
        res.status(400).json({
            error: "Formato nombre invalido"
        });
    }

};


function validatePassword(req, res, next) {
    const validPassword = req.body.password === req.body.passwordConfirmation;

    if (validPassword) {
        next();
    } else {
        res.status(400).json({
            error: "Contraseñas no coinciden"
        });
    }
}
  
module.exports = { validateEmail, validateName, validatePassword };