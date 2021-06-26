const { spawn } = require('child_process');


const inputAudioFile = 'right.wav'

//const childPython = spawn('python', ['--version']);
const childPython = spawn('python', ['noisered_silero.py', inputAudioFile]);
//const childPython = spawn('python',['hello.py', 'hey stupid']);  //this was working?

childPython.stdout.on('data', (data) => {
    console.log(`${data}`);
});

// childPython.stdout.on('data', (data) => {
//     console.error(`stderr: ${data}`);
// });

// childPython.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
// });