import { app, BrowserWindow, ipcMain, safeStorage } from 'electron';
import path from 'node:path';
import fs from 'node:fs/promises';
import started from 'electron-squirrel-startup';

const STORE_FILE = path.join(app.getPath('userData'), 'amplify-auth.enc');
const FALLBACK_PREFIX = Buffer.from('PLAIN:');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: true,
      sandbox: true
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

async function readStore(): Promise<Record<string, string>> {

  try {
    const fileBuffer = await fs.readFile(STORE_FILE);

    if (fileBuffer.subarray(0, FALLBACK_PREFIX.length).equals(FALLBACK_PREFIX)) {
      return JSON.parse(fileBuffer.subarray(FALLBACK_PREFIX.length).toString('utf8'));
    }

    const { result, shouldReEncrypt } = await safeStorage.decryptStringAsync(fileBuffer);
    const parsed = JSON.parse(result);

    if (shouldReEncrypt) {
      await writeStore(parsed);
    }

    return parsed;
  } catch {
    return {};
  }
}

async function writeStore(data: Record<string, string>): Promise<void> {
  const serialized = JSON.stringify(data);

  const isAvailable = await safeStorage.isAsyncEncryptionAvailable();

  if (!isAvailable) {
    throw new Error('OS async encryption is not available');
  }

  const fileBuffer = await safeStorage.encryptStringAsync(JSON.stringify(data));
  await fs.writeFile(STORE_FILE, fileBuffer);
}

ipcMain.handle('store:set', async (_e, key: string, value: string) => {
  const store = await readStore();
  store[key] = value;
  await writeStore(store);
});

ipcMain.handle('store:get', async (_e, key: string) => {
  const store = await readStore();
  return store[key] ?? null;
});

ipcMain.handle('store:remove', async (_e, key: string) => {
  const store = await readStore();
  delete store[key];
  await writeStore(store);
});

ipcMain.handle('store:clear', async () => {
  await fs.rm(STORE_FILE, { force: true });
});