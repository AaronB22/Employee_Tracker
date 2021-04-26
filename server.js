const mysql = require('mysql');
const index = require('./index')
const cTable=require("console.table");
const inquirer = require('inquirer');
let depArr=[]
let roleArr=[]
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
   
    const getInfoFromDB=()=>{
        db.query(`select * from department`,(err,res)=>{
      
            for (let i=0; i<res.length; i++){
                const addTo=res[i].dep_name;
                depArr.push(addTo)
            }
            console.log(depArr)
        })
        db.query(`select * from emp_role`, (err,res)=>{
            for (let i=0; i<res.length; i++){
                const addTo=res[i].title;
                roleArr.push(addTo)
            }
            
        })
    }
  getInfoFromDB()

})
const viewTable=(table)=>{
        // for (let )
        if(table==='emp_role'||table==='department'){

            db.query(`select * from ${table}`,(err,res)=>{
                if(err){
                throw err
                }
               console.table(res)
            })
        }
        else{
            db.query(`select employees.id, employees.first_name, employees.last_name, emp_role.title, department.dep_name, emp_role.salary from department
            join emp_role on department.id=emp_role.id
            join employees on emp_role.id= employees.role_id;` ,(err,res)=>{
                if (err){
                    throw err
                }
                console.table(res)
            })
        }
   
}

const addData=(table, info)=>{
    switch (table){
        case "employees":
            db.query(`insert into employees (first_name, last_name, role_id) value ("${info[0]}","${info[1]}","${info[2]}")`)
            console.log("added to the database!")
            break;
        case "department":
            console.log(info)
            db.query(`insert into department(dep_name) value ("${info}")`)
            console.log("added to the database!")
            break;
        case 'emp_role':
            console.log('At server')
            console.log(info)
            db.query(`insert into emp_role(title, salary, department_id) value ("${info[0]}","${info[1]}","${info[2]}")`)    
    }
    
}
const updateRole=async()=>{
    inquirer
        .prompt([
            {
                name:'update prompt'
            }
        ])
}

async function getData(){
   

        const res = await index.selection()
        
        
   
    switch (res[0]){
        case 'Add':
            
            addData(res[1],res[2])
        break;
        case 'View':
            console.log(res[1])
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


module.exports= {depArr, roleArr};