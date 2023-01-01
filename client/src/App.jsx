import {useMemo, useState} from 'react'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import {themeSettings} from './theme'
import {useSelector} from 'react-redux'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Dashboard from "./scenes/Dashboard";
import Layout from "./scenes/Layout";

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
                            <Route path='*' element={<h3>Not found</h3>}/>
                        </Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    )
}

export default App
