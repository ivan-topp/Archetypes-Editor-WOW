const { Router } = require('express');
const router = Router();

const Archetype = require('../models/archetype');

router.get('/', async (req, res) => {
    const archetypes = await Archetype.find();
    res.json(archetypes);
});

router.post('/', async (req, res) => {
    const archetypes = await Archetype.find();
    let exists = false;
    archetypes.forEach(function(archetype) {
        if(archetype.archetype_id.value === req.body.archetype_id.value){
            exists = true;
        }
    });
    if(exists === false){
        const newArchetype = new Archetype(req.body);
        await newArchetype.save((err) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, _id: newArchetype._id});
        });
    } else {
        return res.json({ success: false});
    }
});

router.put('/', async (req, res) => {
    const archetypeUpdated = await Archetype.findOneAndUpdate(
        {
            _id: req.body._id
        },
        req.body.data
    );
    if(archetypeUpdated){
        res.json({success: true});
    }
});

router.delete('/:id', async (req, res) => {
    await Archetype.findByIdAndDelete(req.params.id);
    res.json({ message: 'Archetype Deleted' });
});

module.exports = router;