const mongoose = require('mongoose')
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
    .then((data) => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.log("Some error occured while connecting to MongoDB")
    })
