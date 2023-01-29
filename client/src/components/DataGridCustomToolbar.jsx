import {
    GridToolbarContainer, GridToolbarExport, GridToolbarDensitySelector, GridToolbarColumnsButton
} from "@mui/x-data-grid";
import {Search} from "@mui/icons-material";
import {IconButton, TextField, InputAdornment} from "@mui/material";
import FlexBetween from "./FlexBetween.jsx";

const DataGridCustomToolbar = ({searchInput, setSearchInput, setSearch}) => {

    return (<GridToolbarContainer>
        <FlexBetween width={'100%'}>
            <FlexBetween>
                <GridToolbarColumnsButton/>
                <GridToolbarDensitySelector/>
                <GridToolbarExport/>
            </FlexBetween>
            <TextField
                variant={'standard'}
                label={'...search'}
                sx={{
                    mb: "0.5rem", width: "15rem"
                }}
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                InputProps={{
                    endAdornment: (<InputAdornment position="end">
                        <IconButton
                            onClick={() => {
                                setSearch(searchInput)
                                setSearchInput('')
                            }}
                        >
                            <Search/>
                        </IconButton>
                    </InputAdornment>)
                }}
            >

            </TextField>
        </FlexBetween>

    </GridToolbarContainer>)
}

export default DataGridCustomToolbar
