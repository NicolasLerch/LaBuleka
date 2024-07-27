module.exports = function(req, res, next){
    if(!req.session.userLogged || req.session.userLogged.rol != "admin"){
        return res.render('forbidden')
    }

    next()
}