const db = require('../models');
const Post = db.posts;
const User = db.users;
// const {Op} = require('sequelize');

// util function to add all posts
exports.addAllPostsToUser = async (req, res, next) => {
    try {
        let userRes = await User.findOne({
            where: {
                username: 'Mark Nienaber',
            },
        });
        let postRes = await Post.findAll();
        // Seq. utitlity function
        await userRes.addPosts(postRes);

        return res.status(200).json({
            message: `All posts added to user: ${userRes}`,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

//util function to count all posts
exports.countAllPosts = async (req, res, next) => {
    try {
        let userRes = await User.findOne({
            where: {
                username: 'Mark Nienaber',
            },
        });

        // Seq. utitlity function
        let countRes = await userRes.countPosts();

        return res.status(200).json({
            message: `Count of posts added to user`,
            count: countRes,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

//util function to remove post (deletes the FK not the record)
exports.removePost = async (req, res, next) => {
    try {
        let userRes = await User.findOne({
            where: {
                username: 'Mark Nienaber',
            },
        });
        // findOne with no parameter returns the first entry in the table
        let postRes = await Post.findOne();
        // Seq. utitlity function
        await userRes.removePost(postRes);

        return res.status(200).json({
            message: `Post removed`,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

//util function to remove posts (deletes the FK not the records)
exports.removeAllPosts = async (req, res, next) => {
    try {
        let userRes = await User.findOne({
            where: {
                username: 'Mark Nienaber',
            },
        });
        // findOne with no parameter returns the first entry in the table
        let postRes = await Post.findAll();
        // Seq. utitlity function
        await userRes.removePosts(postRes);

        return res.status(200).json({
            message: `All Posts removed`,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};
