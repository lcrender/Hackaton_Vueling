class Trip {
    tripName
    type
    duration
    cities
    details
    constructor(tripName, type, duration, cities=[], details=[]) {
        this.tripName = tripName;
        this.type = type;
        this.duration = duration;
        this.cities = cities;
        this.details = details;
    }
};
module.exports = Trip;