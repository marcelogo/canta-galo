const express = require('express')
const galo = require('./galo')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env["PORT"] || 8080

app.get('/canta-galo', galo.galoGET)
app.post('/canta-galo', galo.galoPOST)

app.listen(port, () => console.log(`Example app listening on port ${port}! [LOG=${process.env["LOG"]}]`))