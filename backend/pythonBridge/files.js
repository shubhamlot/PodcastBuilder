const { spawn } = require('child_process');
const path = require('path')
const snooze = ms=> new Promise(resolve =>setTimeout(resolve,ms))

async function dataConvertion(filename){
// inputAudioFile = path.join(filepath,"/public/pythonAudio/right.wav")
const dataToSend = {text:""}
const childPython = spawn('python', [path.join(__dirname,'python/script.py'),filename]);

childPython.stdout.on('data',async(data) => {
    console.log(data.toString())
    dataToSend.text = data.toString()
});
childPython.stderr.on('error', (data) => {
    console.log(data.toString())
});

await snooze(30000)//delay of 20s
return dataToSend.text
}


async function combineFiles(data){
    let output={
        value:""
    }
    const python = spawn('python', [path.join(__dirname,'python/combine.py'),JSON.stringify(data)]);
     python.stdout.on('data',async function(data){
        output.value = data.toString()
        console.log(output.value)
    })
    python.stderr.on('error',(data)=>{
       console.log(data)
    }) 
  
    await snooze(10000)//delay of 20s
    
    return output.value
}


module.exports = {
    dataConvertion,combineFiles
}