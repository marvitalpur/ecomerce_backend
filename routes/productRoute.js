const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUsers, authorizedRoles } = require("../middleware/Auth");

const router = express.Router()

router.route("/products").get(isAuthenticatedUsers, authorizedRoles("admin"), getAllProducts);

router.route("/product/new").post(createProduct);

router.route("/products/:id").put(isAuthenticatedUsers, authorizedRoles("admin"), updateProduct);

router.route("/products/:id").delete(isAuthenticatedUsers, authorizedRoles("admin"), deleteProduct);

router.route("/products/:id").get(isAuthenticatedUsers, authorizedRoles("admin"), getProductDetails);


module.exports = router;