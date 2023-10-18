const router = require('express').Router();
const { Quest } = require('../../models');
const withAuth = require('../../utils/auth');

// http://localhost:3001/api/tavernPostRoute/

router.post('/', withAuth, async (req, res) => {
  console.log(req.body);
  console.log(req.session.user);
  try {
    const newQuestPost = await Quest.create({
      title: req.body.title,
      description: req.body.description,
      reward: req.body.reward,
      quest_type: req.body.quest_type,
      poster_id: req.session.user.id,
    });
    res.status(200).json(newQuestPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const questPostData = await Quest.update(
      {
        poster_id: req.session.user.id,
        isTaken: true,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    if (!questPostData) {
      res.status(404).json({ message: 'No Quest found with this id!' });
      return;
    }
    res.status(200).json(questPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    const deletedQuestData = await Quest.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedQuestData) {
      res.status(404).json({ message: 'No Quest found with this id!' });
      return;
    }
    res.status(200).json(deletedQuestData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
