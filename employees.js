class Employee{
    
    getEmployeeData(){
        return new Promise((res, rej)=>{
            
            const database= require('./server')
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
                },
                {
                    name:"dep",
                    type:'list',
                    message:'What Department?',
                    choices:database.roleArr  
                }
            ]).then((ans)=>{
                let id=''
                for (let i=0; i<database.roleArr.length;i++){
                    if(ans.dep===database.roleArr[i]){
                        id=i+1
                    }
                }
               
               const empArr=[ans.firstName,ans.lastName,id]
                res(empArr)
               
               
            })
        }) }
}

module.exports= Employee;