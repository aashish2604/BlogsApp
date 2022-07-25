const express=require('express');
const mongoose =require('mongoose'); 
const Blog=require('./model/blogs');

//express app
const app=express();

// connect to mongoDB
const dbUri='mongodb+srv://sample1:test123@nodecluster.drbwr.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbUri,{useNewUrlParser: true,useUnifiedTopology:true})
.then((result)=> app.listen(3000))
.catch((reason)=> console.log(reason));

//register view engine
app.set('view engine','ejs');

//listen for request
app.use(express.static('public'));

app.use((req,res,next)=>{
    console.log('new req has been made')
    console.log('host: ',req.hostname)
    console.log('path: ',req.path)
    console.log('method: ',req.method)
    next();
});

app.get('/add-blogs',(req,res)=>{
    const blog=new Blog({
        title: 'blog 2',
        snippet: 'Adding a new blog',
        body: 'Some of the things which are used in the world are absolutely useless just like ruby on rails sfsefpjsef'
    });
    blog.save()
    .then((response)=>{
        res.send(response)
    })
    .catch((err)=>console.log(err))
});

app.get('/all-blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>console.log(err))
});

app.get('/find-by-id',(req,res)=>{
    Blog.findById("62dec158f7f0f5616e8c9169")
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>console.log(err))
});

app.get('/',function(req,res){
    
    res.redirect('/blogs')
});

app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt: -1})
    .then((response)=>{
        res.render('index',{
            title: 'Home',
            blogs: response
        })
    })
    .catch((err)=>console.log(err))
});

app.get('/about',(req,res)=> {
    res.render('about',{title: 'About Page'});
})

app.get('/blogs/create',(req,res)=>{
    res.render('create_blogs',{title: 'Create Blogs'});
})

app.get('/about-us',(req,res)=>{
    res.redirect('/about');
})

app.use((req,res)=>{
    res.status(404).render('404',{title: '404'});
})