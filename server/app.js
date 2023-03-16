const sequelizee = require("./dataBaseConnector")

const initModels = require("./models/DB/init-models")

const express = require('express')
const app = express()
const port = 8001

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    test()
    console.log(`Example app listening on port ${port}`)
  })

  const test = async () => {
    
  }
  