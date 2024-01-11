async function login( req, res ){

}

async function register( req, res ){
    const user = req.body.username;
    const pwd = req.body.password;
    const pwd2 = req.body.password2;

    if (!user || !pwd || !pwd2){
        res.status(400).send({status: 'error', message: "Los campos vacios no funcionan"});
    }

}

module.exports = {
    login, 
    register,
};