/*
    Description: This file is the main entry point for the Electron application. 
    It creates the main window and loads the index.html file.
*/

// Import modules with the `require` function
const { app, BrowserWindow, ipcMain, session } = require('electron'); 
const path = require('path'); 

let csrfToken = null;

// Fetch the CSRF token from the Django server
async function fetchCsrfToken() {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch("http://localhost:8000/get-csrf-token/", {
      credentials: "include", // Ensure cookies are included
    });
    const data = await response.json();
    csrfToken = data.csrfToken;
    console.log("CSRF Token fetched:", csrfToken);

    // Set the CSRF cookie in Electron
    const cookie = {
      url: 'http://localhost',
      name: 'csrftoken',
      value: csrfToken,
      path: '/',
      httpOnly: false,
      secure: false
    };
    session.defaultSession.cookies.set(cookie, (error) => {
      if (error) {
        console.error('Error setting CSRF cookie:', error);
      } else {
        console.log('CSRF cookie set successfully');
      }
    });

    // Log all cookies to verify
    session.defaultSession.cookies.get({ url: 'http://localhost' })
      .then(cookies => {
        console.log('All cookies:', cookies);
      }).catch(error => {
        console.error('Error getting cookies:', error);
      });

  } catch (error) {
    console.error("Error fetching CSRF token:", error);
  }
}

fetchCsrfToken(); // Call this when your Electron app starts

// Create Main Window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('index.html');

  // When + button is clicked on landing page, open the add person window
  ipcMain.on('open-add-person', () => {
    const addPersonWindow = new BrowserWindow({
      width: 400,
      height: 300,
      parent: mainWindow,
      modal: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        enableRemoteModule: false,
        nodeIntegration: false
      }
    });
    addPersonWindow.loadFile('add_person.html'); // Loads the add_person.html pop up

    // Listen for the message to close the add person window
    ipcMain.on('close-add-person-window', () => {
      addPersonWindow.close();
    });

    addPersonWindow.on('closed', () => {
      ipcMain.removeAllListeners('close-add-person-window');
    });
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
