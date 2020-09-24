const sequelize = require('../../db');
const { Op } = require("sequelize");
const Company = sequelize.models.Company;

const handleError = (req,res,error) => {
    if (error.name === "SequelizeUniqueConstraintError"){
        res.status(409).send(error);
    } else if (error.name === "SequelizeValidationError") {
        res.status(400).send(error);
    } else {
        res.status(500).send(error);
    }
}

// Esta funcion comprueba la los atributos que no se pueden editar
const checkEditError = (body) => {
    return (body.cif !== undefined || body.date !== undefined || body.email !== undefined || body.id !== undefined );
}

exports.create_company = (req, res) => {
    const company = req.body
    Company.create(company)
        .then( data => {
            res.status(201).send(data);
        })
        .catch( error => {
            handleError(req, res, error);
        });
}

exports.edit_company = (req,res) => {
    const company = req.body;
    if (checkEditError(company)) {
        res.status(400).send({ message: "There are attributes in the request that cannot be changed"});
    } else {
        Company.update(company, {where: { id: req.params.id }})
            .then( data => {
                res.status(200).send({ message: 'Company modified successfully'});
            })
            .catch( error => {
                handleError(req, res, error);
            });
    }
}

exports.list_all_companies = (req, res) => {
    Company.findAll({ attributes: ['id', 'name', 'shortdesc', 'description', 'email', 'date', 'status', 'logo'] })
        .then( data => {
            res.status(200).send(data);
        })
        .catch( error => {
            handleError(req, res, error);
        });
}

exports.search_companies = (req, res) => {
    Company.findAll({
        where: {
          description: {
            [Op.like]: `%${req.query.keyword}%`
          }
        }
    }).then( data => {
        res.status(200).send(data);
    })
    .catch( error => {
        handleError(req, res, error);
    });
}