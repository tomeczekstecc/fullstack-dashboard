import {Box, Typography, useTheme} from "@mui/material";
import FlexBetween from "./FlexBetween.jsx";

const StatBox = ({title, value, increase, icon, description}) => {
    const theme = useTheme()
    return <Box
        gridColumn="span 2"
        gridRow='span 1'
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        p={'1.5rem 1rem'}
        flex='1 1 100%'
        backgroundColor={theme.palette.background.alt}
        borderRadius={'.55rem'}
    >
        <FlexBetween>
            <Typography variant={'h6'}
                        sx={{
                            color: theme.palette.text.secondary[100],
                        }}
            >{title}</Typography>

            {icon}
        </FlexBetween>
        <Typography variant={'h3'}
                    fontWeight={600}
                    sx={{
                        color: theme.palette.text.secondary[200],
                    }}>
            {value}
        </Typography>
        <FlexBetween
            gap={'1rem'}>
            <Typography variant={'h5'}
                        fontStyle={'italic'}
                        sx={{
                            color: theme.palette.text.light,
                        }}>
                {increase}
            </Typography>
            <Typography variant={'h5'}>
                {description}
            </Typography>
        </FlexBetween>
    </Box>
}
export default StatBox
