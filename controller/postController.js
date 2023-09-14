const postModel =require('../model/postModel')

const HomePage = (req,res)=>{
   postModel.find()
   .sort({created_at:-1}) // en yeni en basta
   .then(data => {
    res.render("app",{   //icerikleri sirala
        posts:data
    })
   })
   .catch(err => { //icerik yoksa hata kodu
    console.log(err)
   })
}

const CreateNewPostPage = (req,res)=>{ //yeni gonderi olusturur
    res.render('app',{err: ""})
    
}

const submitPost = (req,res) =>{ //metni gonderme butonu
    if (req.body.title === "" || req.body.desc === "") { //hata kodunda yanlislik var
        res.send("all blanks require")  //hata kodunu duzeltelim
                                        //bos gonderi olusturulabiliyor
    }else{
        let newPost = new postModel(req.body)
        newPost.save()
        .then(()=>{
            res.redirect('/')
        })
        .catch(err =>{
            console.log(err)
        })
    }
}

fetch('/submit_post', { 
    method: 'post', 
    headers: new Headers({
      'Authorization': YOUR_TOKEN, 
      'Content-Type': 'application/x-www-form-urlencoded'
    }), 
});

module.exports = {
    CreateNewPostPage,
    HomePage,
    submitPost,
}

