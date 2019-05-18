require('dotenv').config()
const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')
const Push = require('./models/Push')
const app = express()
const mongoose = require('mongoose')

mongoose
    .connect(process.env.mongoURI, {
        useNewUrlParser: true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use(express.static(path.join(__dirname, 'client')))

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);


webpush.setVapidDetails('mailto:test@tes.pl', process.env.public, process.env.private)


app.get('/subscribe', (req, res) => {
    Push.find().then(sub => {
            return sub.forEach(item => {
                const payload = JSON.stringify({
                    title: 'Green Fresh'
                })
                webpush.sendNotification(item, payload).catch(err => {
                    console.log(err)
                })
            })
        }).then(() => {
            res.end()
        })
        .catch(err => {
            console.log(err)
        })
})


app.post('/save', (req, res) => {
    Push.findOne({
        endpoint: req.body.endpoint
    }).then(sub => {
        if (sub) {
            return res.status(404).json({
                msg: 'You have already subscribe'
            })
        } else {
            const newPush = new Push({
                endpoint: req.body.endpoint,
                keys: {
                    p256dh: req.body.keys.p256dh,
                    auth: req.body.keys.auth
                }

            })
            newPush.save().then(sub => res.json(sub)).catch(err => {
                console.log(err)
            })
        }
    }).catch(err => {
        console.log(err)
    })
})

// app.get('/all', (req, res) => {
//     Push.find().sort({
//         date: -1
//     }).then(res => console.log(res)).catch(err => console.log(err))
// })

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('Server')
})