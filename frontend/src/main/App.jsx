import './App.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Routes from './Routes'

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  

const app = () =>
    <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
            <div id='main'>
                <Routes />
            </div>
        </BrowserRouter>
    </ThemeProvider>
export default app