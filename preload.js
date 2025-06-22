const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('todoAPIs', {
    getAllTodos: (date) => {
        return ipcRenderer.invoke('getAllTodos', date);
    },
    postTodo: (todo) => {
        ipcRenderer.send('postTodo', todo);
    },
    updateTodo: (todo) => {
        ipcRenderer.send('updateTodo', todo);
    },
    deleteTodo: (todo) => {
        ipcRenderer.send('deleteTodo', todo);
    }
});