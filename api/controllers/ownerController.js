const fetch = require("node-fetch");
const apiToken = process.env.GOREST_TOKEN;

const getOwner = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`https://gorest.co.in/public-api/users/${id}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'authorization': `Bearer ${apiToken}`
            }
        })
        .then(response => response.json())
        .then( data => resolve(data))
        .catch( error => {
            reject(error);
        });
    })
}

const getOwnerPosts = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`https://gorest.co.in/public-api/users/${id}/posts`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'authorization': `Bearer ${apiToken}`
            }
        })
        .then(response => response.json())
        .then( data => resolve(data))
        .catch( error => {
            reject(error);
        });
    })
}



exports.list_owners = (req, res) => {
    const page = req.query.page || 1;

    fetch(`https://gorest.co.in/public-api/users?page=${page}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'authorization': `Bearer ${apiToken}`
        }
    })
    .then(response => response.json())
    .then( data => res.status(200).send(data))
    .catch( error => {
        res.status(500).send(error);
    })
}

exports.get_owner = async (req, res) => {
    const id = req.params.id;

    try {
        let owner = await getOwner(id);
        const posts = await getOwnerPosts(id);
        owner.data.posts = posts.data;
        res.status(200).send(owner);
    } catch (error) {
        res.status(500).send(error);
    }

}