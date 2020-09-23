module.exports = function (app){
    const companieController = require('../controllers/companieController');

    app.route('/companies')
        .post(companieController.create_companie)
        .get(companieController.list_all_companies);

    app.route('/companies/:id')
        .put(companieController.edit_companie);

    app.route('/companies/search')
        .get(companieController.search_companies);
}