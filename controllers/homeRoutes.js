const router = require('express').Router();

//if already logged in, redirect to home
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  
  router.get('/', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/login')
        //if already logged in, default to displaying NC info and posts
    } else res.redirect('/api/state/33')
  })

  router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/')
    } else res.render('signup')
  })
module.exports = router;