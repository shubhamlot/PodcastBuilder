
const {spawn} = require('child_process')
const path = require('path')

 function dataConvertion(file){
    let datatoSend
    const python = spawn('python', [path.join(__dirname,'python/script.py')]);
     python.stdout.on('data',async function(data){
       
        datatoSend = data.toString()
        
    })
    python.on('close',(code)=>{
       
        console.log(datatoSend)
       return datatoSend 
    })   
}

function showdata(data){
    
    datatoSend = data
    return data
}

module.exports = {
    dataConvertion
}