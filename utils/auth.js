//authguard middleware function
const withAuth = (req, res, next) => {
    //if user is not logged in...
    if (!req.session.user_id) {
        //...redirect to login page
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;