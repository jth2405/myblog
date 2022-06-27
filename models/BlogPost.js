const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const BlogPostSchema=new Schema({
    title:String,
    body:String,
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    datePosted:{/*can declare property type with an object like this because we need 'default'*/
    type:Date,
    default:new Date()
    },
    image:String

});

const BlogPost=mongoose.model('BlogPost',BlogPostSchema);

module.exports = BlogPost


BlogPost.find({},(error,blogspot)=>{
    console.log(error,blogspot)
})

BlogPost.find({
    title:'The Mythbuster Guide to Saving Money on Energy Bills'
},(error,blogspot)=>{
    console.log(error,blogspot)
})

BlogPost.find({
    title:'The/'
},(error,blogspot)=>{
    console.log(error,blogspot)
})

var id="5fb25d62adfb414074039095";

BlogPost.findById(id,(error,blogspot)=>{
    console.log(error,blogspot)
})

BlogPost.findByIdAndUpdate(id,{
    title:'Updated title'
},(error,blogspot)=>{
    console.log(error,blogspot)
})

BlogPost.findByIdAndDelete(id
,(error,blogspot)=>{
    console.log(error,blogspot)
})