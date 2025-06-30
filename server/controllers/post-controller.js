import models from "../models/index.js";

async function addPost(req, res, next) {
  try {
    const title = req.body.title;
    const description = req.body.description;

    const newPost = await models.Post.create({
      title: title,
      description: description,
      user_id: req.user.id,
    })

    res.status(200).json({
      post: newPost
    })
  } catch (err) {
    next(err);
  }
}

async function getAllPosts(req, res, next) {
  try {

    const posts = await models.Post.findAll({
      include: [{
        model: models.User,
        as: 'author',
        attributes: ['id', 'username', 'name', 'email']
      }]
    });

    res.status(200).json({
      posts: posts
    })

  } catch(err) {
    next(err);
  }
}

async function getPost(req, res, next) {
  try {

    const postId = req.params.pid;

    const post = await models.Post.findOne({
      where: {
        post_id: postId
      },
      include: [{
        model: models.User,
        as: 'author',
        attributes: ['id', 'username', 'name', 'email']
      }]
    })

    res.status(200).json({ post: post });
  
  } catch(err) {
    next(err);
  }
}

async function editPost(req, res, next) {
  try {

    const newTitle = req.body.newTitle;
    const newDesc = req.body.newDesc;

    const postId = req.params.pid;

    await models.Post.update({
      title: newTitle,
      description: newDesc
    }, {
      where: {
        user_id: req.user.id,
        post_id: postId,
      }
    })

    const editedPost = await models.Post.findByPk(postId);

    res.status(200).json({
      post: editedPost
    })

  } catch(err) {
    next(err);
  }
}

async function deletePost(req, res, next) {
  try {
    const postId = req.params.pid;

    await models.Post.destroy({
      where: {
        post_id: postId,
        user_id: req.user.id
      }
    })

    res.status(200).json({message: "Postare stearsa!"})
  } catch(err) {
    next(err);
  }
}

export default {
  addPost,
  getAllPosts,
  editPost,
  deletePost,
  getPost
}