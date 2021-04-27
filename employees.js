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
                    message:'What Role?',
                    choices:database.roleArr  
                },
            ]).then((ans)=>{
                let id=''
                let mang=null
                for (let i=0; i<database.roleArr.length;i++){
                    if(ans.dep===database.roleArr[i]){
                        id=i+1
                    }
                }
                const gettingMang=()=>{
                    return new Promise((resolve,reject)=>{
                        
                        inquirer
                        .prompt([
                            {
                                name:"askForMang",
                                type:'list',
                                message:'Add employee\'s manager?',
                                choices:["Yes","No"]
                            }
                        ]).then((a)=>{
                            if (a.askForMang==="No"){
                                resolve()
                            }
                            if (a.askForMang==="Yes"){
                                inquirer
                                .prompt([
                                   {
                                       name:'mang',
                                       type:'list',
                                       message:'Who is there Manager?',
                                       choices:database.empArr
                                   }   
                               ]).then((an)=>{
                                   mang=an.mang
                                   resolve()
                               })
                            }
                        })
                    })
                }
                const askForMang= async()=>{
                    const getMang= await gettingMang();
                    
                    
                    const empArr=[ans.firstName,ans.lastName,id,mang]
                     res(empArr)
                }
                
               askForMang()


               
               
            })
        }) }
}

module.exports= Employee;