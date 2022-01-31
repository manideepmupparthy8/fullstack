var express = require('express');
var app = express();
var port = process.env.PORT || 9000;

var menu = [
    {link: '/', name: 'Home'},
    {link: '/categories', name: 'Category'},
    {link: '/products', name: 'Products'},
    {link: '/restaurants', name: 'Restaurant'}
]

var productRouter = require('./src/routes/productRoutes')(menu);
var restaurantRouter = require('./src/routes/restaurantRoutes')(menu);
var categoryRouter = require('./src/routes/categoryRoute')(menu);

// Whenever we want to display template we need to write these lines
// Static File Path
app.use(express.static(__dirname+'/public'))

// html file path
app.set('views','./src/views');

// view engine
app.set('view engine', 'ejs');

var data = [{
    "id": 1,
    "name" : "iApple",
    "Image" : "https://qph.fs.quoracdn.net/main-qimg-32a38eb3353bfb125206cc39a0b7794e-lq",
    "link" : "categories"
},
{
    "id": 2,
    "name" : "Restaurants",
    "Image" : "https://images.squarespace-cdn.com/content/v1/56a2785c69a91af45e06a188/1610989066011-TAM2C1NWLRLL10HH3FMU/Restaurant-Logo-Designs.jpg?format=1500w",
    "link" : "restaurants"
},
{
    "id": 3,
    "name" : "Products",
    "Image" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStmSA-S768zT8dNhyjuLX49o8JQJ-uNR2Y7CiWl2rm04fIfhuxYD5fJMY12_9bHHwocwU&usqp=CAU",
    "link" : "products"
}
]

app.get('/', function(req, res){
    res.render('index',{title:"Home Page", data:data, menu:menu});
})

app.use('/products', productRouter)
app.use('/restaurants', restaurantRouter)
app.use('/categories', categoryRouter)

// Now create a server  ---- app is object of express and listen is method inside express
app.listen(port, function(err) {
    if (err) throw err;
    else{
    console.log("Server is running on port "+port);
    }
})



