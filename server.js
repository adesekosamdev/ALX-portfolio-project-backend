// server.js
const express = require('express');
const { sequelize } = require('./models');
const userRoutes = require('./routes/user');
const budgetRoutes = require('./routes/budget');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const cors = require('cors');
const https = require('https');
const http = require('http');
const fs = require('fs');

const app = express();

// cors setup
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/auth', authRoutes);

// Load SSL certificate and key
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/web-02.bazzyx.tech/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/web-02.bazzyx.tech/fullchain.pem')
};

// Sync database and start server
const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }).then(() => {
  https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS Server started on port ${PORT}`);
  });
});

// Redirect HTTP to HTTPS
http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80);
