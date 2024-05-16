const express = require('express');
const path = require('path');
const app = express();
const indexRouter = require('./routes/index.routes')
const methodOverride = require('method-override');


app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use('/', indexRouter);

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000')
});


