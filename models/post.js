let mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    body: String,
    tagged:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    link: String,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    date: String
});

PostSchema.plugin(require('mongoose-autopopulate'));

let Post = mongoose.model('Post', PostSchema);

module.exports = Post;
