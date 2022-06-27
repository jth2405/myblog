const express=require('express')
const mongoose=require('mongoose');
const app=new express()
const ejs=require('ejs')
const bodyParser=require('body-parser')
const fileUpload=require('express-fileupload')
const customMiddleWare=(req,res,next)=>{
    console.log('Custom middle ware called')
    next()
}
const validateMiddleWare=require('./middleware/validationMiddleware')
const newPostController=require('./controllers/newPost')
const homeController=require('./controllers/home')
const storePostController=require('./controllers/storePost')
const getPostController=require('./controllers/getPost')
const newUserController=require('./controllers/newUser')
const storeUserController=require('./controllers/storeUser')
const loginController=require('./controllers/login')
const loginUserController=require('./controllers/loginUser')
const expressSession=require('express-session');
const authMiddleware=require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware=require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController=require('./controllers/logout')
const flash=require("connect-flash");
app.use(flash());

app.set('view engine','ejs')
app.use(express.static('public'))
mongoose.connect('mongodb+srv://my_clouddb_user:qkqhsha12@cluster0.h0hln.mongodb.net/my_cloud_database',{useNewUrlParser:true, useUnifiedTopology: true});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use(customMiddleWare)
app.use('/posts/store',validateMiddleWare)
app.use(expressSession({
    secret:'keyboard cat'
}))

global.loggedIn=null;

app.use("*",(req,res,next)=>{
    loggedIn=req.session.userId;
    next()
});



app.get('/',homeController)

app.get('/post/:id',getPostController)

app.post('/posts/store',authMiddleware,storePostController)

app.get('/posts/new',authMiddleware,newPostController)

app.get('/auth/register',redirectIfAuthenticatedMiddleware,newUserController)

app.post('/users/register',redirectIfAuthenticatedMiddleware,storeUserController)

app.get('/auth/login',redirectIfAuthenticatedMiddleware,loginController)

app.post('/users/login',redirectIfAuthenticatedMiddleware,loginUserController)

app.get('/auth/logout',logoutController)

app.use((req,res)=>res.render('notfound'));





let port=process.env.PORT;
if(port==null||port==""){
    port=4000;
}
app.listen(port,()=>{
    console.log('App listening...')
})

app.get('/post/:id',async(req,res)=>{
    console.log(req.params)
})
