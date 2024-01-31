
const Product = require("../models/productModels");
const ErrorHnadler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/ApiFeature")
// create products --Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.body
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
})
//Get  all products -- Admin
exports.getAllProducts = catchAsyncError(async (req, res) => {

    const resultPerPage = 5;
    const productcount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(),
        req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const products = await apiFeatures.query;
    // const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
        productcount
    })
})
// get Single Produst -- Admin
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHnadler("Product not found ", 400))
    }
    res.status(200).json({
        success: true,
        message: "Product Details"
    })
})
// update Product ==admin
exports.updateProduct = catchAsyncError(async (req, res) => {
    let product = Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: true,
            message: "product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product

    })
})
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHnadler("Product not fount ", 404))
    }
    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
})

