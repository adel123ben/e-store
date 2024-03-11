const formulaireController = require("../controllers/formulaire");

module.exports = (express) => {
    const router = express.Router();
    router.post("/createFormulaire", formulaireController.createFormulaire);
    router.get("/", formulaireController.showFormulaires);
    return router;
}