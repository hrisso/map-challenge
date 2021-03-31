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

let n = 1

app.get('/api/v1/solar_farms/1/technicians', (req, res) => {
  const farm = data.find(farm => farm.features[0].properties.id === n)
  if (n < 16) {
    n += 1
  } else {
    n = 1
  }
  res.json(farm)
});