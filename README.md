# Electron
When installing this, make sure to do the following steps:
1- Clone the repo as usual
2- run npm install from the root directory (basically the directory where you can see the contents folder and other js files)
3- run ./node_modules/.bin/electron-rebuild (please don't run any other commands between npm install and this)
4- run npm start and you should be good to go


# IMPORTANT
In main.js, there is a line of code that says "win.loadFile('./pages/TherapistDashboard.html')". You can change this path to the path of your HTML page so it is what is loaded upon running 'npm start'.
