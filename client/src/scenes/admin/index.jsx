import {useGetAdminsQuery} from "../../state/api.js";
import {Box, useTheme,} from "@mui/material";
import Header from "../../components/Header.jsx";
import {DataGrid} from "@mui/x-data-grid";
import CustomColumnMenu from "../../components/DataGridCustomColumnMenu.jsx";


const Admin = () => {
    const {data, error, isLoading} = useGetAdminsQuery()
    const theme = useTheme()
    const columns = [
        {field: '_id', headerName: 'ID', flex: 1},
        {field: 'country', headerName: 'Country', flex: .5},
        {field: 'city', headerName: 'City', flex: .5},
        {field: 'occupation', headerName: 'Occupation', flex: 1},
        {field: 'email', headerName: 'Email', flex: 1},
        {field: 'role', headerName: 'Role', flex: .5},
        {field: 'createdAt', headerName: 'Created At', flex: 1},
        {field: 'updatedAt', headerName: 'Updated At', flex: 1},
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
            <Header title={"Admins"} subtitle={'Managment'}/>
            <Box m={'40px'} height={"75vh"}> <DataGrid
                loading={isLoading}
                getRowId={(row) => row._id}
                components={{ColumnMenu: CustomColumnMenu}}
                columns={columns} rows={data || []}/></Box>
        </Box>
    )
}
export default Admin
