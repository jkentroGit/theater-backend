const express = require("express");
const cors = require("cors");

const user = require('./routes/user.routes');
const play = require('./routes/play.routes');
const auth = require('./routes/auth.routes');
const show = require('./routes/show.routes');

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));

app.use('/api/users', user);
app.use('/api/plays', play);
app.use('/api/auth', auth);
app.use('/api/shows', show);

module.exports = app;