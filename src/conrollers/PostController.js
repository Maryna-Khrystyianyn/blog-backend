import Post from "../models/Post.js";

const createPost = async (req, res, next) => {
  try {
    const doc = new Post({
      title: req.body.title,
      thema: req.body.thema,
      content: req.body.content,
      imgUrl: req.body.imgUrl,
      tags: req.body.tags,
      author: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const allPost = await Post.find().populate("author").exec();
    allPost.length > 0 ? res.status(200).json(allPost) : res.sendStatus(404);
  } catch (e) {
    next(e);
  }
};

const getOne = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const doc = await Post.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { new: true }
    );

    if (!doc) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(doc);
  } catch (e) {
    next(e);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Article not found" });
    }
    if (post.author.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Delete post ferbinden" });
    }
    await post.deleteOne();
    return res.status(200).json({ message: "success delete", post: post });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Article not found" });
    }
    if (post.author.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Delete post ferbinden" });
    }
    await post.updateOne(req.body);
    const updatedPost = await Post.findById(postId);
    return res
      .status(200)
      .json({ message: "success updated!", post: updatedPost });
  } catch (e) {
    next(e);
  }
};

export const request = {
  createPost,
  getAll,
  getOne,
  deleteOne,
  update,
};
