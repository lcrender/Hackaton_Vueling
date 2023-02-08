const {Schema, model} = require('mongoose');
const TripSchema = new Schema({
    tripName: { type:String, required: true },
    type: { 
        type:String, 
        enum: {
            values:["Land Trip", "Air Trip"],
            message: '{VALUE} is not supported'
        },
        required: true
    },
    duration: { type:String, required: true },
    cities: {
        type: Array,
        validate: function(value) {
            return value.length >= 2;
        }},
    details: {
        type: Array,
        validate: function(value) {
            return value.length === 2;
        }}
});
module.exports = model('Trip', TripSchema, 'trips');