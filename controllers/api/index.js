const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tavernPostRoute = require('./tavernPostRoute');

router.use('/users', userRoutes);
router.use('/tavernPostRoute', tavernPostRoute);

module.exports = router;
