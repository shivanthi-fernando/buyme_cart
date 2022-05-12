const router = require("express").Router();

router.get("/cart_test", (req, res) => {
    res.send("Cart Test is Successful");
});

module.exports = router