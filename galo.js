
const logEnabled = (process.env["LOG"] == "true");

let pilha = [];
let threshold = 5;
let timeWindowMillisecs = 10000;
let forceSing = false;

const agora = () => {
    return new Date().getTime();
}

const pruneStack = () => {
    while (pilha.length > threshold) {
        pilha.shift();
    }
}

const createGaloRequest = (message) => {
    const user = (message && message.user_name) || "default"
    return {user: user, timestamp: agora()}
};

const hasRequestForUser = (message) => {
    return !!pilha.find(galoReq => galoReq.user === message.user_name)
}

const cantaGalo = (message) => {
    if (!hasRequestForUser(message)) {
        pilha.push(createGaloRequest(message));
    }
    pruneStack();
}

const lowerBound = () => {
    return agora() - timeWindowMillisecs;
}

const isCallWithinWindow = (galoReq) => {
    return galoReq.timestamp >= lowerBound();
}

const isStackFull = () => !!pilha[threshold -1]
    
const shouldCanta = () => {
    if (forceSing){
        forceSing = false
        return true
    }

    return isStackFull() && isCallWithinWindow(pilha[0])
}

const messages = [
    "Da Rooster will sing for you",
    "A rooster announces to a flock of chickens that he’s found food with a “took, took, took.” But the hens don’t pay attention if they already know that there is food around.",
    "which came first, the chicken or the egg?",
    "The Universe Is Old (Really Old)",
    "The Universe Has Echoes of Its Birth, think about it",
    "Mind you, roosters dont sing, they crow.",
    "The chicken was the first bird to have its genome sequenced, in 2004.",
    "Baby chickens are chicks. Female chickens are pullets until they’re old enough to lay eggs and become hens. Male chickens are called roosters, cocks or cockerels, depending on the country you’re in"
]

const niceMessage = () => {
    const mId = Math.floor(Math.random() * Math.floor(8));
    return messages[mId];
}

const checkForceNextSing = (req) => {
    forceSing = (req.body && req.body.text === "magic word")
}

module.exports.galoGET = (req, res) => {
    const result = shouldCanta();
    if (logEnabled) {
        console.log("get: ", result)
    }
    res.send(result? "canta" : "cala");
}

module.exports.galoPOST = (req, res) => {
    cantaGalo(req.body)
    checkForceNextSing(req)
    if (logEnabled) {
        console.log("req.headers", req.headers);
        console.log("req.params", req.params);
        console.log("req.body", req.body);
    }
    
    res.send(200, niceMessage())
}
