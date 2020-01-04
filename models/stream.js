const config = require("../config.json");
let mongoose = require('mongoose');
let autopopulate = require('mongoose-autopopulate');

// Define schema for `user` database collection
let StreamSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    desc: String,
    stream_key: String,
    date: String
});

// Load plugin to automatically populate nested queries
StreamSchema.plugin(autopopulate);

let Stream = mongoose.model('Stream', StreamSchema);

module.exports = User;
