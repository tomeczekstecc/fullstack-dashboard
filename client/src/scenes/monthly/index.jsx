import React, {useState, useMemo} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import {useGetSalesQuery} from "../../state/api.js";
import {Box, useTheme,} from "@mui/material";
import Header from "../../components/Header.jsx";
import OverviewChart from "../../components/OverviewChart.jsx";
import ReactDatePicker from 'react-datepicker'
import {ResponsiveLine} from "@nivo/line";

const Daily = () => {
    const theme = useTheme()
    const [startDate, setStartDate] = useState(new Date("2021/01/01"));
    const [endDate, setEndDate] = useState(new Date("2021/02/28"));
    const {data, isLoading} = useGetSalesQuery()
    const [formattedData] = useMemo(() => {
        if (!data) return []
        const {dailyData} = data
        const totalSalesLine = {
            id: 'sales',
            color: theme.palette.secondary.main,
            data: []
        }
        const totalUnitsLine = {
            id: 'units',
            color: theme.palette.secondary[600],
            data: []
        }
        Object.values(dailyData).forEach(({date, totalSales, totalUnits}) => {
            console.table({date, totalSales, totalUnits})


            const dateFormatted = new Date(date)
            if (dateFormatted >= startDate && dateFormatted <= endDate) {
                const splitDate = date.substring(date.indexOf('-') + 1)
                totalSalesLine.data = [...totalSalesLine.data, {x: splitDate, y: totalSales}]
                totalUnitsLine.data = [...totalUnitsLine.data, {x: splitDate, y: totalUnits}]
            }
        })

        const formattedData = [totalSalesLine, totalUnitsLine]
        return [formattedData]

    }, [data, startDate, endDate])
    return (
        <Box m={'1.5rem 2.5rem'}>

            <Header title={'DAILY SALES'} subtitle={'Chart of daily sales'}/>
            <Box height={'75vh'}>
                <Box display={'flex'} justifyContent={'flex-end'}>
                    <Box>
                        <ReactDatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        /></Box>
                    <Box>

                        <ReactDatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        />
                    </Box>
                </Box>
                {data ? <ResponsiveLine
                    data={formattedData}
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

                    }}
                    margin={{top: 50, right: 50, bottom: 70, left: 60}}
                    xScale={{type: 'point'}}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: false,
                        reverse: false
                    }}
                    colors={{datum: 'color'}}
                    yFormat=" >-.2f"
                    curve="catmullRom"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 90,
                        legend: 'Day',
                        legendOffset: 60,
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: `Total`,
                        legendOffset: -50,
                        legendPosition: 'middle'
                    }}
                    enableGridX={false}
                    enableGridY={false}
                    pointSize={10}
                    pointColor={{theme: 'background'}}
                    pointBorderWidth={2}
                    pointBorderColor={{from: 'serieColor'}}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={
                        [{
                            anchor: 'top-right',
                            direction: 'column',
                            justify: false,
                            translateX: 50,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }]
                    }
                /> : <h2>Loading...</h2>}
            </Box>


        </Box>
    );
}


export default Daily
