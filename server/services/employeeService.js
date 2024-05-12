const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');
const { SALT } = require('../config/config')

async function getEmployees() {
    return new Promise(async (resolve,reject)=>{
        await Employee.find().select("-password").then((employees)=>{
            resolve(employees)
        }).catch((err)=>{
            reject(err)
        })
        
    })
}
async function getEmployeeById(id) {
    return new Promise(async (resolve,reject)=>{
        await Employee.findById(id).select("-password").then((employee)=>{
            resolve(employee)
        }).catch((err)=>{
            reject(err)
        })
        
    })
}
async function addEmployee(name,email,password,phoneNumber){
    return new Promise(async (resolve,reject)=>{
        console.log(name);
        let employee = new Employee({
            name:name,
            email:email,
            password:password,
            phoneNumber:phoneNumber,
            isActive:true
        })
        await employee.save().then((rslt)=>{
            resolve(rslt);
        }).catch((err)=>{
            reject(err);
        })
    })
}
async function updateEmployee(id,data){
    return new Promise(async (resolve,reject)=>{
        let employee = await Employee.findById(id);
        if(!employee) {
            reject(`No employee with the id ${id}`);
        } else { 
            // let newData = {}
            // console.log(data.active);
            // if(data.password && data.password!==""){
            //     let salt = await bcrypt.genSalt(SALT);
            //     let hash = await bcrypt.hash(data.password, salt);            
            //     newData = {
            //         name:data.name || employee.name,
            //         email:data.email || employee.email,
            //         phoneNumber:data.phoneNumber || employee.phoneNumber,
            //         isActive:data.isActive || employee.isActive,
            //         password: hash
            //     }
            // }else{
            //     newData = {
            //         name:data.name || employee.name,
            //         email:data.email || employee.email,
            //         phoneNumber:data.phoneNumber || employee.phoneNumber,
            //         isActive:data.isActive || employee.isActive
            //     }
            // }
            // console.log(newData);
            if(data.password && data.password!==""){
                console.log(data);
                let salt = await bcrypt.genSalt(SALT);
                let hash = await bcrypt.hash(data.password, salt);  
                await employee.update({...data,password:hash}).then((updatedEmployee) =>{
                    resolve(updatedEmployee);
                }).catch((err)=>{
                    reject(err.message);
                })
            }else{
                await employee.update(data).then((updatedEmployee) =>{
                    resolve(updatedEmployee);
                }).catch((err)=>{
                    reject(err.message);
                })
            }
        }
    })
    
}
async function deleteEmployee(id){
    return new Promise(async (resolve, reject) => {
        await Employee.findOneAndDelete({_id:id})
            .then(async(user)=>{
                if(user){
                    resolve({msg:"Deleted"})
                }else{
                    reject({msg:"Invalid Employee!"});
                }
            })
            .catch((err)=>{
                reject(err.message);
            })
    })
}
module.exports = {
    getEmployees,
    addEmployee,
    updateEmployee,
    getEmployeeById,
    deleteEmployee
};
  