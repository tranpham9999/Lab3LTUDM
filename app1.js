const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const bodyParser = require('body-parser');
const ejs= require('ejs');
//serving static files
app.use(express.static('public'))


require('./models/schema');

app.set('view engine', 'ejs');
app.use(express.static('./public'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json()); 
// import routes
require('./route')(app);


app.listen(port,()=>{
    console.log("server is running on port" + port)
})