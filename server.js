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
// Used a slug for solar farm id, but not using slug, so all ids will return same data
let n = 1

app.get('/api/v1/solar_farms/:id/technicians', (req, res) => {
  const techs = data[n]
  if (n < 15) {
    n += 1
  } else {
    n = 1
  }
  res.json(techs)
});
