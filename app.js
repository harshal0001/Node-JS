// const http = require('http');
const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminData = require('./routes/admin.js') 
const shopRoutes = require('./routes/shop.js') 

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminData.routes);
app.use(shopRoutes);


app.use((req,res,next)=> {
    res.status(404).render('error-page', { pageTitle: 'Page Not Found!' });
});
/*
app.use('/', (req, res, next)=>{
    console.log(' This always runs!');
    next();
});

app.use((req, res,next) => {
    console.log('In the middleware');
    next(); // allows the request to continue to the next middleware in line
});
*/

/*
const server = http.createServer(app);
server.listen(3000);
*/
// INSTEAD OF THE ABOVE 2 LINES WE CAN WRITE
app.listen(3000);
