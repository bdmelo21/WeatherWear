const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User');
const { Mongoose } = require('mongoose');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res) => {
  const {firstName, lastName, username, email, password} = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(password, salt);

  if(firstName === '' || lastName === '' || username === '' || email === '' || password === '') {
    res.render('auth/signup', 
    {
      errorMessage: 'All fields are required'
    });
    return;
  }
  User.findOne({'username': username})
  .then((user) => {
    if(user) {
      res.render('auth/signup', {
        errorMessage: 'Sorry, that username is already being used'
      });
      return;
    }
    User.create({firstName, lastName, username, email, password: hashPassword}
      .then(() => {
        res.render('/');
      })
      .catch((error) => {
        if(error.code === 11000) {
          res.status(500).
          render('auth/signup', {
            errorMessage: 'Something it\'s not properly filled out'
          })
        }
      })
   );
});




router.get('/login', (req, res) => {
  res.render('auth/login')
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;
  if(!username || !password) {
    res.render('auth/login', {
      errorMessage: 'Please enter both username and password'
    });
    return;
  }
  User.findOne({'username': username})
  .then((user) => {
    if(!user) {
      res.render('auth/login', {
        errorMessage: 'Invalid login'
      })
      return;
    }
    if(bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;

      res.redirect('/dashboard');
    } else {
      res.render('auth/login', {
        errorMessage: 'Invalid login'
      });
    }
  });
});
});


router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/')
})





module.exports = router;

