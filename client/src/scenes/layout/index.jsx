import React, {useState} from 'react'
import {Box, useMediaQuery} from "@mui/material";
import {Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import {useGetUserQuery} from "../../state/api.js";


const Layout = () => {
    const isNoneMobile = useMediaQuery('(min-width: 600px)')
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)   // state for sidebar
    const userId = useSelector(state => state.global.userId) // get userId from global state

    const {data} = useGetUserQuery(userId) // get user data from api

    return <Box display={isNoneMobile ? 'flex' : 'block'} width={'100%'} height={'100%'}>
        <Sidebar
            user={data || {}}
            isNoneMobile={isNoneMobile}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            drawerWidth={'250px'}

        >Test </Sidebar>
        <Box flex={1}>
            <Navbar
                user={data || {}}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Outlet/>
        </Box>
    </Box>
}

export default Layout
