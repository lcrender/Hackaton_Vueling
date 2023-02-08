const { Router } = require('express');
const router = Router();
const { createTrip, viewTrips, editTrip, deleteTrip, searchTrips } = require('../controllers/controllers');
router.post('/trip', createTrip);
router.get('/trips', viewTrips);
router.put('/trip/:id', editTrip);
router.delete('/trip/:id', deleteTrip);
router.post('/search', searchTrips);
module.exports = router;
