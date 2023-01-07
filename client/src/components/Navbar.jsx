import React, {useState} from "react";
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined, ArrowDropDownOutlined
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween.jsx";
import {setMode} from "../state/index.js";
import {AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useTheme} from "@mui/material";
import {useDispatch} from "react-redux";
import profileImage from "../assets/profile.jpeg";

const Navbar = ({

                    user,
                    setIsSidebarOpen,
                }) => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return <AppBar sx={{
        position: 'static',
        background: 'none',
        boxShadow: 'none',
    }}>
        <Toolbar sx={{
            justifyContent: 'space-between',
        }}>
            {/* Left */}
            <FlexBetween>
                <IconButton onClick={() => setIsSidebarOpen(prev => !prev)}>
                    <MenuIcon/>
                </IconButton>
                <FlexBetween
                    backgroundColor={theme.palette.background.alt}
                    borderRadius={'9px'}
                    gap={'3rem'}
                    p={"0.1rem 1.5rem"}
                ><InputBase placeholder={"Search..."}/>
                    <IconButton>
                        <Search/>
                    </IconButton>
                </FlexBetween>
            </FlexBetween>
            {/* right */}
            <FlexBetween gap="1.5rem">
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === 'light' ? <LightModeOutlined sx={{
                        fontSize: '25px'
                    }}/> : <DarkModeOutlined sx={{
                        fontSize: '25px'
                    }}/>}
                </IconButton>
                <IconButton>
                    <SettingsOutlined
                        sx={{fontSize: '25px'}}
                    />
                </IconButton>
                <FlexBetween>
                    <Button sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textTransform: 'none',
                        gap: '1rem',
                    }} onClick={handleClick}>
                        <Box component={'img'} src={profileImage} alt={'profile'}
                             height='32px' width='32px' borderRadius={'50%'}
                             sx={{objectFit: 'cover'}}
                        />
                        <Box
                            textAlign={'left'}
                        >
                            <Typography fontSize={'0.85rem'} fontWeight={'bold'} sx={{
                                color: theme.palette.secondary[200]
                            }}>{user.name}
                            </Typography>
                            <Typography fontSize={'0.75rem'} sx={{
                                color: theme.palette.secondary[100]
                            }}>{user.occupation}
                            </Typography>
                        </Box>
                        <ArrowDropDownOutlined sx={{
                            color: theme.palette.secondary[300],
                            fontSize: '25px'
                        }}/>
                    </Button>
                    <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleClose} anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}>
                        <MenuItem onClick={handleClose}>
                            Logout
                        </MenuItem>
                    </Menu>
                </FlexBetween>
            </FlexBetween>
        </Toolbar>
    </AppBar>;
}


export default Navbar;
