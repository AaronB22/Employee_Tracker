const mysql = require('mysql');
const index = require('./index')
const cTable=require("console.table");
const inquirer = require('inquirer');
let depArr=[]
let roleArr=[]
let empArr=[]
const db =  mysql.createConnection({
    host: 'localhost',
    port:3306,
    user:'root',
    password:'password',
    database:'employeetracker_db'
})

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("MYSQL connected")
 
   
    
})

const getInfoFromDB=()=>{
    db.query(`select * from department`,(err,res)=>{
  
        for (let i=0; i<res.length; i++){
            const addTo=res[i].dep_name;
            depArr.push(addTo)
        }
      
    })
    db.query(`select * from emp_role`, (err,res)=>{
        for (let i=0; i<res.length; i++){
            const addTo=res[i].title;
            roleArr.push(addTo)
        }
        
    })
    db.query(`select * from employees`, (err,res)=>{
        for (let i=0; i<res.length; i++){
           const addTo= `${res[i].first_name} ${res[i].last_name}` 
               
        empArr.push(addTo)
        }
       
    })
}

getInfoFromDB()
const viewTable=(table)=>{
        
        switch (table){
            case 'employees':

                db.query(`select employees.id, employees.first_name, employees.last_name, emp_role.title, department.dep_name, emp_role.salary, employees.manager from department
                join emp_role on department.id=emp_role.department_id
                join employees on emp_role.id= employees.role_id` ,(err,res)=>{
                    if (err){
                        throw err
                    }
                    console.table(res)
                    getData()
                })
            break;
            case 'emp_role':
                db.query(`select  emp_role.id, emp_role.title, emp_role.salary, department.dep_name from emp_role
                join department on department.id=emp_role.department_id;`,(err,res)=>{
                    console.table(res)
                    getData()
                })
                
            break;
            case 'department':
                db.query(`select * from department`,(err,res)=>{
                    console.table(res)
                    getData()
                })
        }
        
      
       
}

const addData=(table, info)=>{
  
    switch (table){
        case "employees":
            db.query(`insert into employees (first_name, last_name, role_id, manager) value ("${info[0]}","${info[1]}","${info[2]}","${info[3]}")`)
            console.log("added to the database!")
            const addTo=[`${info[0]} ${info[1]}`]
            empArr.push(addTo)
       
            module.exports= {depArr, roleArr, empArr};
            getData()
            break;
        case "department":
         
            db.query(`insert into department(dep_name) value ("${info}")`)
            depArr.push(info)
            console.log("added to the database!")
            getData()
            break;
        case 'emp_role':
            db.query(`insert into emp_role(title, salary, department_id) value ("${info[0]}","${info[1]}","${info[2]}")`) 
            console.log("added to the database!")  
            roleArr.push(info[0])
            getData()
    }
    
}
const updateRole=async()=>{
    inquirer
        .prompt([
            {
                name:'update',
                type:'list',
                message:'What Role Do you Want to Update?',
                choices:roleArr
            },
            {
                name:'choice',
                type:'list',
                message:'What are you changeing',
                choices:["title","salary","Department"]
            },
          
        ]).then((ans)=>{
            let rolePicked=''
            for (let i=0;i<roleArr.length;i++){
                if(ans.update===roleArr[i]){
                    rolePicked=i +1
                }
            }
            switch(ans.choice){
                case 'title':
                    inquirer
                    .prompt([
                        {
                            name:'userChange',
                            type:'input',
                            message:'Change Title'
                        }
                    ]).then((ans)=>{
                        db.query(`UPDATE emp_role Set title = "${ans.userChange}" WHERE emp_role.id = ${rolePicked}`)
                        console.log(`${roleArr[rolePicked -1]} is now ${ans.userChange}`)
                        getData()
                    })
                break;
                case 'salary':
                    inquirer
                    .prompt([
                        {
                            name:'userChange',
                            type:'number',
                            message:'Change Salary'
                        }
                    ]).then((ans)=>{
                        db.query(`UPDATE emp_role Set salary = "${ans.userChange}" WHERE emp_role.id = ${rolePicked}`)
                        console.log(`${roleArr[rolePicked -1]} salary is now ${ans.userChange}`)
                        getData()
                    })
                break;
                case 'Department':
                    inquirer
                    .prompt([
                        {
                            name:'userChange',
                            type:'list',
                            message:'Change Department',
                            choices:depArr
                        }
                    ]).then((ans)=>{
                        let id=''
                        for (let i = 0; i<depArr.length; i++){
                            if (ans.userChange===depArr[i]){
                                id=i+1
                            }
                        }
                        
                        db.query(`UPDATE emp_role Set department_id = ${id} WHERE emp_role.id = ${rolePicked}`)
                        console.log(`${roleArr[rolePicked -1]} is now apart of ${depArr[id-1]}`)
                        getData()
                    })
                break;
                
            }
        })
}

async function getData(){
   

        const res = await index.selection()
        
        
   
    switch (res[0]){
        case 'Add':
            
            addData(res[1],res[2])
        break;
        case 'View':
           
            viewTable(res[1])
        break;

        case 'Update':
            switch(res[1]){
                case "emp_role":
                    updateRole()
                break;
            }
        break;
    }

 
  
}
getData()


module.exports= {depArr, roleArr, empArr};