const sequelize = require('../../db');
const { Op } = require("sequelize");
const Companie = sequelize.models.Companie;

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

exports.create_companie = (req, res) => {
    const companie = req.body
    Companie.create(companie)
        .then( data => {
            res.status(201).send(data);
        })
        .catch( error => {
            handleError(req, res, error);
        });
}

exports.edit_companie = (req,res) => {
    const companie = req.body;
    if (checkEditError(companie)) {
        res.status(400).send("There are attributes in the request that cannot be changed");
    } else {
        Companie.update(companie, {where: { id: req.params.id }})
            .then( data => {
                res.status(200).send({'message': 'Companie modified successfully'});
            })
            .catch( error => {
                handleError(req, res, error);
            });
    }
}

exports.list_all_companies = (req, res) => {
    Companie.findAll({ attributes: ['name', 'shortdesc', 'description', 'email', 'date', 'status', 'logo'] })
        .then( data => {
            res.status(200).send(data);
        })
        .catch( error => {
            handleError(req, res, error);
        });
}

exports.search_companies = (req, res) => {
    Companie.findAll({
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