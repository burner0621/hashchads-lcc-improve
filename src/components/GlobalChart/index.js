import React, { useState, useMemo, useEffect, useRef } from 'react'
import { ResponsiveContainer } from 'recharts'
import { timeframeOptions } from '../../constants'
import TradingViewChart, { CHART_TYPES } from '../TradingviewChart'
import { OptionButton } from '../ButtonStyled'
import { getTimeframe } from '../../utils'
import { ImpulseSpinner } from '../Impulse'
import { useTimeframe } from '../../hooks/useApplication'

import {useGlobalData, useGlobalChartData} from '../../hooks/useGlobalContext'

const CHART_VIEW = {
  VOLUME: 'Volume',
  LIQUIDITY: 'Liquidity',
}

const VOLUME_WINDOW = {
  WEEKLY: 'WEEKLY',
  DAYS: 'DAYS',
}
let isFetchingChartData = false;
const GlobalChart = ({ display }) => {
  const [loading, setLoading] = useState(true)
  // chart options
  const [chartView, setChartView] = useState(display === 'volume' ? CHART_VIEW.VOLUME : CHART_VIEW.LIQUIDITY)

  // time window and window size for chart
  const timeWindow = timeframeOptions.ALL_TIME
  const [volumeWindow, setVolumeWindow] = useState(VOLUME_WINDOW.DAYS)

  const {totalLiquidityUSD, oneDayVolumeUSD, volumeChangeUSD, liquidityChangeUSD, oneWeekVolume, weeklyVolumeChange} = useGlobalData()

  const [stateLiquidityChangeUSD, setStateLiquidityChangeUSD] = useState(0)
  const [stateTotalLiquidityUSD, setStateTotalLiquidityUSD] = useState(0)
  const [stateVolumeChangeUSD, setStateVolumeChangeUSD] = useState(0)
  const [stateOneDayVolumeUSD, setStateOneDayVolumeUSD] = useState()
  const [stateOneWeekVolume, setStateOneWeekVolume] = useState()
  const [stateWeeklyVolumeChange, setStateWeeklyVolumeChange] = useState()

  useEffect(() => {
    setStateLiquidityChangeUSD(liquidityChangeUSD)
    setStateTotalLiquidityUSD(totalLiquidityUSD)
    setStateVolumeChangeUSD(volumeChangeUSD ? volumeChangeUSD: '--')
    setStateOneDayVolumeUSD(oneDayVolumeUSD)
    setStateOneWeekVolume(oneWeekVolume)
    setStateWeeklyVolumeChange(weeklyVolumeChange)
  }, [totalLiquidityUSD, volumeChangeUSD, liquidityChangeUSD, oneDayVolumeUSD, oneWeekVolume, weeklyVolumeChange])
  // based on window, get starttim
  let utcStartTime = getTimeframe(timeWindow)

  // global historical data
  const [dailyData, weeklyData] = useGlobalChartData ()

  const [oldestDateFetch, setOldestDateFetched] = useState()
  const [activeWindow] = useTimeframe()
  
  /**
   * Keep track of oldest date fetched. Used to
   * limit data fetched until its actually needed.
   * (dont fetch year long stuff unless year option selected)
   */
  useEffect(() => {
    // based on window, get starttime
    let startTime = getTimeframe(activeWindow)

    if ((activeWindow && startTime < oldestDateFetch) || !oldestDateFetch) {
      setOldestDateFetched(startTime)
    }
  }, [activeWindow, oldestDateFetch])

  // fix for rebass tokens

  const chartDataFiltered = useMemo(() => {
    let currentData = volumeWindow === VOLUME_WINDOW.DAYS ? dailyData : weeklyData
    return (
      currentData &&
      Object.keys(currentData)
        ?.map((key) => {
          let item = currentData[key]
          if (item.date > utcStartTime) {
            return item
          } else {
            return true
          }
        })
        .filter((item) => {
          return !!item
        })
    )
  }, [dailyData, utcStartTime, volumeWindow, weeklyData])

  useEffect(() => {
    if (dailyData && chartDataFiltered && loading)
      setLoading(false)
  }, [dailyData, chartDataFiltered, loading]);

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

  return chartDataFiltered ? (
    <div className='flex justify-center items-center'>
      {dailyData && chartView === CHART_VIEW.LIQUIDITY && (
        <ResponsiveContainer aspect={60 / 28} ref={ref}>
          <TradingViewChart
            data={dailyData}
            base={stateTotalLiquidityUSD ? stateTotalLiquidityUSD : '--'}
            baseChange={stateLiquidityChangeUSD ? stateLiquidityChangeUSD : '--'}
            title="Liquidity"
            field="liquidity"
            width={width}
            type={CHART_TYPES.AREA}
          />
        </ResponsiveContainer>
      )}
      {chartDataFiltered && chartView === CHART_VIEW.VOLUME && (
        <ResponsiveContainer aspect={60 / 28} ref={ref}>
          <TradingViewChart
            data={chartDataFiltered}
            base={volumeWindow === VOLUME_WINDOW.WEEKLY ? (stateOneWeekVolume ? stateOneWeekVolume : 0) : (stateOneDayVolumeUSD ? stateOneDayVolumeUSD : 0)}
            baseChange={volumeWindow === VOLUME_WINDOW.WEEKLY ? stateWeeklyVolumeChange : stateVolumeChangeUSD}
            title={volumeWindow === VOLUME_WINDOW.WEEKLY ? 'Volume (7d)' : 'Volume'}
            field={volumeWindow === VOLUME_WINDOW.WEEKLY ? 'weeklyVolumeUSD' : 'dailyVolumeUSD'}
            width={width}
            type={CHART_TYPES.BAR}
            useWeekly={volumeWindow === VOLUME_WINDOW.WEEKLY}
          />
        </ResponsiveContainer>
      )}
      {display === 'volume' && (
        <div
          className='w-fit bottom-20 absolute left-5 z-10'
        >
          <OptionButton
            active={volumeWindow === VOLUME_WINDOW.DAYS}
            onClick={() => setVolumeWindow(VOLUME_WINDOW.DAYS)}
          >
            <div>D</div>
          </OptionButton>
          <OptionButton
            style={{ marginTop: '4px' }}
            active={volumeWindow === VOLUME_WINDOW.WEEKLY}
            onClick={() => setVolumeWindow(VOLUME_WINDOW.WEEKLY)}
          >
            <div>W</div>
          </OptionButton>
        </div>
      )}
    </div>
  ) : (
    <div className='flex justify-center items-center absolute self-center mt-24'>
      {loading &&
        <ImpulseSpinner />
      }
    </div>
  )
}

export default GlobalChart
