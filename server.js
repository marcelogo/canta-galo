const express = require('express')
const https = require('https')
const fs = require('fs')
const galo = require('./galo')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env["PORT"] || 8080
const HTTP_ONLY = !!process.env["HTTP_ONLY"]

app.get('/canta-galo', galo.galoGET)
app.post('/canta-galo', galo.galoPOST)

if (!HTTP_ONLY) {
    https.createServer({
        key: fs.readFileSync('/etc/letsencrypt/live/rooster.vnava.org/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/rooster.vnava.org/fullchain.pem')
    }, app).listen(8443, () => {
        console.log(`Canta Galo listening on HTTPS port 8443! [LOG=${process.env["LOG"]}]`)
      })
}

app.listen(port, () => console.log(`Canta Galoo listening on port ${port}! [LOG=${process.env["LOG"]}]`))

