const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/store',
    { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', err => console.log(err));
db.once('open', () => {
    console.log('connected to mongo on localhost')
});