const express = require('express');
const path = require('path');
const app = express();
const indexRouter = require('./routes/index.routes')



app.use(express.static('public'));

app.use('/', indexRouter);

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000')
});


