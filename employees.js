
class Employee{
  
    getEmployeeData(){
        return new Promise((res, rej)=>{

            const inquirer= require('inquirer')
            inquirer
            .prompt([
                {
                    name:"firstName",
                    type:"input",
                    message:"What is the Employee's first Name?"
                },
                {
                    name: 'lastName',
                    type:"input",
                    message:"What is the Employee's last name"
                }
            ]).then((ans)=>{

               const empArr=[ans.firstName,ans.lastName]
                res(empArr)
               
               
            })
        }) }
}

module.exports= Employee;