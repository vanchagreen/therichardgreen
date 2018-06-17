const express = require('express');
const app = express();

app.use(express.static('public/landingPage'))
app.get('/dad', (req, res) => {
  res.sendFile(__dirname + "/" + "dad.html")
})

app.listen(8080, () => console.log('Server running on port 8080'));