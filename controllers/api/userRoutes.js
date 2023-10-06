

const router = require('express').Router();
const { User } = require('../../models');

//post useremail, and pasword to db

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user = {
        name: userData.name,
        email: userData.email,
        id: userData.id
      };

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


//logs user in if match is found
router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      console.log('no user found');
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log('incorrect password');
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user = {
        name: userData.name,
        email: userData.email,
        id: userData.id
      };

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
