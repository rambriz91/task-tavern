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
    }
})