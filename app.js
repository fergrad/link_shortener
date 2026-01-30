const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const LinkRouter = require('./routers/LinkRouter');

const port = 3000;

app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static('public'));

app.use('/', LinkRouter);

app.get('/', (req, res) => {
    res.render('index');
}
);

app.listen(port, () => {
    
    console.log(`Server is running on http://localhost:${port}`);
});