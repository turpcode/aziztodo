const postModel = require('../model/postModel')

const HomePage = (req, res) => {
    postModel.find()
        // console.log(req.body)
        .populate('details', "_id detail")
        .sort({ created_at: -1 })
        .then(data => {
            // console.log(data)
            res.render("app", {
                post: data
            })
        })
        .catch(err => { //icerik yoksa hata kodu
            console.log(err)
        })

}
<<<<<<< HEAD
const CreateNewPostPage = (req, res) => { //yeni gonderi olusturur
    res.render('app', { err: "required" })


}
const submitPost = (req, res) => { //metni gonderme butonu
    if (req.body.title === "" || req.body.desc === "") {
        return;
    } else {
        let newPost = new postModel(req.body)
        newPost.save()
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                console.log(err)
            })

=======

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
>>>>>>> 8d6e040e34656a43480b7729fcb618036df03597
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

