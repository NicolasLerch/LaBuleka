const {createPool} = require("mysql2/promise");
const config = require('./config')
// const {DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, DB_DATABASE} = require('./config')

const pool = createPool({
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    host: config.DB_HOST,
    port: config.DB_PORT,
    database: config.DB_DATABASE
})

module.exports = pool