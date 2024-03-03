const colorsCategoryController = require('../controllers/colorsCategory');

module.exports = (express) => {
    const router = express.Router();
    router.post('/createColorsCategory', colorsCategoryController.createColorsCategory);
    router.get('/', colorsCategoryController.getColorsCategories);
    return router
}