const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true
    },

    description: {
        type: String,
        required: [true, "Please Enter Product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price "],
        maxlength: [8, "Please cannot exceed 8 character"]
    },
    rating: {
        type: Number,
        default: 0,

    },
    images: [
        {
            public_id: {
                type: String,
                required: true,

            },
            url: {
                type: String,
                required: true,
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please Enter product category"]

    },
    Stock: {
        type: Number,
        required: [true, "Please enter product Stock"],
        maxlength: [4, "Stock cannot exceed 4 characters"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0

    },
    reviews: [
        {
            name: {
                type: String,
                required: true

            },
            rating: {
                type: Number,
                required: true,

            },
            Comment: {
                type: String,
                required: true

            }
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Product", productsSchema)