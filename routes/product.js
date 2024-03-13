const productController = require("../controllers/product");
const upload = require("../middleware/upload");
module.exports = (express) => {
    const router = express.Router();
 router.post("/createProduct",upload.single('image'), productController.createProduct);
    router.get("/", productController.getProducts);
    router.put("/:id", upload.single('image'), productController.updateOneProduct);
    router.delete("/:id", productController.deleteProduct);
    router.get("/:id", productController.getProductWithId);
    return router;
}