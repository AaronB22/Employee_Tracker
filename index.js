const inquirer = require('inquirer');
const Departments = require('./departments');
const Employee = require('./employees');





const selection=()=> {
    return new Promise((res, rej)=>{
        inquirer
            .prompt([{
                name:'firstSelection',
                type:'list',
                choices: ['Add Employee','Add Departments','Add Roles', 'View Employees','View Roles','View Departments','Update Roles'],
                message:'What Do wan to Do?',
            }]).then((ans)=>{
                
                let pickedValue= ans.firstSelection;
                let table='';
                let type= '';
                let returnArr= '';
              
                switch(pickedValue){
                    case 'Add Employee':
                        table="employees"
                        type="Add"
                        const getEmp= async()=>{
                            const newEmp = new Employee
                            const getInfo= await newEmp.getEmployeeData()
                            
                            returnArr=[type,table,getInfo];
                            res(returnArr)
                        }
                        getEmp()
                    break;
                    case 'Add Departments':
                        table="department";
                        type="Add"
                        const getDep= async()=>{
                            const newDep= new Departments
                            const getDepInfo= await newDep.getDepData()
                            returnArr=[type,table,getDepInfo]
                            
                            res(returnArr)
                        }
                        getDep()
                    break;
                    case 'Add Roles':
                        
                    break;
                    case 'View Employees':
                       type="View"
                        table="employees"
                        returnArr=[type, table]
                       res(returnArr)
                    break;
                    case 'View Roles':
                        
                    break;
                    case 'View Departments':
                        type="View"
                        table="department"
                        returnArr=[type, table]
                        res(returnArr)
                    break;
                    case 'Update Roles':
                        
                    break;
                }
                
            })
            
            
    })

}


module.exports ={selection}

