const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const { check, validationResult } = require('express-validator')

const UserDetails = require('./models/userDetailsModel')

const app = express();

const connection = mongoose.connection;
const URI = 'mongodb+srv://leewayhertz:leewayhertz@cluster0-w39id.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(URI, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true  })
connection.once('open', () => {
    console.log("MongoDB database connection established");
})

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

//Add form data to database after validation
app.post('/api/user', [
    check('image')
    .not().isEmpty().withMessage("Image link required")
    .trim().isURL().withMessage("Invalid image URL"),

    check('firstname')
    .not().isEmpty().withMessage("Firstname required")
    .trim().isAlpha().withMessage("Firstname can have only alphabets"),

    check('lastname')
    .not().isEmpty().withMessage("Lastname required")
    .trim().isAlpha().withMessage("Lastname can have only alphabets"),

    check('email')
    .not().isEmpty().withMessage("Email is required")
    .trim().isEmail().withMessage("Invalid Email"),

    check('phone')
    .not().isEmpty().withMessage("Phone number required")
    .trim().isInt().withMessage("Invalid phone number")
],(req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json(errors);
    }

    const image = (req.body.image).trim();
    const firstname = (req.body.firstname).trim();
    const lastname = (req.body.lastname).trim();
    const email = (req.body.email).trim();
    const phone = Number(req.body.phone);

    const newUser = new UserDetails({ image, firstname, lastname, email, phone });

    newUser.save()
    .then(() => res.json("Successfully added"))
    .catch(err => res.status(400).json("Error:", err));
})

//Fetch existing and newly added users
app.get('/api/details', (req, res) => {
    UserDetails.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error:", err));
})

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(process.env.PORT || 5000);