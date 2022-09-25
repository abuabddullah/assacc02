const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./middleware/error');


const app = express();


app.use(cors());
app.use(express.json());


//Route imports
const toursRouter = require('./routes/toursRoutes');



//invoking routes
app.use('/', toursRouter);


// Not found route
app.all("*", (req, res) => {
    res.send("NO route found.");
});




// Middleware for Errors
app.use(errorMiddleware);


module.exports = app;