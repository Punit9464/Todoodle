const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const mongoose = require('mongoose');
const todoModel = require('./schema/todo');

const connectDB = async() => {
    await mongoose.connect('mongodb://localhost:27017/todoodle');
}

connectDB().then(() => {
    console.log("Database Connected Successfully");
}).catch((e) => {
    console.error("Error while connecting to database: ", e);
});

function createWindow() {
    const win = new BrowserWindow({
        height: 1200,
        width: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('home.html');
    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    ipcMain.handle('getAllTodos', async function(event, args){
        console.log(args);

        const data = await todoModel.find({ date: args });

        console.log(typeof data);

        return data;
    });

    ipcMain.on('postTodo', async function(event, args){
        const newTodo = new todoModel({
            task: args.task,
            date: args.date
        });
        await newTodo.save();
        return;
    });


    app.on('activate', function() {
        if(BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    app.quit();
});