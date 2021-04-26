
class Role{
    getRoleInfo(){
        return new Promise((res,rej)=>{
            const inquirer = require("inquirer")
            const database= require('./server')
            inquirer
            .prompt ([
                {
                    name:"role",
                    type:'input',
                    message:'Name of Role?'
                },
                {
                    name:'salary',
                    type:'number',
                    message:'Insert Salary'
                },
                {
                    name:'Dep',
                    type:'list',
                    message:"Choose Department",
                    choices: database.depArr
                }
            ]).then((ans)=>{
                if(!ans.salary){
                    console.log("Salary must be a number. No other character allowed.")
                    this.getRoleInfo()
                }
                else {
                    let id=''
                    for(let i =0; i<database.depArr.length;i++){
                        if(ans.Dep===database.depArr[i])
                        id=i+1
                    }
                 const returnArr= [ans.role, ans.salary,id]
                
                 res(returnArr)
                }
              
            })
        })
    }
}
module.exports = Role