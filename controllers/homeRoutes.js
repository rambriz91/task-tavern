const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Quest, User, Badge, UserQuest } = require('../models');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const questData = await Quest.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
          // through: UserQuest,
        },
      ],
    });
    const quests = questData.map((quest) => quest.get({ plain: true }));
    console.log(quests);
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
router.get('/activequests', withAuth, async (req, res) => {
  res.render('viewQuest', {
    user: req.session.user,
    logged_in: req.session.logged_in,
  });
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

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        id: req.session.user.id,
      },
      include: [
        {
          model: Badge,
          attributes: [
            'id',
            'badge_title',
            'badge_description',
            'icon',
            'user_id',
          ],
        },
      ],
    });
    const userProfile = userData.get({ plain: true });
    console.log(userProfile); // This will log the user data with associated badges.
    res.render('profile', {
      ...userProfile,
      user: req.session.user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/sign-up', async (req, res) => {
  res.render('sign-up');
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const questData = await Quest.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
    });

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

module.exports = router;
