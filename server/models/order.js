const { Schema, model } = require('mongoose')
// const { schema } = require('./user')
// const { schema } = require('./cart')

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    cartId: { type: Schema.Types.ObjectId, ref: "cart" },
    finalPrice: Number,
    city: String,
    street: String,
    deliveryDate: Date,
    creationDate: {
        type: Date,
        default: Date.now
    },
    last4DigitsOfCredit: String,
})

const Order = model('order', orderSchema)
module.exports = Order



