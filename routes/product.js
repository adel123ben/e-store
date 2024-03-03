const productController = require("../controllers/product");

module.exports = (express) => {
    const router = express.Router();
 router.post("/createProduct", productController.createProduct);
    router.get("/", productController.getProducts);
    router.put("/:id", productController.updateProduct);
    router.delete("/:id", productController.deleteProduct);
    router.get("/:id", productController.getProductWithId);
    return router;
}