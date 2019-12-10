//-----------------------------
// Load Libraries
//-----------------------------
const morgan = require('morgan');
const express = require('express');

// Routers
const auth = require('./router/auth');
const user = require('./router/user');
// const member = require('./router/member');

//-----------------------------
// Configuration
//-----------------------------
const PORT = parseInt(process.argv[2]) || process.env.APP_PORT || 3000;
const app = express();

// Setup standard middleware
app.use(morgan('tiny'));

//-----------------------------
// Router rules
//-----------------------------

// login router - handle all login requests
app.use('/auth', auth)

// handle all user request
app.use('/users', user.router)     // TODO: Check credential before allowing access

// handle all member request
// app.use('/members', member)

//-----------------------------
// Starting up application
//-----------------------------
Promise.all([
    // Test all connections asynchronously
    user.connections.pool(),
    user.connections.client()
])
.then(() => {
    app.listen(PORT, () => {
        console.info(`Application started on port ${PORT} at ${new Date()}`);
    })
})
.catch(err => {
    process.exit(-1);
})



