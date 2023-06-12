//install- npm i body-parser
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const port = 8000;
const bodyparser = require("body-parser")
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
    //schema
    var contactSchema = new mongoose.Schema({
        name: String,
        phone: String,
        email: String,
        address: String,
        desc: String
    });
    var Contact = mongoose.model('contact', contactSchema);

    app.use('/static', express.static('static'))
    // app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }))
    app.set('view engine', 'pug') //set template as pug
    app.set('views', path.join(__dirname, 'views'))//set views directory




    //ENDPOINTS
    app.get('/', (req, res) => {

        const params = {};
        res.status(200).render('home.pug', params)
    })

    app.get('/contact', (req, res) => {

        const params = {};
        res.status(200).render('contact.pug', params)
    })

    app.post('/contact', (req, res) => {
        var myData = new Contact(req.body);
        myData.save().then(item => {
            res.render('contact.pug');
        })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
        // res.status(200).render('contact.pug');
    })

    app.listen(port, () => {
        console.log(`Application started successfully on port ${port}`)
    })

}




// app.use('/static', express.static('static'))
// app.use(express.urlencoded())

// app.set('view engine', 'pug') //set template as pug
// app.set('views', path.join(__dirname, 'views'))//set views directory




// //ENDPOINTS
// app.get('/', (req, res) => {

//     const params = {};
//     res.status(200).render('home.pug', params)
// })

// app.get('/contact', (req, res) => {

//     const params = {};
//     res.status(200).render('contact.pug', params)
// })

// app.post('/contact', (req, res) => {

//     const params = {};
//     res.status(200).render('contact.pug', params)
// })


//START SERVER
