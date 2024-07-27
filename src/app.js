const express = require('express');
const path = require('path');
const app = express();
const indexRouter = require('./routes/index.routes')
const methodOverride = require('method-override');
const session = require('express-session');
const sendSessionUser = require('./middlewares/sendSessionUser')
const pool = require('./db')
const PORT = require('./config')


app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(session({secret: "buleka2024"}));
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use('/', sendSessionUser, indexRouter);

app.get('/ping', async (req, res)=>{
    const result = await pool.query('SELECT * from labuleka_db.users')
    console.log(result);
    res.send(result[0]);
})

app.use((req, res, next) =>{
    res.status(404).render('404')
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


