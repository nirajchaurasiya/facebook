const express = require('express')
const app = express()
require('dotenv').config();
const multer = require('multer');
const cors = require('cors')
const PORT = process.env.PORT
// Connection
require('./connection/connect')

const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const userRoute = require('./routes/user')
const authUser = require('./routes/auth')
const postRoute = require('./routes/posts');
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"));
const corsOptions = {
    origin: 'http://localhost:3000'
};
app.use(cors(corsOptions))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name)
    }
});


const upload = multer({ storage: storage });

app.post('/api/upload', upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully");
    } catch (error) {
        res.status(500).json("An unexpected error occurred");
    }
});






app.use('/api/user', userRoute);
app.use('/api/auth', authUser);
app.use('/api/posts', postRoute);
app.use("/images", express.static(path.join(__dirname, "public/images")))





app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})