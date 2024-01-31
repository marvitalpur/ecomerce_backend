const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUsers } = require("../middleware/Auth");

const router = express.Router()

router.route("/products").get(isAuthenticatedUsers, getAllProducts);

router.route("/product/new").post(createProduct);

router.route("/products/:id").put(updateProduct);

router.route("/products/:id").delete(deleteProduct);

router.route("/products/:id").get(getProductDetails);


module.exports = router;