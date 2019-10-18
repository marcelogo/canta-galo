const express = require('express')
const https = require('https')
const fs = require('fs')
const galo = require('./galo')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env["PORT"] || 8080
const enable_http = !!process.env["ENABLE_HTTPS"]

app.get('/canta-galo', galo.galoGET)
app.post('/canta-galo', galo.galoPOST)

if (enable_http) {
    https.createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
    }, app).listen(port, () => {
        console.log(`Canta Galo listening on HTTPS port ${port}! [LOG=${process.env["LOG"]}]`)
      })
} else {
    app.listen(port, () => console.log(`Canta Galoo listening on port ${port}! [LOG=${process.env["LOG"]}]`))
}


