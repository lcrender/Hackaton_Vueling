const mongoose = require('mongoose');
const MONGODB_URI = process.env
mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI, {
})
    .then(db => console.log("Database Connected"))
    .catch(err => console.log(err))

