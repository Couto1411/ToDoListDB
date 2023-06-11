import './App.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Routes from './Routes'

const app = () =>
    <BrowserRouter>
        <div >
            <Routes />
        </div>
    </BrowserRouter>
export default app