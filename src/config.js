module.exports = {
    port : process.env.PORT || 3000, 
    DB_HOST : process.env.DB_HOST || 'localhost',
    DB_USER : process.env.DB_USER || 'root',
    DB_PASSWORD : process.env.DB_PASSWORD || 'root',
    DB_DATABASE : process.env.DB_NAME || 'labuleka_db',
    DB_PORT : process.env.DB_PORT || 3306
}