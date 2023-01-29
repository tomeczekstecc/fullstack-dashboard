import React, {useState} from 'react'
import {useGetTransactionsQuery} from "../../state/api.js";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import Header from "../../components/Header.jsx";
import {Box, useTheme} from "@mui/material";

import DataGridCustomToolbar from "../../components/DataGridCustomToolbar.jsx";


const Transactions = () => {
    const theme = useTheme()

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(20)
    const [sort, setSort] = useState({})
    const [search, setSearch] = useState("")
    const [searchInput, setSearchInput] = useState("")
    const {data, error, isLoading} = useGetTransactionsQuery({
        page, pageSize, sort: JSON.stringify(sort), search
    })

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


    return (

        <Box m={"1.5rem 2.5rem"}>

            <Header title={"Transactions"} subtitle={'List of transactions'}/>
            <Box m={'40px'} height={"80vh"}
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

            > <DataGrid
                
                loading={isLoading || !data}
                getRowId={(row) => row._id}
                columns={columns}
                rows={data?.transactions || []}
                rowCount={data?.total || 0}
                rowsPerPageOptions={[10, 20, 50, 100]}
                paginationMode={'server'}
                pagination
                sortingMode={'server'}
                pageSize={pageSize}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                components={{
                    // Toolbar: GridToolbar //native toolbar,
                    Toolbar: DataGridCustomToolbar //custom toolbar
                }}
                componentsProps={{
                    toolbar: {
                        searchInput,
                        setSearchInput,
                        setSearch
                    }
                }}
                disableExtendRowFullWidth={false}


            /></Box>

        </Box>

    )
}


export default Transactions
