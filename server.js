const express = require('express')
const routes = require('./config/route')
const app = express()
require('./config/mongoose')

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:false}))
app.use(routes)
app.listen(4200,()=> console.log('server live on 4200'))