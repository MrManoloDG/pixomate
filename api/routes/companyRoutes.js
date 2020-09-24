module.exports = function (app){
    const companyController = require('../controllers/companyController');

    app.route('/companies')
        .post(companyController.create_company)
        .get(companyController.list_all_companies);

    app.route('/companies/:id')
        .put(companyController.edit_company);

    app.route('/companies/search')
        .get(companyController.search_companies);
}