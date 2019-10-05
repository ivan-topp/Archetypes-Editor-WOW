const mongoose = require('mongoose');
const { Schema, model } = mongoose;
mongoose.set('useFindAndModify', false);
const ArchetypeSchema = new Schema({
    adl_version: {type: String, required: true},
    archetype_id: {type: Object, required: true},
    concept: {type: String, required: true},
    definition: {type: Object, required: true},
    description: {type:Object, required: true},
    is_controlled: {type: String, required:true},
    ontology: {type:Object, required:true},
    original_language: {type: Object, required: true},
    uid: {type: Object, required:true}
});

module.exports = model('Archetype', ArchetypeSchema);