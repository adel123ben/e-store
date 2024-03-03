const categoryController = require('../controllers/category');
module.exports = (express) => {
    const router = express.Router();
    router.post('/createCategory', categoryController.createCategory);
    router.get('/', categoryController.getCategories);
    return router;
}