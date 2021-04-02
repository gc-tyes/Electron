# Electron
When installing this, make sure to do the following steps:
1- Clone the repo as usual
1.5- cd into the Electron directory
2- run npm install from the root directory (basically the directory where you can see the contents folder and other js files)
3- run ./node_modules/.bin/electron-rebuild (please don't run any other commands between npm install and this)
4- run npm start and you should be good to go


# IMPORTANT
In main.js, there is a line of code that says "win.loadFile('./WebPages/TherapistDashboard.html')". You can change this path to the path of your HTML page so it is what is loaded upon running 'npm start'.


# Study Instructions
Do everything under the IMPORTANT heading, but manually stop running with ^C and re-run for each new user. (Sorry.)

[Database](https://tyes-web-478b4.firebaseio.com)
