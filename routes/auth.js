const authController = require("../controllers/auth");

module.exports = (express) => {
    const router = express.Router();
    router.post("/register", authController.register);
    router.post("/login", authController.login);
    return router;
}