const config = require("../config.json");
let mongoose = require('mongoose');

// Define schema for `stream` database collection
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
    watch_key: String,
    date: String
});

StreamSchema.plugin(require('mongoose-autopopulate'));
StreamSchema.pre('save', function(next) {
    var stream = this;
    if (!stream.isModified('watch_key')) return next();
    stream.watch_key = Math.random().toString(36).replace('0.', '') ;
    next();
});
let Stream = mongoose.model('Stream', StreamSchema);

module.exports = Stream;
