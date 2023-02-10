const Trip = require('../models/Trips');
const Answers = require('../classes/Answers');
const tripCtrl = {};
tripCtrl.createTrip = async (req, res) => {
	try {
		const { tripName, type, duration, cities, details } = req.body;
		const newTrip = new Trip({
			tripName,
			type,
			duration,
			cities,
			details
		});
        const error = newTrip.validateSync();
        if (error !== "undefined") {
            await newTrip.save();
		    const answer = await new Answers((message = 'Trip created.'), (trip = newTrip));
		    return res.status(201).json(answer);
        }	
	} catch (error) {
		return res.status(401).json(error);
	}
};
tripCtrl.viewTrips = async (req, res) => {
	try {
		const allTrips = await Trip.find({},{__v:0}).sort({createdAt: 'desc'}).lean()
		const answer = await new Answers(
			(message = `Trips find ${allTrips.length}`),
			(trip = allTrips)
			);
		return res.status(200).json(answer);
	} catch (error) {
		return res.status(401).json(error);
	}
}

tripCtrl.editTrip = async (req, res) => {
	try {
		const { tripName, type, duration, cities, details } = req.body;
		const editedTrip = await Trip.findByIdAndUpdate(req.params.id, { tripName, type, duration, cities, details }).lean();
		const answer = await new Answers((message = 'Trip edited.'),(trip = editedTrip));
		return res.status(201).json(answer);
	} catch (error) {
		return res.status(401).json(error);
	}
};
tripCtrl.deleteTrip = async (req, res) => {
	try {
		await Trip.findByIdAndDelete(req.params.id);
		const answer = await new Answers((message = 'Trip deleted.'));
		return res.status(201).json(answer);
	} catch (error) {
		return res.status(401).json(error);
	}
};
tripCtrl.searchTrips = async (req, res) => {
	try {
		const citySearch = req.body.cities;
		if (citySearch.length <= 2) {
			const answer = await new Answers(
				(message = 'Enter at least 3 characters for search.'),
				(trip = citySearch)
			);
			return res.status(200).json(answer);
		} else {
			const trips = await Trip.find({ cities: { $regex: citySearch, $options: 'i' } }, { __v: 0 })
				.sort({ createdAt: 'desc' })
				.lean();
			if (trips.length === 0) {
				const answer = await new Answers(
					(message = 'We did not find trips to this city.'),
					(trip = citySearch)
				);
				return res.status(200).json(answer);
			}
			if (trips.length === 1) {
				newMessage = `${trips.length} trip found.`;
			} else {
				newMessage = `${trips.length} trips found.`;
			}
			const answer = await new Answers((message = newMessage), (trip = trips));
			return res.status(200).json(answer);
		}
	} catch (error) {
		return res.status(401).json(error);
	}
};
module.exports = tripCtrl;
