const express = require("express");
const UserModel = require("../models/UserModel");
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authentication = require("../middlewares/authentication");
const saltRounds = 3;

userRouter.get("/", async (req, res) => {
    try {
        const data = await UserModel.find();
        res.status(200).json({ msg: "list of users", data });
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong while getting list of users", error })
    }
})

userRouter.post("/register", async (req, res) => {
    const payload = req.body;
    try {
        const data = await UserModel.findOne({ email: payload.email });
        if (data) {
            res.status(200).json({ msg: "User already exists please login Now" });
        }
        else {
            bcrypt.hash(payload.password, saltRounds, async (err, hashed) => {
                if (err) {
                    res.status(400).json({ msg: "Something went wrong1", err })
                }
                else if (hashed) {
                    payload.password = hashed;
                    const user = new UserModel(payload);
                    await user.save();
                    res.status(201).json({ msg: "user registered successfully" });
                }
            })
        }
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong while registering", error })
    }
});

userRouter.post("/login", async (req, res) => {
    const payload = req.body;
    try {
        const data = await UserModel.findOne({ email: payload.email });
        if (data) {
            bcrypt.compare(payload.password, data.password, async (err, result) => {
                if (!result) {
                    res.status(400).json({ msg: "wrong password" });
                }
                else if (err) {
                    res.status(400).json({ msg: "Something went wrong1", err });
                }
                else if (result) {
                    jwt.sign({ userID: data._id }, "rajSecretApp", async (err, token) => {
                        if (err) {
                            res.status(400).json({ msg: "Something went wrong2", err });
                        }
                        else if (token) {
                            res.status(201).json({ msg: "Login Successful", token });
                        }
                    })
                }
            })
        }
        else {
            req.status(404).json({ msg: "Email not registered" })
        }
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong while login", error })
    }
});


userRouter.get("/:id/friends", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await UserModel.findOne({ _id: id });
        const friends = data.friends;
        if (friends.length) {
            res.status(200).json({ msg: `All friends of ${data.name} are 👇`, friends });
        }
        else {
            res.status(200).json({ msg: `No friends yet` });

        }
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong while getting list of your all friends", error })
    }
})

userRouter.post("/:id/friends", authentication, async (req, res) => {
    const id = req.params.id; // id of receiver
    const userID = req.body.user; // id of sender

    try {
        const data = await UserModel.findOne({ _id: id });
        let friendRequests = data.friendRequests;
        friendRequests.push(userID);
        await UserModel.findByIdAndUpdate({_id:id},data);
        res.status(201).json({msg:"friend request sent successfully"});
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong while getting list of your all friends", error })
    }
})

// userRouter.patch("/:id/friends", authentication, async (req, res) => {
//     const id = req.params.id; // id of receiver
//     const userID = req.body.user; // id of sender

//     try {
//         const data = await UserModel.findOne({ _id: id });
//         let friendRequests = data.friendRequests;
//         friendRequests.push(userID);
//         await UserModel.findByIdAndUpdate({_id:id},data);
//         res.status(201).json({msg:"friend request sent successfully"});
//     } catch (error) {
//         res.status(400).json({ msg: "Something went wrong while getting list of your all friends", error })
//     }
// })



module.exports = userRouter;