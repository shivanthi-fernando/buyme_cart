const Cart = require("../models/cart");
const { checkToken } = require('../middleware/auth/tokenvalidation')
const router = require("express").Router();

//Create Cart
router.post("/", checkToken, async(req, res) => {
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch (err){
        res.status(500).json(err);
    }
});

//Update Cart
router.put("/:id", async (req, res) => {
    try{
        const updateCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updateCart);
    }catch (err) {
        res.status(500).json(err);
    } 
});

//Delete
router.delete("/:id", async (req, res) => {
    try{
        await cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get User Cart
router.get("/find/:userId", async(req, res) => {
    try{
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get All
router.get("/", async (req, res) => {
    try{
        const carts = await Cart.find()
        res.status(200).json(carts);
    }catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router