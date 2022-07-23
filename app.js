const express=require('express');
const app=express();

app.listen(3000);

//register view engine
app.set('view engine','ejs');

app.get('/',function(req,res){
    const blogs=[
        {title: 'Title 1',snippet: 'Some  sefsefhse fefkhaohfaeof sefefuegfiaf esifuliugsueizf' },
        {title: 'Title 2',snippet: 'sefseoifv zvdilurghvxrovz seohhz[wiehcosevbzsebv sixdfhczo' },
        {title: 'Title 3',snippet: 'eflszsebfuilks edvzlsebkd;zosbczs dv zusedczios;eziosehdio;fvzosi;hdv' },
        {title: 'Title 4',snippet: 'ze;hsfzso;e fsed;seiohfiszepfawpoebvser dgvlzslehfz;fizsrhfdorhgbtd drkvjxdrghvl' }
    ]
    res.render('index', {
        title: 'Home Page',
        blogs
    });
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