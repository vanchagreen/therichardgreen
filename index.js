const express = require('express');
const app = express();

app.use(express.static('public/landingPage'))

app.listen(8080, () => console.log('Server running on port 8080'));