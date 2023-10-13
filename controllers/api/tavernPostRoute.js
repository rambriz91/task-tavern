const router = require('express').Router();
const { Quest } = require('../../models');
const withAuth = require('../../utils/auth');
// http://localhost:3001/api/tavernPostRoute/

router.get('/', withAuth, async (req, res) => {
  res.render('Post-quest');
});

router.post('/', withAuth, async (req, res) => {
  console.log('Tavern Post Create');
  console.log(req.body);
  try {
    const newQuestPost = await Quest.create(req.body);
    res.status(200).json(newQuestPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('id:', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const questPostData = await Quest.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!questPostData) {
      res.status(404).json({ message: 'No Quest found with this id!' });
      return;
    }
    res.status(200).json(questPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  console.log(req.params.id);
  try {
    const questPostData = await Quest.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!questPostData) {
      res.status(404).json({ message: 'No Quest found with this id!' });
      return;
    }
    res.status(200).json(questPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
