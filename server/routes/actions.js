const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');

const User = require('../models/user')
const Product = require('../models/product')
const Order = require('../models/order')
const Category = require('../models/category')

// REGISTER A
router.post('/register', async (req, res) => {
    const { user_id } = req.body
    if (user_id) {
        try {
            const answer = await User.find({ user_id })
            if (answer.length === 0) {
                res.status(201).json({ error: false, msg: "user id does not exist in the system, you can move on to the next step" })
            } else {
                res.status(201).json({ error: true, msg: "An existing user id in the system" })
            }
        } catch (error) {
            res.status(500)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})

// REGISTER B
router.post('/registerB', async (req, res) => {
    const { f_name, l_name, email, user_id, password, city, street } = req.body
    if (f_name && l_name && email && user_id && password && city && street) {
        try {
            const salt = genSaltSync(10)
            const hash = hashSync(password, salt)
            const newUser = new User({ f_name, l_name, email, user_id, password: hash, city, street, role: "user" })
            await newUser.save()
            let access_token = jwt.sign({ user_id, f_name, role: newUser.role }, "BlAh", {
                expiresIn: "10m"
            })
            const answer = await User.find({ user_id })
            res.status(201).json({ error: false, msg: "username added successfully", access_token, answer })
        } catch (error) {
            res.status(500)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    // data exist
    if (email && password) {
        // user exist
        try {
            const answer = await User.find({ email })
            if (answer.length === 0) {
                res.status(401).json({ error: true, msg: "email not found" })
            } else {
                if (compareSync(password, answer[0].password)) {
                    let access_token = jwt.sign({ user_id: answer[0].user_id, f_name: answer[0].f_name, role: answer[0].role }, "BlAh", {
                        expiresIn: "10m"
                    })
                    res.status(200).json({ error: false, msg: "user login successfully", access_token, answer })
                } else {
                    res.status(200).json({ error: true, msg: "wrong password" })
                }
            }
        } catch (error) {
            res.status(401)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})


router.get('/allProducts', async (req, res) => {
    try {
        const result = await Product.count({})
        res.json(result)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/allOrders', async (req, res) => {
    try {
        const result = await Order.count({})
        res.json(result)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/allCountDate/:deliveryDate', async (req, res) => {
    const deliveryDate = req.params.deliveryDate
    try {
        const result = await Order.find({ deliveryDate })
        if (result.length < 3) {
            res.status(200).json({ error: false, msg: true })
        } else {
            res.status(200).json({ error: false, msg: false })
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/allCategory', async (req, res) => {
    try {
        const result = await Category.find({})
        res.json(result)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/products/all', async (req, res) => {
    try {
        const result = await Product.find({})
        res.json(result)
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router