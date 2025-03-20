require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//on listener
require('./listeners/SendEmailListener');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));


//connection database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("conntion successfyle")
    }).catch((err) => {
        console.log("error in conntion with database " + err)
    })




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
