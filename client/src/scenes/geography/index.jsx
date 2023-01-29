import {Box, useTheme} from "@mui/material";
import {useGetGeographyQuery} from "../../state/api";
import Header from "../../components/Header.jsx";
import {ResponsiveChoropleth} from "@nivo/geo";
import {geoData} from "../../state/geoData.js";

const Geography = () => {
    const theme = useTheme()

    const {data, error, isLoading} = useGetGeographyQuery()

    return (
        <Box m={"1.5rem 2.5rem"}>
            <Header title={"Geography"} subtitle={'Find where Your users are located'}/>
            <Box
                mt={"40px"}
                height={"75vh"}
                border={'1px solid ' + theme.palette.secondary[200]}
                borderRadius={"4px"}

            >
                {data ? <ResponsiveChoropleth
                    data={data}
                    theme={{
                        tooltip: {
                            container: {
                                color: 'red',
                                background: theme.palette.secondary[500],
                            }
                        },
                        axis: {
                            ticks: {
                                line: {
                                    stroke: 'green',
                                    strokeWidth: 1
                                },
                                text: {
                                    fill: 'red'
                                }
                            },
                            domain: {
                                line: {
                                    stroke: theme.palette.secondary[200]
                                }
                            },
                            legend: {
                                text: {
                                    fill: theme.palette.secondary[200]
                                }
                            }
                        }
                        , legends: {
                            text: {
                                fill: theme.palette.secondary[200]

                            }
                        }

                    }

                    }
                    features={geoData.features}
                    margin={{top: 0, right: 0, bottom: 0, left: 0}}
                    domain={[0, 60]}
                    unknownColor="#666666"
                    label="properties.name"
                    valueFormat=".2s"
                    projectionScale={196}
                    projectionTranslation={[0.4, 0.6]}
                    projectionRotation={[0, 0, 0]}
                    borderWidth={1.3}
                    borderColor="#fff"
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: true,
                            translateX: -10,
                            translateY: -10,
                            itemsSpacing: 0,
                            itemWidth: 94,
                            itemHeight: 18,
                            itemDirection: 'left-to-right',
                            itemTextColor: theme.palette.secondary[200],
                            itemOpacity: 0.85,
                            symbolSize: 18,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: theme.palette.primary[100],
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                /> : <h4>Loading...</h4>}

            </Box>

        </Box>
    )
}


export default Geography
