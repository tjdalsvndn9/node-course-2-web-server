const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log',log + '\n', err => {
    if(err){
      console.log('Unable to append to server.log')
    }
  });
  next();
})
//down
// app.use((req,res,next) => {
//   res.render('404.hbs')
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})


app.get('/', (req,res) => {
  // res.send('<h1>hello express</h1>')
  res.render('home.hbs', {
    PageTitle:'Home Page',
    tagLine:'This is a home page tagline'
  })
})

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    PageTitle:'About Page'
  });
})

app.get('/bad', (req,res) => {
  res.send({
    ErrorMessage:'Unable to send JSON data'
  })
})

app.get('/project',(req,res)=> {
  res.render('project.hbs',{
    PageTitle:'Project page',
    tagLine:'This is a project tagline'
  })
})



app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});
