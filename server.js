const express = require('express')
const app = express()
const port = process.env["PORT"] || 8080

let pilha = [];
let threshold = 5;
let timeWindowMillisecs = 10000;

function agora(){
    return new Date().getTime();
}

function pruneStack() {
    while (pilha.length > threshold) {
        pilha.shift();
    }
}

function cantaGalo(){
    pilha.push(agora());
    pruneStack();
}

function lowerBound(){
    return agora() - timeWindowMillisecs;
}

function isCallWithinWindow(call) {
    return call >= lowerBound();
}

const isStackFull = () => !!pilha[threshold -1]
    
const shouldCanta = () => isStackFull() && isCallWithinWindow(pilha[0])

app.get('/canta-galo', (req, res) => res.send(shouldCanta()? "canta" : "cala"))

app.post('/canta-galo', (req, res) => {
    cantaGalo()
    res.send(200)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))