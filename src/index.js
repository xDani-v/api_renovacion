// index.js
const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');

const cloudinaryRoutes = require('./cloudinaryRoutes');
const firestoreRoutes = require('./firestoreRoutes');
const authMiddleware = require('./authMiddleware');
// Configura CORS para permitir solicitudes desde tu dominio específico
const corsOptions = {
  origin: 'https://renovacionesprojectv1.web.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};


app.use(compression());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api/cloudinary', authMiddleware, cloudinaryRoutes);
app.use('/api/firestore', authMiddleware, firestoreRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});