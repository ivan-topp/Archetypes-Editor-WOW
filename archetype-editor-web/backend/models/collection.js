const { Schema, model } = require('mongoose');

const CollectionSchema = new Schema({
    title: { type: String, required: true },
    data: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = model('Collection', CollectionSchema);