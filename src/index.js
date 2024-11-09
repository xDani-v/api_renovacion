// index.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cloudinaryRoutes = require('./cloudinaryRoutes');
const firestoreRoutes = require('./firestoreRoutes');
const authMiddleware = require('./authMiddleware');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/cloudinary', authMiddleware, cloudinaryRoutes);
app.use('/api/firestore', authMiddleware, firestoreRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});