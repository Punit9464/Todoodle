if (require('electron-squirrel-startup')) return;

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

    if(win.maximizable) win.maximize();

    win.removeMenu();
    win.loadFile('home.html');
}

app.whenReady().then(() => {

    app.setName('Todoodle');
    app.getFileIcon(path.resolve(__dirname,'assets', 'Todoodle Icon.png'));

    createWindow();

    ipcMain.handle('getAllTodos', async function(event, args){
        const data = (await todoModel.find({ date: args }).lean());
        return data;
    });

    ipcMain.on('postTodo', async function(event, args){
        const newTodo = new todoModel({
            task: args.task
        });
        await newTodo.save();
        return;
    });

    ipcMain.on('updateTodo', async function(event, args) {
        const todo = await todoModel.findOne({ id: args });
        todo.isDone = !todo.isDone;
        await todo.save();
        return;
    });

    ipcMain.on('deleteTodo', async function(event, args) {
        await todoModel.findOneAndDelete({ id: args });
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


//Global Error handler
process.on('unhandledRejection', function(err){
    console.error(err);
});