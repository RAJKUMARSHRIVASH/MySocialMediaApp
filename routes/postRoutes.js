const express = require("express");
const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");
const authentication = require("../middlewares/authentication");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
    try {
        const data = await PostModel.find();
        if (data.length) {
            res.status(200).json({ msg: "Here all the posts are", data });
        }
        else {
            res.status(200).json({ msg: "No posts yet" });
        }

    } catch (error) {
        res.status(400).json({ msg: "Something went wrong while getting list of Posts", error })

    }
})

postRouter.post("/", authentication, async (req, res) => {
    const payload = req.body;
    payload.createdAt = new Date().getTime();

    try {
        const post = new PostModel(payload);
        await post.save();
        // await UserModel.findByIdAndUpdate({_id:req.body.user},{posts:[{}]})
        res.status(201).json({ msg: "Posted Successfully" })

    } catch (error) {
        res.status(400).json({ msg: "Something went wrong while Posting", error })

    }
})

postRouter.patch("/:id", authentication, async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    try {
        await PostModel.findByIdAndUpdate({ _id: id }, payload);
        res.status(200).json({ msg: "Post updated Successfully", statuscode: 204 });

    } catch (error) {
        res.status(400).json({ msg: "Something went wrong while updating", error });

    }
})

postRouter.delete("/:id", authentication, async (req, res) => {
    const id = req.params.id;
    const userID = req.body.user;

    try {
        await PostModel.findByIdAndDelete({ _id: id, userID });
        res.status(202).json({ msg: "Post deleted Successfully" });

    } catch (error) {
        res.status(400).json({ msg: "Something went wrong while deleting", error });

    }
})

postRouter.post("/:id/like", authentication, async (req, res) => {
    const id = req.params.id;
    const userID = req.body.user;
    try {
        let post = await PostModel.findById({ _id: id });
        post.likes.push(userID);
        await PostModel.findByIdAndUpdate({ _id: id }, post);
        res.status(201).json({ msg: "Post liked" });

    } catch (error) {
        res.status(400).json({ msg: "Something went wrong while liking the post", error });

    }
})

postRouter.post("/:id/comment", authentication, async (req, res) => {
    const id = req.params.id;
    const userID = req.body.user;
    const payload = req.body;
    payload.user = userID,
        payload.createdAt = new Date().getTime();

    try {
        let post = await PostModel.findById({ _id: id });
        post.comments.push(payload);
        await PostModel.findByIdAndUpdate({ _id: id }, post);
        res.status(201).json({ msg: "comment successful" });

    } catch (error) {
        res.status(400).json({ msg: "Something went wrong while commenting the post", error });

    }
})

postRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const post = await PostModel.find({ _id: id });

        res.status(200).json({ msg: "here is the post that you are searching for",post });

    } catch (error) {
        res.status(400).json({ msg: "Something went wrong while getting the post", error });

    }
})

module.exports = postRouter;