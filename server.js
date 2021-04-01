const data = require('./api_techician_response_data.json');
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(logger('dev'))

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
})

app.get('/', (req, res) => {
  res.send("This is root!");
});

// GET data at nth index and increment n to return each location set 1 at a time
// Assuming solar farm id = 1 - otherwise would use a slug
let n = 1

app.get('/api/v1/solar_farms/1/technicians', (req, res) => {
  const techs = data[n]
  if (n < 15) {
    n += 1
  } else {
    n = 1
  }
  res.json(techs)
});
