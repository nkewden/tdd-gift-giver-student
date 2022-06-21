const { NotFoundError } = require("./utils/errors");

const express = require('express');
const app = express();

const morgan = require('morgan')
app.use(morgan('tiny'))
app.use(express.json())

const router = require("./routes/gift-exchange")
app.use("/gift-exchange", router)

const bodyParser = require('body-parser')
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

app.get("/", (req, res) => {
    res.status(200).send({ "ping": "pong" })
})

app.use((req, res, next) => {
    next();
    throw new NotFoundError
  })

app.use((error, req, res, next) => {
    let status = error.status ? error.status : 500;
    let message = error.message ? error.status : "Something wen't wrong in the application"
    res.send({"error" : {"status" : status, "message" : message}})
});


module.exports = app