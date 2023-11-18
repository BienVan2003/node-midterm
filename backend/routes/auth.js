const router = require("express").Router();
const authController = require('../controllers/AuthController');
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/allusers/:id", authController.getAllUsers);
router.get("/logout/:id", authController.logOut);

module.exports = router;