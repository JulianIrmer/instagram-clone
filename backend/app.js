const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('tiny', {stream: accessLogStream}));
app.use(session({secret: 'ssshhhhh', saveUninitialized: true, resave: true}));

// DB conntection
const DB_URL = process.env.DB_URL;

const mongo_options = {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true
};

mongoose.connect(DB_URL, mongo_options, (err) => {
    console.log('trying to connect to db..');
    if (err) {console.log(err)}
    else {
        console.log('Connected to MongoDB...');
    }
});

const initializeRoutes = () => {
    const routeNames = require('./controller/routes');
    for (const route of routeNames) {
        app.use(`/${route}`, require(`./controller/${route}`));
    }
}

initializeRoutes();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
