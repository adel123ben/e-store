const sizeCetegoryController = require('../controllers/sizeCategory');

module.exports = (express) => {
    const router = express.Router();
    router.post('/createSizeCategory', sizeCetegoryController.createSizeCategory);
    router.get('/', sizeCetegoryController.getSizes);
    return router
}