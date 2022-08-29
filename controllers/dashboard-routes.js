const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            //use ID from session
            user_id: req.session.user_id
        },
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'title', 'post_text', 'createdAt'],
        include: {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'createdAt'],
            include: {
                model: User,
                attributes: ['username']
            }
        } 
    })
    .then(dbPostData => {
        //serialize data
        const posts = dbPostData.map(post => post.get({ plain: true }));
        //post to dashboard
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//route to edit post by id
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post_text', 'createdAt'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        //serialize data
        const post = dbPostData.get({ plain: true });

        //passing data to single post template
        res.render('edit-post', { post, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });   
});

module.exports = router;