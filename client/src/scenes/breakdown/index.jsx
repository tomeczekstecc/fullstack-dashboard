import React, {useMemo} from 'react'
import {useGetSalesQuery} from "../../state/api.js";
import {Box, useTheme,} from "@mui/material";
import Header from "../../components/Header.jsx";
import BreakdownChart from "../../components/BreakdownChart.jsx";


const Breakdown = () => {
    const theme = useTheme()
    const {data} = useGetSalesQuery()


    return (
        <Box m={'1.5rem 2.5rem'}>
            <Header title={'Breakdown'} subtitle={'Breakdown of sales by category'}/>

            <Box
                height={'75vh'}
                mt={'40px'}>
                <BreakdownChart/>
            </Box>

        </Box>
    );
}


export default Breakdown
