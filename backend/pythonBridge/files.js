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

module.exports = {
    dataConvertion
}