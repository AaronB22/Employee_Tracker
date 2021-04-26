class Departments{

    getDepData(){
        return new Promise((res,rej)=>{
            const inquirer= require('inquirer')
            inquirer
            .prompt([
                {
                    name:'depName',
                    type:'input',
                    message:'Insert Department Name:'
                }
                

                
            ]).then((ans)=>{
                res(ans.depName)
            })
        })
    }


}

module.exports = Departments