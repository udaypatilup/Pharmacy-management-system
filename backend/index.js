const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config(); // Load environment variables

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// Routes
app.use('/api', require('./service/login'))
app.use('/api', require('./service/medicine'))
app.use('/api', require('./service/customer'))
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
