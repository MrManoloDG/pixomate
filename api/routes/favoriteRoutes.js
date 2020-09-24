module.exports = function (app){
    const favoriteController = require('../controllers/favoriteController');

    app.route('/favorites')
        .post(favoriteController.set_favorite_company);
    
    app.route('/favorites/owner/:id_owner')
        .get(favoriteController.list_favorite_owner);

    app.route('/favorites/:id')
        .delete(favoriteController.delete_favorite);

}