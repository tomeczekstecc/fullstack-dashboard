import {useGetUserPerformanceQuery} from "../../state/api.js";
import {Box, useTheme,} from "@mui/material";
import {useSelector} from "react-redux";
import Header from "../../components/Header.jsx";
import {DataGrid} from "@mui/x-data-grid";
import CustomColumnMenu from "../../components/DataGridCustomColumnMenu.jsx";


const Performance = () => {
    const userId = useSelector(state => state.global.userId)
    const {data, isLoading} = useGetUserPerformanceQuery(userId)
    const theme = useTheme()
    const columns = [
        {field: '_id', headerName: 'ID', flex: 1},
        {field: 'userId', headerName: 'User ID', flex: .5},
        {field: 'createdAt', headerName: 'Made', flex: .5},
        {
            field: 'products', headerName: '# of products', flex: .5,
            sortable: false,
            renderCell: (params) => {
                return params.row.products?.length
            }
        },
        {
            field: 'cost', headerName: 'Cost', flex: .5,
            renderCell: (params) => {
                return `$${Number(params.value).toFixed(2)}`
            }
        },

    ]

    return (
        <Box m={"1.5rem 2.5rem"}
             sx={{
                 "& .MuiDataGrid-root": {
                     backgroundColor: theme.palette.background.alt,
                     border: 'none'
                 },
                 "& .MuiDataGrid-cell": {
                     borderBottom: 'none'
                 },
                 "& .MuiDataGrid-columnHeader": {
                     color: theme.palette.secondary[100],
                     borderBottom: 'none'
                 },
                 "& .MuiDataGrid-virtualScroller": {
                     backgroundColor: theme.palette.primary[700],
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
            <Header title={"PERFORMANCE"} subtitle={'Track your affilatesales'}/>
            <Box m={'40px'} height={"75vh"}>
                {data && <DataGrid
                    loading={isLoading}
                    getRowId={(row) => row._id}
                    components={{ColumnMenu: CustomColumnMenu}}

                    columns={columns} rows={data?.sales}/>}
            </Box>
        </Box>
    )
}
export default Performance
