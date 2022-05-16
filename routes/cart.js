const Cart = require("../models/cart");
const router = require("express").Router();

//Create Cart
router.post("/", async(req, res) => {
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch (err){
        res.status(500).json(err);
    }
});

module.exports = router