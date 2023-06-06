const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
        text: String,
        image: String,
        createdAt: Date,
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }],
        comments: [{
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
            text: String,
            createdAt: Date
        }]
    }
)

const PostModel = mongoose.model("post", postSchema);

module.exports = PostModel;
