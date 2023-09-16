const express = require('express')
const routes = require('./config/route')
const morgan = require('morgan');
const app = express()
require('./config/mongoose')

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(morgan('common'))
app.use(routes)
app.listen(4500,()=> console.log('server live on 4500'))