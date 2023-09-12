const express =require('express')
const route = express.Router()
const postController = require('../controller/postController')
const detailController = require("../controller/detailController")

route.get('/',postController.HomePage)

route.get('/create-new-post',postController.CreateNewPostPage) //yeni gonderi olusturmak
route.post('/submit-new-post',postController.submitPost) //hata kodu
route.post('/add-detail/:id',detailController.addDetail) //aciklama olusturmak

module.exports =route

