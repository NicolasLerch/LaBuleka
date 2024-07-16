function sendSessionUser(req, res, next) {
    if(req.session.userLogged){
        res.locals.user = req.session.userLogged;
    }else{
        res.locals.user = null;
    }
  
    next();
}

module.exports = sendSessionUser;