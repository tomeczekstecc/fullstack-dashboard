import React, {useState} from 'react'
import {Box, useMediaQuery} from "@mui/material";
import {Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";

const Layout = () => {
    const isNoneMobile = useMediaQuery('(min-width: 600px)')
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)   // state for sidebar


    return <Box display={isNoneMobile ? 'flex' : 'block'} width={'100%'} height={'100%'}>
        <Sidebar
            isNoneMobile={isNoneMobile}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            drawerWidth={'250px'}

        >Test </Sidebar>
        <Box flex={1}>
            <Navbar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Outlet/>
        </Box>
    </Box>
}

export default Layout
