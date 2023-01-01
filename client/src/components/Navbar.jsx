import React from "react";
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    ArrowDropUpOutlined,
    SettingsOutlined
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween.jsx";
import {setMode} from "../state/index.js";
import {AppBar, IconButton, InputBase, Toolbar, useTheme} from "@mui/material";
import {useDispatch} from "react-redux";

const Navbar = () => {
    const dispatch = useDispatch()
    const theme = useTheme()

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
                <IconButton onClick={() => console.log('open/close sidebar')}>
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

            </FlexBetween>
        </Toolbar>
    </AppBar>;
}


export default Navbar;
