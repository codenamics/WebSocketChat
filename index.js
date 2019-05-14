const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'client')))

app.use(bodyParser.json())
const public =
    'BHFBJ-vcaywicbrsvzLr4Cuy_W6_vdaRVkVBZc5s_91Xh2plmyFZbduWksRPXC_e3qCaeUiftMF_COL60gHvLiU'

const private = 'w3Cw2BHUaUMt245uZ2zL3AU6gYoZ0Cpg2-LLzrRmBFs'

webpush.setVapidDetails('mailto:test@tes.pl', public, private)

setInterval(() => {
    app.post('/subscribe', (req, res) => {
        const subscription = req.body
        res.status(201).json({})
        const payload = JSON.stringify({
            title: 'push'
        })

        webpush.sendNotification(subscription, payload).catch(err => {
            console.log(err)
        })
    })
}, 7000);


app.listen(process.env.PORT, () => {
    console.log('Server')
})