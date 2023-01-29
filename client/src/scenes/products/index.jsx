import React, {useState} from 'react'
import {
    Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery
} from "@mui/material";
import {useGetProductsQuery} from "../../state/api.js";
import Header from '../../components/Header.jsx'


const Product = ({_id, name, description, price, rating, category, supply, stat}) => {
    const theme = useTheme()
    const [isExpanded, setIsExpanded] = useState(false)

    return (<Card sx={{
        backgroundImage: 'none', backgroundColor: theme.palette.background.alt, borderRadius: '0.55rem',

    }}>
        <CardContent>
            <Typography s={{fontSize: 14}}
                        color={theme.palette.secondary[700]} gutterBottom>
                {category}
            </Typography>
            <Typography variant={'h5'} component={'div'}>
                {name}
            </Typography>

            <Typography
                sx={{mb: 1.5}}
                color={theme.palette.secondary[400]}
            >
                ${Number(price).toFixed(2)}
            </Typography>

            <Rating value={rating} readOnly/>
            <Typography variant={'body2'} color={theme.palette.secondary[400]}>
                {description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button variant={'primary'} size={'small'} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Hide' : 'Show'} Details
            </Button>
        </CardActions>
        <Collapse in={isExpanded} timeout={'auto'} unmountOnExit
                  sx={{
                      color: theme.palette.neutral[300]
                  }}
        >
            <CardContent>
                <Typography>
                    id: {_id}
                </Typography> <Typography>
                Supply left: {supply}
            </Typography> <Typography>
                Yearly Sales this year: {stat[0].yearlySalesTotal}
            </Typography>
                Yearly Units Sold This Year : {stat[0].yearlyTotalSoldUnits}

            </CardContent>
        </Collapse>

    </Card>)
}

const Products = () => {

    const {data, isLoading} = useGetProductsQuery()
    console.log(data, 'data', isLoading, 'isLoading')
    const isNoneMobile = useMediaQuery('(min-width: 1000px)')


    return (<Box m={"1.5rem 2.5rem"}>
        <Header title={"PRODUCTS"}
                subtitle={"List of products"}
        />
        {data || !isLoading ? <Box mt={'20px'}
                                   display={'grid'}
                                   gridTemplateColumns="repeat(4,minmax(0, 1fr))"
                                   justifyContent={'space-between'}
                                   rowGap={'1.2rem'}
                                   columnGap={'1.4rem'}
                                   sx={{
                                       "& > div": {
                                           gridColumn: isNoneMobile ? undefined : 'span 4'
                                       }
                                   }}
            >
                {data?.map((product) => <Product key={product._id} {...product}/>)}

            </Box>


            : <Typography m={'2rem'} variant={'h5'} color={'secondary'} fontWeight={'bold'}>
                Loading...
            </Typography>}
    </Box>)
}


export default Products
