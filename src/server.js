// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cloudinaryRoutes = require('./cloudinaryRoutes');
const firestoreRoutes = require('./firestoreRoutes');

app.use(bodyParser.json());
app.use('/api/cloudinary', cloudinaryRoutes);
app.use('/api/firestore', firestoreRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});