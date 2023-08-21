import React, { useState, useRef, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Area, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, BarChart, Bar } from 'recharts'

import { toK, toNiceDate, toNiceDateYear, formattedNum, getTimeframe } from '../../utils'
import { OptionButton } from '../ButtonStyled'
import { darken } from 'polished'
import { useMedia } from 'react-use'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import Chart from '../tradingview'
import { ImpulseSpinner } from '../Impulse'
import axios from 'axios'
const ChartWrapper = styled.div`
  height: 100%;
  min-height: 300px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 10px;
  background: #0b1217;
  @media screen and (max-width: 600px) {
    min-height: 200px;
  }
`

const CHART_VIEW = {
    VOLUME: 'Volume',
    LIQUIDITY: 'Liquidity',
    PRICE: 'Price',
    LINE_PRICE: 'Price (Line)',
}

const DATA_FREQUENCY = {
    DAY: 'DAY',
    HOUR: 'HOUR',
    LINE: 'LINE',
}

const TokenChart = (props) => {
    const { address, color, base, priceData, chartFilter, timeWindow, frequency, symbol, pWidth, pHeight } = props
    const textColor = 'white'
    
    const [chartData, setChartData] = useState([])
    const [dailyData, setDailyData] = useState([])
    const [hourlyData, setHourlyData] = useState([])

    const below1080 = useMedia('(max-width: 1080px)')
    const below800 = useMedia('(max-width: 800px)')
    const below600 = useMedia('(max-width: 600px)')

    const [isMobile, setIsMobile] = useState (false)
    const [isBook, setIsBook] = useState (false)
    useEffect (() => {
      setIsMobile (below600)
    }, [below600])
    useEffect (() => {
        setIsBook (below800)
      }, [below800])

    let utcStartTime = getTimeframe(timeWindow)
    const domain = [(dataMin) => (dataMin > utcStartTime ? dataMin : utcStartTime), 'dataMax']
    const aspect = below1080 ? 60 / 32 : isMobile ? 60 / 42 : 60 / 32

    // chartData = chartData?.filter((entry) => entry.timestampSeconds >= utcStartTime)
    const fetchData = useCallback(async () => {
        const utcEndTime = dayjs.utc()
        let utcStartTime = utcEndTime.subtract(1, 'year')
        let startTime = utcStartTime.startOf('minute').unix() - 1

        let response = await axios.get(`${process.env.API_URL}/tokens/get_token_prices_dh?address=${address}&from=${startTime}&to=${Date.now() / 1000}`)
        if (response.status === 200) {
            const data = response.data
            setDailyData(data.dailyData)
            setHourlyData(data.hourlyData)
        }
    }, [address])

    useEffect(() => {
        fetchData()
    }, [fetchData])
    useEffect(() => {
        if (chartFilter === CHART_VIEW.LIQUIDITY || chartFilter === CHART_VIEW.VOLUME) {
            let tmpData = dailyData?.filter((entry) => entry.timestampSeconds >= utcStartTime)
            setChartData(tmpData)
        } else if (chartFilter === CHART_VIEW.PRICE || chartFilter === CHART_VIEW.LINE_PRICE) {
            if (frequency === DATA_FREQUENCY.DAY) {
                let tmpData = dailyData?.filter((entry) => entry.timestampSeconds >= utcStartTime)
                setChartData(tmpData)
            } else if (frequency === DATA_FREQUENCY.HOUR) {
                let tmpData = hourlyData?.filter((entry) => entry.timestampSeconds >= utcStartTime)
                setChartData(tmpData)
            }
        }
    }, [timeWindow, hourlyData])
    // update the width on a window resize
    const ref = useRef()
    const isClient = typeof window === 'object'
    const [width, setWidth] = useState(ref?.current?.container?.clientWidth)

    useEffect(() => {
        if (!isClient) {
            return false
        }
        function handleResize() {
            setWidth(ref?.current?.container?.clientWidth ?? width)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [isClient, width]) // Empty array ensures that effect is only run on mount and unmount

    return (
        <ChartWrapper style={{height: isMobile?350:pHeight - 85}}>
            {chartFilter === CHART_VIEW.LIQUIDITY && chartData && chartData.length && (
                <ResponsiveContainer aspect={aspect}>
                    <AreaChart margin={{ top: 0, right: 40, bottom: 6, left: 0 }} barCategoryGap={1} data={chartData}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.35} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            tickLine={false}
                            axisLine={false}
                            interval="preserveEnd"
                            tickMargin={16}
                            minTickGap={120}
                            tickFormatter={(tick) => toNiceDate(tick)}
                            dataKey="timestampSeconds"
                            tick={{ fill: textColor }}
                            type={'number'}
                            domain={['dataMin', 'dataMax']}
                        />
                        <YAxis
                            type="number"
                            orientation="right"
                            tickFormatter={(tick) => '$' + toK(tick)}
                            axisLine={false}
                            tickLine={false}
                            interval="preserver"
                            minTickGap={80}
                            yAxisId={0}
                            tick={{ fill: textColor }}
                            // range={10}
                            // tickMargin={16}
                            domain="auto"
                        />
                        <Tooltip
                            cursor={true}
                            formatter={(val) => val ? formattedNum(val, true) : ""}

                            labelFormatter={(label) => toNiceDateYear(label)}
                            labelStyle={{ paddingTop: 4 }}
                            contentStyle={{
                                padding: '10px 14px',
                                borderRadius: 10,
                                borderColor: color,
                                color: 'black',
                            }}
                            wrapperStyle={{ top: -70, left: -10 }}
                        />
                        <Area
                            key={'other'}
                            dataKey={'liquidityUsd'}
                            stackId="2"
                            strokeWidth={2}
                            dot={false}
                            type="monotone"
                            name={'Liquidity'}
                            yAxisId={0}
                            stroke={darken(0.12, color)}
                            fill="url(#colorUv)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
            {chartFilter === CHART_VIEW.PRICE &&
                (frequency === DATA_FREQUENCY.LINE ? (
                    <ResponsiveContainer aspect={below1080 ? 60 / 42 : 60 / 32}>
                        <AreaChart margin={{ top: 0, right: 40, bottom: 6, left: 0 }} barCategoryGap={1} data={chartData}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color} stopOpacity={0.35} />
                                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                tickLine={false}
                                axisLine={false}
                                interval="preserveEnd"
                                tickMargin={16}
                                minTickGap={120}
                                tickFormatter={(tick) => toNiceDate(tick)}
                                dataKey="timestampSeconds"
                                tick={{ fill: textColor }}
                                type={'number'}
                                domain={domain}
                            />
                            <YAxis
                                type="number"
                                orientation="right"
                                tickFormatter={(tick) => '$' + toK(tick)}
                                axisLine={false}
                                tickLine={false}
                                interval="preserveEnd"
                                minTickGap={80}
                                yAxisId={0}
                                tick={{ fill: textColor }}
                            />
                            <Tooltip
                                cursor={true}
                                formatter={(val) => val ? formattedNum(val, true) : ""}
                                labelFormatter={(label) => toNiceDateYear(label)}
                                labelStyle={{ paddingTop: 4 }}
                                contentStyle={{
                                    padding: '10px 14px',
                                    borderRadius: 10,
                                    borderColor: color,
                                    color: 'black',
                                }}
                                wrapperStyle={{ top: -70, left: -10 }}
                            />
                            <Area
                                key={'other'}
                                dataKey={'avgUsd'}
                                stackId="2"
                                strokeWidth={2}
                                dot={false}
                                type="monotone"
                                name={'Price'}
                                yAxisId={0}
                                stroke={darken(0.12, color)}
                                fill="url(#colorUv)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : priceData && priceData.length ? (
                    <ResponsiveContainer aspect={pWidth/pHeight} ref={ref} style={{height: isBook?isMobile? 400:600:pHeight}}>
                        {/* <CandleStickChart data={priceData} width={width} base={base} /> */}
                        <Chart stock={"Stock"} interval="60" width={isMobile?pWidth - 16:pWidth - 8} height={isMobile?pHeight - 85:pHeight - 35} tokenId={address} symbol={symbol.toUpperCase() + "/USD"} />
                    </ResponsiveContainer>
                ) : (
                    // <LocalLoader />
                    <div className='d-flex items-center justify-center items-center'>
                        <ImpulseSpinner />
                    </div>
                ))}

            {chartFilter === CHART_VIEW.VOLUME && (
                <ResponsiveContainer aspect={aspect}>
                    <BarChart margin={{ top: 0, right: 10, bottom: 6, left: 10 }} barCategoryGap={1} data={chartData}>
                        <XAxis
                            tickLine={false}
                            axisLine={false}
                            interval="preserveEnd"
                            minTickGap={80}
                            tickMargin={14}
                            tickFormatter={(tick) => toNiceDate(tick)}
                            dataKey="timestampSeconds"
                            tick={{ fill: textColor }}
                            type={'number'}
                            domain={['dataMin', 'dataMax']}
                        />
                        <YAxis
                            type="number"
                            axisLine={false}
                            tickMargin={16}
                            tickFormatter={(tick) => '$' + toK(tick)}
                            tickLine={false}
                            orientation="right"
                            interval="preserveEnd"
                            minTickGap={80}
                            yAxisId={0}
                            tick={{ fill: textColor }}
                        />
                        <Tooltip
                            cursor={{ fill: color, opacity: 0.1 }}
                            formatter={(val) => val ? formattedNum(val, true) : ""}
                            labelFormatter={(label) => toNiceDateYear(label)}
                            labelStyle={{ paddingTop: 4 }}
                            contentStyle={{
                                padding: '10px 14px',
                                borderRadius: 10,
                                borderColor: color,
                                color: 'black',
                            }}
                            wrapperStyle={{ top: -70, left: -10 }}
                        />
                        <Bar
                            type="monotone"
                            name={'Volume'}
                            dataKey={'volumeUsd'}
                            fill={color}
                            opacity={'0.4'}
                            yAxisId={0}
                            stroke={color}
                        />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </ChartWrapper>
    )
}

export default TokenChart
