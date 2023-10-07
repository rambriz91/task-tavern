const router = require('express').Router();
const { Quest } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) =>{
    console.log(req.body);
    try{
        const newQuestPost = await Quest.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newQuestPost);
            } catch (err){
                console.log(err)
                res.status(400).json(err);
            }
});

router.put('id:')