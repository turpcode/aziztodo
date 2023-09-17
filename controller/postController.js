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
    }
}



const CreateNewPostPage = (req, res) => { //yeni gonderi olusturur
    res.render('app', { err: "" })

}


fetch('/submit_post', {
    method: 'post',
    headers: new Headers({
         'Authorization': YOUR_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded'
    }),
});

const deletePost= (req,res) => {
    postlModel.findByIdAndDelete(req.param.id)
    .then(() =>{
        res.redirect("/")
    })
    .catch((err => {
        console.log(err)
    }))
    }
module.exports = {
    CreateNewPostPage,
    HomePage,
    submitPost,
    deletePost
}