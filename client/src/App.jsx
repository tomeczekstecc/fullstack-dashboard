import {useMemo, useState} from 'react'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import {themeSettings} from './theme'
import {useSelector} from 'react-redux'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Dashboard from "./scenes/dashboard";
import Layout from "./scenes/layout";
import Products from "./scenes/products/index.jsx";
import Customers from "./scenes/customers/index.jsx";
import Transactions from "./scenes/transactions/index.jsx";
import Geography from "./scenes/geography/index.jsx";
import Overview from "./scenes/overview/index.jsx";
import Daily from "./scenes/daily/index.jsx";

function App() {
    const mode = useSelector((state) => state.global?.mode)
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

    return (
        <div className='app'>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Routes>
                        <Route element={<Layout/>}>
                            <Route path='/' element={<Navigate to={'/dashboard'} replace/>}/>
                            <Route path='/dashboard' element={<Dashboard/>}/>
                            <Route path='/products' element={<Products/>}/>
                            <Route path='/customers' element={<Customers/>}/>
                            <Route path='/transactions' element={<Transactions/>}/>
                            <Route path='/geography' element={<Geography/>}/>
                            <Route path='/overview' element={<Overview/>}/>
                            <Route path='/daily' element={<Daily/>}/>
                            <Route path='*' element={<h3>Not found</h3>}/>
                        </Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    )
}

export default App
