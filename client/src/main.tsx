import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import App from './App.tsx'
import './index.css'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
        <MantineProvider>
            <App />
        </MantineProvider>
  </BrowserRouter>
)

window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
