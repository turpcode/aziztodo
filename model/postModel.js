const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,        //gorev basligi
        required: true
    },
    desc: {
        type: String,
        required: true       // gorev aciklamasi
    },
    details: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Detail"
        }
    ],
    created_at: {
        type: Date,
        default: Date.now() //acilis gunu
    }
})
module.exports = mongoose.model("Post", postSchema)