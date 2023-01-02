import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise( async (resolve, reject) => {
        try{
            let hashPasswordFromBcrypt = await hasUserPassword(data.password);
            await db.User.create({
                password: hashPasswordFromBcrypt,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender,
                roleId: data.roleId, 
                positionId: data.positionId, 
            })

                resolve('OK create a new User Cucceed ! ')

        }catch(e){
            reject(e);
        }
    })
    
}
let hasUserPassword = (password) => {
    
    return new Promise( async (resolve, reject) => {
        try{
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }catch(e){
            reject(e);
        }

    })
}
let getAllUser = () => {
    return new Promise( async (resolve, reject) => {
        try{
            let users = db.User.findAll({
                raw: true,
            });
            resolve (users)
        }catch(e){
            reject(e)
        }
    })
}
let getUserInfoBId = (userId) => {
    return new Promise( async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: userId},
                raw: true,
            })
            if(user){
                resolve(user)
            }else{
                resolve({})
            }
        }catch(e) {
            reject(e);
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id:data.id}
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);

            }else{
                resolve();
            }
           
        }catch(e){
            console.log(e);
        }
    })
}
let deleteUserById = (userId) => {
    return new Promise  (async (resolve, reject ) => {
        try{
            let user = await db.User.findOne({
                where: {id: userId}
            })
            if(user){ 
               await user.destroy();
            }
            resolve();
        }catch(e){
            reject(e);
        }
    })
}
module.exports = {
    createNewUser:createNewUser,
    getAllUser:getAllUser,
    getUserInfoBId,getUserInfoBId,
    updateUserData: updateUserData,
    deleteUserById:deleteUserById,
}