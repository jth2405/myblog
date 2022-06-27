const mongoose=require('mongoose')
const BlogPost=require('./models/BlogPost')
mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser:true});

var id="5fb26446ba175346703804d9";

BlogPost.findByIdAndDelete(id,(error,blogspot)=>{
    console.log(error,blogspot)
})