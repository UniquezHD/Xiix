import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import App from './App.tsx'

import "./App.css";
import './index.css'

import "./css/volume.css";
import "./css/addgame.css";
import "./css/options.css";
import "./css/settings.css";
import "./css/addgameusb.css";
import "./css/systeminfo.css";
import "./css/selecttheme.css";
import "./css/addgamesteam.css";
import "./css/restartservices.css";

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
        <MantineProvider>
          <Notifications/>
            <App />
        </MantineProvider>
  </BrowserRouter>
)

window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
