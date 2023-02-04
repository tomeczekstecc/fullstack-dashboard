import React from 'react'
import {Box, Button, Typography, useTheme, useMediaQuery} from "@mui/material";
import FlexBetween from "../../components/FlexBetween.jsx";
import Header from "../../components/Header.jsx";
import {DataGrid} from "@mui/x-data-grid";
import OverviewChart from "../../components/OverviewChart.jsx";
import {useGetDashboardQuery} from "../../state/api.js";
import {DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic} from "@mui/icons-material";
import StatBox from "../../components/StatBox.jsx";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar.jsx";
import Breakdown from "../breakdown/index.jsx";
import BreakdownChart from "../../components/BreakdownChart.jsx";


const Dashboard = () => {
    const theme = useTheme()
    const isNoneMediumScreens = useMediaQuery("(min-width: 1200px)")
    const {data, isLoading} = useGetDashboardQuery()

    const columns = [
        {field: '_id', headerName: 'ID', flex: 1},
        {field: 'userId', headerName: 'UserId', flex: 1},
        {field: 'createdAt', headerName: 'Created at', flex: 1},

        {
            field: 'products', headerName: '# of products', flex: .5,
            sortable: false,
            renderCell: (params) => params.value.length
        },
        {
            field: 'cost', headerName: 'Cost', flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        }
    ]

    return <Box
        m={"1.5rem 2.5rem"}>
        <FlexBetween>
            <Header title={'DASHBOARD'} subtitle={'Overview all'}/>
            <Box>
                <Button
                    sx={{
                        backgroundColor: theme.palette.secondary.light,
                        color: theme.palette.background.paper,
                        fontSize: ".9rem",
                        fontWeight: 700,
                        padding: ".7rem 1.3rem",
                    }}
                >
                    <DownloadOutlined sx={{
                        mr: '10px'
                    }}/>
                    Download Report
                </Button>
            </Box>
        </FlexBetween>
        <Box
            mt={'20px'}
            display={'grid'}
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows={'160px'}
            gap={'20px'}
            sx={{
                "& > div": {
                    gridColumn: isNoneMediumScreens ? undefined : "span 12",
                }
            }}
        >
            <StatBox
                title={'Total Customers'}
                value={data && data?.totalCustomers}
                increase={'14%'}
                description={'Since last month'}
                icon={<Email sx={{
                    color: theme.palette.secondary[300],
                    fontSize: '26px'
                }}/>}
            /> <StatBox
            title={'Sales today'}
            value={data && data?.todayStats?.totalSales}
            increase={'21%'}
            description={'Since last month'}
            icon={<PointOfSale sx={{
                color: theme.palette.secondary[300],
                fontSize: '26px'
            }}/>}

        />
            <Box
                gridColumn="span 8"
                gridRow={'span 2'}
                backGroundColor={theme.palette.background.alt}
                p={'1rem'}

            >
                <OverviewChart view={'sales'} isDashboard={true}/>
            </Box>
            <StatBox
                title={'Monthly Sales'}
                value={data && data?.thisMonthStats?.totalSales}
                increase={'14%'}
                description={'Since last month'}
                icon={<PersonAdd sx={{
                    color: theme.palette.secondary[300],
                    fontSize: '26px'
                }}/>}
            /> <StatBox
            title={'Yearly Sales'}
            value={data && data?.yearlySalesTotal}
            increase={'43%'}
            description={'Since last month'}
            icon={<Traffic sx={{
                color: theme.palette.secondary[300],
                fontSize: '26px'
            }}/>}
        />
            {/*/Row 2*/}
            <Box
                gridColumn="span 8"
                gridRow={'span 3'}
                p={'1rem'}
                sx={{
                    "& .MuiDataGrid-root": {
                        border: 'none'
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: 'none'
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: 'none'
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.background.alt,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: 'none'
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`
                    }

                }}
            >

                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    columns={columns}
                    rows={data?.transactions || []}
                />
            </Box>
            <Box
                gridColumn="span 4"
                gridRow={'span 3'}
                backGroundColor={theme.palette.background.alt}
                p={'1.5rem'}
                borderRadius={'.55px'}
            >
                <Typography
                    variant={'h6'}
                    sx={{
                        color: theme.palette.secondary[100],
                        fontWeight: 700,
                        mb: '1rem'
                    }}
                >
                    Sales by Category
                </Typography>
                <BreakdownChart isDashboard={true}
                                fontSize={'.8rem'}
                                sx={{
                                    color: theme.palette.secondary[200],
                                }}

                />
                Breakdown of real-time sales by category
                <Typography p={'0 0 .6rem'}


                >

                </Typography>

            </Box>
        </Box>
    </Box>
}

export default Dashboard
