const postRouter = require('express').Router();
const { Post, User } = require('../db/models');

postRouter.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['name'],
      },
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

postRouter.post('/', async (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ message: 'You are not authorized to create a post' });
    return;
  }
  try {
    const post = await Post.create({
      text: req.body.text,
      uId: req.session.user.id,
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

postRouter.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post.uId !== req.session.user.id) {
      res.status(401).json({ message: 'You are not authorized to delete this post' });
    } else {
      await post.destroy();
      res.json({ message: 'Post deleted' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

postRouter.patch('/:id', async (req, res) => {
  try {
    await Post.update({ value: req.body.value }, { where: { id: req.params.id } });
    const sendUpdated = await Post.findByPk(req.params.id);
    res.status(200).json(sendUpdated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = postRouter;
