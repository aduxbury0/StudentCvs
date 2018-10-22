const express = require('express');
const exphbs = require("express-handlebars");

const app = express();


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



app.get('/', (req, res) => {

    res.render('index');

});



const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server starting on port ${port}...`));