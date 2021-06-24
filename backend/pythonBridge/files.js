const { spawn } = require('child_process');
const path = require('path')
const snooze = ms=> new Promise(resolve =>setTimeout(resolve,ms))

async function dataConvertion(filepath,filename){
inputAudioFile = path.join(filepath,"/public/pythonAudio/right.wav")
const dataToSend = {text:""}
const childPython = spawn('python', [path.join(__dirname,'python/script.py'), inputAudioFile]);

childPython.stdout.on('data', (data) => {
    dataToSend.text = data
});
console.log(dataToSend)
await snooze(20000)//delay of 20s
return dataToSend.text
}








async function combineFiles(data){
    let output={
        value:""
    }
    const python = spawn('python', [path.join(__dirname,'python/combine.py')]);
     python.stdout.on('data',async function(data){
        output.value = data.toString()
    })
    python.on('close',(code)=>{
       
    })   
    await snooze(1000)//delay of 20s
    return output.value
}

module.exports = {
    dataConvertion,combineFiles
}