const formulaireController = require("../controllers/formulaire");

module.exports = (express) => {
    const router = express.Router();
    router.post("/createFormulaire", formulaireController.createFormulaire);
    router.get("/", formulaireController.showFormulaires);
    router.put("/:id", formulaireController.changeFormulaire);
    router.get("/getTotalOrders", formulaireController.getTotalOrders);
    return router;
}