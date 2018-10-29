const express = require('express');
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');

//Initialising Express
const app = express();

//Setting templating engine to Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Using Public as our static folder
app.use(express.static('public'));

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// GET route HOME
app.get('/', (req, res) => {

    res.render('index');

});



const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server starting on port ${port}...`));