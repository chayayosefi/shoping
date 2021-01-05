const router = require('express').Router()
const Product = require('../models/product')


router.get('/:categoryId', async (req, res) => {
    if (req.params.categoryId) {
        try {
            const result = await Product.find({ categoryId: req.params.categoryId })
            res.json(result)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})


router.get('/search/:text', async (req, res) => {
    if (req.params.text) {
        try {
            const result = await Product.find({ "name": { "$regex": req.params.text, "$options": "i" } },)
            res.json(result)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({ error: true, msg: "missing some info" })
    }
})




module.exports = router