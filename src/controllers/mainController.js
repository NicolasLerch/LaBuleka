const path = require('path')

const mainController = {
    viewIndex : function (req, res){
        res.sendFile(path.resolve(__dirname, '../views/index.html'));
    }
}

module.exports = mainController;