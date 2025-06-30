const express = require("express");
const app = express();

app.use(express.json());

const user = require('./routes/user.routes');
const play = require('./routes/play.routes');
const auth = require('./routes/auth.routes');

app.use('/api/users', user);
app.use('/api/plays', play);
app.use('/api/auth', auth);

module.exports = app