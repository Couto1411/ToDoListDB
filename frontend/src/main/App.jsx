import './App.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Routes from './Routes'

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary:{
        main: '#bafff3',
        dark: '#c2cbc9'
      },
      secondary:{
        main: '#ffffff',
        dark: '#595959'
      }
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