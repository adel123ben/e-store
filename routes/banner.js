const bannerController = require('../controllers/banner');

module.exports = (express) => {
    const router = express.Router();
    router.post('/createBanner', bannerController.createBanner);
    router.put('/:id', bannerController.changeBanner);
    return router;
}