const express = require('express');
const database = require('./database');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const upload = require('./multer/multer')
const { ReturnDocument } = require('mongodb');

app.set("view engine", "ejs")
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'osm',
    saveUninitialized: false,
    resave: false
}))

app.use(express.static(__dirname + "/public"))

app.get('/', async (req, resp) => {
    let isLoggedIn = req.session.isLoggedIn
    let db = await database.products();
    let products = await db.find().toArray();
    console.log(products)
    resp.render("home", { isLoggedIn: isLoggedIn , products })

})
app.get('/register', (req, resp) => {
    resp.render("register")
})

app.post('/registerdata', async (req, resp) => {
    let userData = req.body;
    let db = await database.dbConnet();
    let inserted = await db.insertOne({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: "user"
    });

    resp.redirect("/login")
})

app.post('/orderdata', async (req, resp) => {
    let userData = req.body;
    let db = await database.checkout();
    let inserted = await db.insertOne({
        name: userData.name,
        email: userData.email,
        address: userData.address,
        city: userData.city,
        country: userData.country,
        number: userData.number,
        address2: userData.address2,
        state: userData.state,
        pin: userData.pin
    });

    resp.send("<h1>Thanks For Your Order</h1>")
})

app.post('/contactdata', async (req, ressp) => {
    let userData = req.body;
    console.log(userData);
    let db = await database.contactdata();
    let inserted = await db.insertOne({
        name: userData.name,
        email: userData.email,
        number: userData.number,
        message: userData.message
    })
    ressp.send("<h1>Thanks For Connected me...</h1>")
})
app.get('/login', (req, res, next) => {
    let isLoggedIn = req.session.isLoggedIn
    if (isLoggedIn) {
        return res.redirect('/');
    }
    next();
}, (req, resp) => {
    let error = ''
    resp.render("login", { error })

})
app.post('/logindata', async (req, resp) => {
    let = data = req.body;
    let db = await database.dbConnet();
    let result = await db.findOne({
        email: data.email,
        password: data.password
    })
    if (result == null) {
        let error = 'Please Enter Valid Email And Password...';
        resp.render('login', { error });
    }
    else {
        if (result.role == "user") {

            req.session.isLoggedIn = true
            req.session.userId = result._id
            resp.redirect('/');
        } else if (result.role == "admin") {
            req.session.isAdminLoggedIn = true;
            req.session.adminId = result._id;
            resp.redirect("/dashboard");
        }
    }
})
app.get('/about', (req, resp) => {
    let isLoggedIn = req.session.isLoggedIn
    resp.render("about", { isLoggedIn })

})
app.get('/woodenChair', (req, resp) => {
    let isLoggedIn = req.session.isLoggedIn
    resp.render("woodenChair", { isLoggedIn })

})
app.get('/dinnerTable', (req, resp) => {
    let isLoggedIn = req.session.isLoggedIn
    resp.render("dinnerTable", { isLoggedIn })

})
app.get('/customizeChair', (req, resp) => {
    let isLoggedIn = req.session.isLoggedIn
    resp.render("customizeChair", { isLoggedIn })

})
app.get('/repair', (req, resp) => {
    let isLoggedIn = req.session.isLoggedIn
    resp.render("repair", { isLoggedIn })

})
app.get('/shop', async (req, resp) => {
    let isLoggedIn = req.session.isLoggedIn
    let db = await database.products();
    let products = await db.find().toArray();
    console.log(products)
    resp.render("shop", { isLoggedIn, products })

})
app.get('/contact', (req, resp) => {
    let isLoggedIn = req.session.isLoggedIn
    resp.render("contact", { isLoggedIn })

})
app.get('/order', (req, resp) => {
    let isLoggedIn = req.session.isLoggedIn
    resp.render("order", { isLoggedIn })

})
app.get('/cart', (req, resp) => {
    let isLoggedIn = req.session.isLoggedIn
    resp.render("cart", { isLoggedIn })

})
app.get('/checkout', (req, resp) => {
    let isLoggedIn = req.session.isLoggedIn
    resp.render("checkout", { isLoggedIn })

})
app.get('/search', (req, resp) => {
    let isLoggedIn = req.session.isLoggedIn
    resp.render("search", { isLoggedIn })

})

app.post('/logout', (req, resp) => {
    console.log(req.body)
    req.session.destroy();
    resp.send({ message: "success" })
    resp.redirect('home');
})

const adminMiddleware = (req , res , next) =>{
    let isAdminLoggedIn = req.session.isAdminLoggedIn
    if(!isAdminLoggedIn) return res.redirect('/login')
    next();
}
app.get('/dashboard',adminMiddleware,  async (req, resp) => {
    let isLoggedIn = req.session.isLoggedIn
    let db = await database.products();
    let totalProducts = await db.find().toArray();
    resp.render("dashboard/dashboard", { isLoggedIn, totalProducts: totalProducts.length })
})

app.get('/dashboard/add-product',adminMiddleware, (req, resp) => {
    resp.render("dashboard/product/add-product")
})

app.post('/products', upload.saveImage.single('productImage'), async (req, resp) => {

    let userData = req.body;
    let db = await database.products();
    let inserted = await db.insertOne({

        name: userData.name,
        price: userData.price,
        image: req.file.filename

    })
    resp.send('<h1>Porducts Added...    <h1>');
})

console.log('My server is running on 2000 port');

    

app.listen(2000);    