
class Role{
    getRoleInfo(){
        return new Promise((res,rej)=>{
            const inquirer = require("inquirer")
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
                }
            ]).then((ans)=>{
                if(!ans.salary){
                    console.log("Salary must be a number. No other character allowed.")
                    this.getRoleInfo()
                }
                else {

                 const returnArr= [ans.role, ans.salary]
                
                 res(returnArr)
                }
              
            })
        })
    }
}
module.exports = Role