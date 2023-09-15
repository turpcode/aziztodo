const express =require('express')
const route = express.Router()
const postController = require('../controller/postController')
const authentication = require('../controller/authentication')
route.get('/',postController.HomePage)

route.get('/login', authentication.LoginPage);
route.post('/login-user', authentication.loginUser);

route.get('/register', authentication.SignUpPage);
route.post('/signup-user', authentication.registerUser);
route.get('/logout-user', authentication.logoutUser);

route.get('/create-new-post', authentication.isAuth, postController.CreateNewPostPage) //yeni gonderi olusturmak
route.post('/submit-new-post', authentication.isAuth, postController.submitPost) //hata kodu

module.exports =route

