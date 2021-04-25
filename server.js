const mysql = require('mysql');
const index = require('./index')
const cTable=require("console.table");
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
const viewTable=(x)=>{
    
    db.query(`select * from ${x}`,(err,res)=>{
        if(err){
        throw err
        }
        console.table(res)  
    })
   
}

const addData=(table, info)=>{
    switch (table){
        case "employees":
            db.query(`insert into employees (first_name, last_name) value ("${info[0]}","${info[1]}")`)
            console.log("added to the database!")
            break;
        case "department":
            db.query(`insert into department(dep_name) value ("${info}")`)
            console.log("added to the database!")
            break;
            
    }
    
}

async function getData(){
   

        const res = await index.selection()
        
        
   
    switch (res[0]){
        case 'Add':
            
            addData(res[1],res[2])
        break;
        case 'View':
            viewTable(res[1],)
        break;
    }

   
}
getData()



