import React, {useState} from 'react'
import {useGetSalesQuery} from "../../state/api.js";
import {Box, useTheme, FormControl, MenuItem, Select, InputLabel} from "@mui/material";
import Header from "../../components/Header.jsx";
import OverviewChart from "../../components/OverviewChart.jsx";


const Overview = () => {
    const theme = useTheme()
    const [view, setView] = useState('units')
    const {data, error, isLoading} = useGetSalesQuery()

    return (<Box m={"1.5rem 2.5rem"}>
        <Header title={'Overview'} subtitle={'Overview of general revenue and profit'}/>
        <Box height={'75vh'}>
            <FormControl
                sx={{mt: '1rem'}}>
                <InputLabel>view</InputLabel>
                <Select value={view} label={'view'} onChange={(e) => setView(e.target.value)}>
                    <MenuItem value={'sales'}>Sales</MenuItem>
                    <MenuItem value={'units'}>Units</MenuItem>
                </Select>
            </FormControl>
            <OverviewChart view={view}/>
        </Box>

    </Box>)
}

export default Overview
