const fetch = require("node-fetch");
const sequelize = require('../../db');
const { Op } = require("sequelize");
const Favorite = sequelize.models.Favorite;
const Company = sequelize.models.Company;
const apiToken = process.env.GOREST_TOKEN;

const handleError = (req,res,error) => {
    if (error.name === "SequelizeUniqueConstraintError"){
        res.status(409).send(error);
    } else if (error.name === "SequelizeValidationError") {
        res.status(400).send(error);
    } else if (error.name === "SequelizeForeignKeyConstraintError") {
        res.status(404).send({ message: "Company not found"});
    } else {
        res.status(500).send(error);
    }
}

const isValidOwner = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`https://gorest.co.in/public-api/users/${id}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'authorization': `Bearer ${apiToken}`
            }
        })
        .then(response => response.json())
        .then( json => {
            if (json.code === 200) {
                resolve();
            } else {
                reject(json);
            }
        })
        .catch( error => {
            reject(error);
        })
    });
}

const isValidCompany = (id) => {
    return new Promise((resolve, reject) => {
        Company.findOne({ where: { id: id } })
            .then( company => {
                if (company !== null || company !== undefined) {
                    resolve();
                } else {
                    reject();
                }
            })
            .catch(error => {
                reject(error);
            })
    });
}



exports.set_favorite_company = (req, res) => {
    const favorite = req.body;

    isValidOwner(favorite.id_owner)
        .then(() => {
            isValidCompany(favorite.id_company)
                .then(() => {
                    Favorite.create(favorite)
                        .then( data => {
                            res.status(201).send(data);
                        })
                        .catch( error => {
                            handleError(req, res, error);
                        });
                })
        })
        .catch( error => {
            if(error.code === 404){
                res.status(404).send({ message: "Owner not found"});
            }
            res.status(500).send({ message: "Something is wrong"});
        });
}


exports.list_favorite_owner = (req, res) => {
    const id_owner = req.params.id_owner;
    Favorite.findAll({ where: { id_owner: id_owner}})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            handleError(req, res, error);
        });
}

exports.delete_favorite = (req, res) => {
    const id = req.params.id;
    Favorite.destroy({where: { id: id }})
        .then(favorite => {
            if( favorite ) {
                res.status(200).send({ message: "Favorite deleted succesfully"});
            } else {
                res.status(404).send({ message: "Favorite not found"});
            }
        })
        .catch(error => {
            handleError(req, res, error);
        })
}