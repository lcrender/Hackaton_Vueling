const mongoose = require('mongoose');
const {URI} = process.env
const MONGODB_URI = `mongodb://${URI}`;
mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI, {
})
    .then(db => console.log("Database Connected"))
    .catch(err => console.log(err))

