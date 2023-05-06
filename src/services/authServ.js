'use strict'

const jwt = require('jsonwebtoken');

exports.generateToken = async (data) =>{
    const token = await jwt.sign(data, process.env.SECRET_JWT, {expiresIn: '1d'});
    return token;
};

exports.decodeToken = async (token) =>{
    var data = await jwt.verify(token,process.env.SECRET_JWT);
    return data;
};

exports.authorize = (req, res, next) =>{
    try{
        const{authorization} = req.headers;
            if(!authorization){
                return res.send(401);
            }
            const partes = authorization.split(" ");
            if(partes.length !== 2){
                return res.status(401);
            }
            const [schema,token] = partes
            if(schema !== 'Bearer'){
                return res.status(401);
            }
            jwt.verify(token,process.env.SECRET_JWT, async(error, decode) =>{
                if (error) {
                    return res.status(401).send({ message: "Token inválido" });
                  }

              
                return next();
            })
            
          
        } catch (error){
            res.status(500).send(error.message);
        }
}