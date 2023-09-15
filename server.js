const express = require('express')
const routes = require('./config/route')
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express()
require('./config/mongoose')

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cookieParser());
app.use(morgan('common'))
app.use(routes)
app.listen(4200,()=> console.log('server live on 4200'))
