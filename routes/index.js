var express = require('express');
var router = express.Router();

const articleController = require('../controllers/articleController.js');
const commentController = require('../controllers/commentController.js');

/* GET home page. */
router.get('/', (req, res) => {
  res.redirect('/article')
});

router.get('/article/', articleController.displayAll);
router.get('/article/add', articleController.renderAddForm);
router.post('/article/add', articleController.addArticle);
router.get('/article/:articleId', articleController.displayArticle);

router.get('/article/:articleId/edit', articleController.renderEditForm);
router.post('/article/:articleId/update', articleController.updateArticle);
router.get('/article/:articleId/delete', articleController.deleteArticle);
router.post('/article/:articleId/comment/create', commentController.createComment);
router.post('/comment/:commentId/reply/create', commentController.addReply);

module.exports = router;
