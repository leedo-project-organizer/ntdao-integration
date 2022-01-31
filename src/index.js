const express = require('express')
const app = express()
const cors = require('cors')
const ethers = require('ethers')
const assert = require('assert')
const cron = require('node-cron');
const srcDir = require('find-config')('src')
const cronJob = require(srcDir + '/cron')
const port = 3000
const bodyParser = require('body-parser');
const storage = require('find-config')('storage')
const fs = require('fs');
if (!fs.existsSync(storage)){
    fs.mkdirSync('./storage');
}
const db = require(srcDir + '/db')

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
  
app.post('/getVaultHash', async (req, res, next) => {
  try {
    const hash = cronJob.getHash('vault')
    res.send({ hash })
  } catch (err) {
    res.status(400).send({ err: err.message })
    next(err)
  }
})  

app.post('/getMirrorHash', async (req, res, next) => {
  try {
    const hash = cronJob.getHash('mirror')
    res.send({ hash })
  } catch (err) {
    res.status(400).send({ err: err.message })
    next(err)
  }
})  

//cron.schedule('* * * * *', function() {
//  console.log('running a task every minute');
//});

app.listen(port, () => {
  console.log(`The polygon shuttle hash app listening at ${port}`)
})