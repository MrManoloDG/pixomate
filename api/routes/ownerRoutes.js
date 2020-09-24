module.exports = function (app){
    const ownerController = require('../controllers/ownerController');

    app.route('/owners')
        .get(ownerController.list_owners);
    
    app.route('/owners/:id')
        .get(ownerController.get_owner);

}