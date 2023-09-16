const express =require('express')
const route = express.Router()
const postController = require('../controller/postController')
route.get('/',postController.HomePage)

route.get('/create-new-post',postController.CreateNewPostPage) //yeni gonderi olusturmak
route.post('/submit-new-post',postController.submitPost) //hata kodu

module.exports =route

