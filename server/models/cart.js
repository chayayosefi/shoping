const { Schema, model } = require('mongoose')

const cartSchema = new Schema({
    creationDate: {
        type: Date,
        default: Date.now
    },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    products: [
        {
            productId: { type: Schema.Types.ObjectId, ref: "prouct" },
            quantity: Number,
            priceByProduct: Number
        }
    ],
    finalPrice: Number,
})

const Cart = model('cart', cartSchema)
module.exports = Cart