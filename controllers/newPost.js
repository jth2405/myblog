module.exports=(req,res)=>{
    if(req.session.userId){
        return res.render("create",{
            errors:req.flash('valiErrors'),
            createPost:true
        });
    }
    res.redirect('/auth/login')
}
