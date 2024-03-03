const Banner = require("../models/banner");

exports.createBanner = async (req, res) => {
    try {
       const {image, title} = req.body;
       const banner = new Banner({image, title});
       await banner.save();
       res.status(201).send(banner);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.changeBanner = async (req, res) => {
    try {
        const id = req.params.id;
        const {image, title} = req.body;
        const banner = await Banner.findByIdAndUpdate(id, {image, title});
        res.status(200).send(banner);
    } catch (error) {
        res.status(500).send(error);
    }
}