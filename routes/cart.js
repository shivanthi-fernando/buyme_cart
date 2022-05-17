const Cart = require("../models/cart");
const { checkToken } = require('../middleware/auth/tokenvalidation')
const { GetProductDetailsEvent } = require("../middleware/events/events");
const router = require("express").Router();

//Create Cart 
router.post("/add-cart-item", checkToken, async (req, res) => {

    try {

        //checkproduct already in cart
        let is_exists = await Cart.findOne({ userId: req.user.userID, 'products._id': req.body.product_id });

        if (is_exists){
            res.status(500).json({ err: 'Item already in the cart', success: false })
        }

        //get product details
        let payload = {
            event: 'GET_PRODUCT',
            data: {
                product_id: req.body.product_id
            }

        };
        let product_obj = null;
        let product_respond = await GetProductDetailsEvent(payload);
        if (product_respond.status == 200) {
            let obj = {
                _id: product_respond.data.data._id,
                title: product_respond.data.data.title,
                desc: product_respond.data.data.desc,
                img: product_respond.data.data.img,
                categories: product_respond.data.data.categories,
                size: product_respond.data.data.size,
                color: product_respond.data.data.color,
                price: product_respond.data.data.price,
                quantity: product.quantity
            }
            product_obj = obj;

        } else {
            res.status(500).json({ err: 'Error occured in product module. Please try again later', success: false })
        }

        await Cart.create({
            userId: req.user.userID,
            product: product_obj,
        })

        res.status(200).json({msg:'products added to cart',success:true});
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update Cart
router.put("/edit-cart-item", checkToken, async (req, res) => {
    try {

        //checkproduct already in cart
        let cart = await Cart.findById(cart_id);

        if (!cart) {
            res.status(500).json({ err: 'Item not found in the cart', success: false })
        }

        await Cart.findByIdAndUpdate(req.body.cart_id, {
            'product.quantity': req.body.quantity
        })

    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete
router.delete("/delete-cart-item/:id", checkToken, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get All
router.get("/get-all-cart-items", checkToken, async (req, res) => {
    try {
        const carts = await Cart.find({ userId: req.user.userId })
        res.status(200).json({ data: carts, success: true });
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router