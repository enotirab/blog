const {Article, Comment, Reply} = require('../models');

module.exports.displayAll = async (req, res) => {
    const articles = await Article.findAll({
        include: 'author'
    });

    res.render('articles/view_all', {
        articles
    })
}

module.exports.displayArticle = async (req, res) => {

    const article = await Article.findByPk(req.params.articleId, {
        include: [
            'author',
            {
                model: Comment,
                as: 'comments',
                required: false,
                include: [
                    {
                        model: Reply,
                        as: 'replies',
                        required: false,
                    }
                ]
            }
        ],
        order: [
            ['comments', 'createdAt', 'desc']
        ]
    });

    res.render('articles/view', {
        article,
    });
};

module.exports.renderAddForm = (req, res) => {
    const article = {
        title: '',
        image_url: '',
        hook_text: '',
        body: '',
    };

    res.render('articles/add',{
        article
    });
};

module.exports.addArticle = async (req, res) => {

    const article = await Article.create({
        title: req.body.title,
        hook_text: req.body.hook_text,
        image_url: req.body.image_url,
        body: req.body.body,
        author_id: 1,//todo: get this from user,
        published_on: new Date()
    }, );

    res.redirect(`/article/${article.id}`);
}


module.exports.renderEditForm = async (req, res) => {
    const article = await Article.findByPk(req.params.articleId);

    res.render('articles/edit',{
        article
    });
}

module.exports.updateArticle = async (req, res) => {

    await Article.update({
        title: req.body.title,
        hook_text: req.body.hook_text,
        image_url: req.body.image_url,
        body: req.body.body,
    }, {
        where: {
            id: req.params.articleId,
        }
    });

    res.redirect(`/article/${req.params.articleId}`);
}


module.exports.deleteArticle = async (req, res) => {
   await Article.destroy({
       where: {
           id: req.params.articleId
       }
   });

   res.redirect('/');
}
