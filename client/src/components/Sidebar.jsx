import React, {useState, useEffect} from 'react'

import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";

import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined
} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import FlexBetween from "./FlexBetween.jsx";
import profileImage from "../assets/profile.jpeg";

const Sidebar = ({
                     drawerWidth,
                     isSidebarOpen,
                     setIsSidebarOpen,
                     isNoneMobile,
                 }) => {
    const {pathname} = useLocation()
    const [active, setActive] = useState('')
    const navigate = useNavigate()
    const theme = useTheme()

    useEffect(() => {
        setActive(pathname.substring(1))
    }, [pathname])


    return <Box
        component={'nav'}>
        {isSidebarOpen && (
            <Drawer
                open={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                variant={'persistent'}
                anchor={'left'}
                sx={{
                    width: drawerWidth,
                    "& .MuiDrawer-paper": {
                        color: theme.palette.text.secondary[200],
                        width: drawerWidth,

                        backgroundColor: theme.palette.background.alt,
                        boxSizing: 'border-box',
                        borderWidth: isNoneMobile ? 0 : '2px',
                    }

                }}
            />)}
    </Box>

}
export default Sidebar
