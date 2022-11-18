const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_REMOTE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then( con => {
        console.log(`Connected to database [${con.connection.name}] in [${con.connection.host}] server.`);
    }).catch( con => {
        console.log('Failed to connect to database');
    });
}

module.exports = connectDatabase;