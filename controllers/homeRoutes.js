const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Quest, User, Badge } = require('../models');

// Root route displays all Quests on the tavernboard
router.get('/', withAuth, async (req, res) => {
  try {
    const questData = await Quest.findAll({
      where: {
        isTaken: false,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
    });
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
//Displays the Users active quests
router.get('/activequests', withAuth, async (req, res) => {
  try {
    const userQuestData = await User.findOne({
      where: {
        id: req.session.user.id,
      },
      include: [
        {
          model: Quest,
        },
      ],
    });
    const userQuests = userQuestData.get({ plain: true });
    res.render('viewQuest', {
      ...userQuests,
      user: req.session.user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Route for individual user quests.
router.get('/activequests/:id', withAuth, async (req, res) => {
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

    res.render('user-quest', {
      ...quest,
      user: req.session.user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//Route for to form for posting new quests
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
//Login route
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});
//Profile Route, renders user information and their badges
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
    res.render('profile', {
      ...userProfile,
      user: req.session.user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//Allows search by User id.
router.get('/profile/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        id: req.params.id,
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

router.get('/quest/:id', withAuth, async (req, res) => {
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
    const userName = quest.user.name;

    res.render('indiv-quest', {
      ...quest,
      userName,
      user: req.session.user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
