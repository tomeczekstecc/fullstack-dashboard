import {Box, useTheme} from '@mui/material'
import {useGetCustomersQuery} from "../../state/api.js";
import Header from "../../components/Header.jsx";
import {DataGrid} from "@mui/x-data-grid";


const Customers = (props) => {
    const theme = useTheme()
    const columns = [
        {field: '_id', headerName: 'ID', flex: 1},
        {field: 'name', headerName: 'Name', flex: 0.5},
        {field: 'email', headerName: 'Email', flex: 1},
        {
            field: 'phoneNumber', headerName: 'Phone', flex: 0.5, renderCell: (params) => {
                return params.value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
            }
        },
        {field: 'city', headerName: 'City', flex: .5},

        {field: 'country', headerName: 'Country', flex: 1},
        {field: 'occupation', headerName: 'Occupation', flex: 1},
        {field: 'role', headerName: 'Role', flex: 1}
    ]
    const {data, error, isLoading} = useGetCustomersQuery()
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
            <Header title={"Customers"} subtitle={'List of customers'}/>
            <Box m={'40px'} height={"75vh"}> <DataGrid
                loading={isLoading}
                getRowId={(row) => row._id}
                columns={columns} rows={data || []}/></Box>
        </Box>
    )
}

export default Customers
