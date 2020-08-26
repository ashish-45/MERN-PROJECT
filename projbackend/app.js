require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//MY ROUTE PATH
const AuthRoute = require('./routes/auth');
const UserRoute = require('./routes/user');
const CatogaryRoute = require('./routes/catogary');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const paymentBRoute = require('./routes/paymentBRoute');

//const stripeRoute = require('./routes/stripePayment');



mongoose.connect(process.env.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
});

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//MY ROUTE
app.use('/api', AuthRoute);
app.use('/api', UserRoute);
app.use('/api', CatogaryRoute);
app.use('/api',productRoute);
app.use('/api',orderRoute);
app.use('/api',paymentBRoute);
//app.use('/api',stripeRoute);


//PORT
const port = process.env.PORT || 7000;

// STARTING SERVER
app.listen(port, () => {
    console.log(`App is running ${port}`);
})
