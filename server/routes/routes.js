const { Router } = require('express');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');
const { createTrip, viewTrips, editTrip, deleteTrip, searchTrips } = require('../controllers/controllers');
const { signUp, logIn } = require('../controllers/authController');

router.post('/trip', verifyToken, createTrip);
router.get('/trips', verifyToken, viewTrips);
router.put('/trip/:id', verifyToken, editTrip);
router.delete('/trip/:id', verifyToken, deleteTrip);
router.post('/search', searchTrips);
router.post('/signup', signUp);
router.post('/login', logIn);
module.exports = router;
