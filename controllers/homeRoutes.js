const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Quest } = require('../models');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const questData = await Quest.findAll();

    const quests = questData.map((quest) => quest.get({ plain: true }));

    res.render('tavernboard', {
      quests,
      user: req.session.user,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/postquest', withAuth, async (req, res) => {
  try {
    res.render('post-quest', {
      user: req.session.user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const questData = await Quest.findByPk(req.params.id);

    const quest = questData.get({ plain: true });

    res.render('indiv-quest', {
      ...quest,
      user: req.session.user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
