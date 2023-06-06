const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: String,
    email: String,
    password: String,
    dob: Date,
    bio: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PostModel' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }]

})

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
