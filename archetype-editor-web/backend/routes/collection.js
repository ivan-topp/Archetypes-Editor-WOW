const { Router } = require('express');
const router = Router();

const Collection = require('../models/collection');

router.get('/', async (req, res) => {
    const collections = await Collection.find();
    res.json(collections);
});

router.post('/', async (req, res) => {
    const newCollection = new Collection(req.body);
    await newCollection.save();
    res.json({ message: 'Collection Saved' });
});

router.delete('/:id', async (req, res) => {
    await Collection.findByIdAndDelete(req.params.id);
    res.json({ message: 'Collection Deleted' });
});

module.exports = router;