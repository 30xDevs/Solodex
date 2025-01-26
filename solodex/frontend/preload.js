const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => ipcRenderer.send(channel, data)
});

window.addEventListener('DOMContentLoaded', () => {
  // Preload script content
  const addButton = document.getElementById('add-button');
  if (addButton) {
    addButton.addEventListener('click', () => {
      ipcRenderer.send('open-add-person');
    });
  }
});
