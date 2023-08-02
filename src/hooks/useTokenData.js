import { useContext, useEffect } from 'react'

import { getPercentChange } from "../utils"

import { TokenDataContext } from '../contexts/TokenData'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { timeframeOptions } from '../constants'
import fetch from 'cross-fetch'

dayjs.extend(utc)

export function useTokenDataContext() {
  return useContext(TokenDataContext)
}

const getTokenData = async (tokenId) => {
  let data = {}
  try {
    let response = await fetch(`https://api.saucerswap.finance/tokens/prices/latest/${tokenId}?interval=DAY`)
    if (response.status === 200) {
      let jsonData = await response.json()
      data.tvlHbar = jsonData.liquidity
      data.tvlUsd = jsonData.liquidityUsd
      data.volumeHbar = jsonData.volume
      data.volumeUsd = jsonData.volumeUsd
      data.priceUsd = jsonData.closeUsd

      let nowData = Date.now()
      let response1 = await fetch(`https://api.saucerswap.finance/tokens/prices/${tokenId}?interval=DAY&from=${jsonData.timestampSeconds - 86400 * 2}&to=${jsonData.timestampSeconds}`)
      if (response1.status === 200) {
        let jsonData1 = await response1.json()
        data.oneDayTvlHbar = jsonData1[0]['liquidity']
        data.oneDayTvlUsd = jsonData1[0]['liquidityUsd']
        data.oneDayVolumeHbar = jsonData1[0]['volume']
        data.oneDayVolumeUsd = jsonData1[0]['volumeUsd']
        data.oneDayPriceUsd = jsonData1[0]['closeUsd']

        data.priceChangeUsd = getPercentChange(data.priceUsd ?? 0, data.oneDayPriceUsd ?? 0)
        data.liquidityChangeUsd = getPercentChange(data.tvlUsd ?? 0, data.oneDayTvlUsd ?? 0)
        data.volumeChangeUsd = getPercentChange(data.volumeUsd ?? 0, data.oneDayVolumeUsd ?? 0)
      }
    }
  } catch (e) {
    console.log(e)
  }
  return data
}

const getTokenChartData = async (tokenId) => {
  const utcEndTime = dayjs.utc()
  let utcStartTime = utcEndTime.subtract(1, 'year')
  let startTime = utcStartTime.startOf('minute').unix() - 1

  try {
    let response = await fetch(`https://api.saucerswap.finance/tokens/prices/${tokenId}?interval=DAY&from=${startTime}&to=${Date.now() / 1000}`)
    if (response.status === 200) {
      let jsonData = await response.json()
      let res = await fetch(`https://api.saucerswap.finance/tokens/prices/${tokenId}?interval=HOUR&from=${startTime}&to=${Date.now() / 1000}`)
      if (res.status === 200) {
        let jsonData1 = await res.json ()
        return [jsonData, jsonData1]
      }
      return [jsonData, undefined]
    } else {
      return [undefined, undefined]
    }
  } catch (e) {
    return [undefined, undefined]
  }
}

export function useTokenData(tokenAddress) {
  const [state, { update }] = useTokenDataContext()
  const tokenData = state?.[tokenAddress]

  useEffect(() => {
    if (!tokenData) {
      getTokenData(tokenAddress).then((data) => {
        if (data.length > 0) update(tokenAddress, data)
      })
    }
  }, [tokenAddress, tokenData, update])

  return tokenData || {}
}

export function useTokenChartData(tokenAddress) {
  const [state, { updateChartData }] = useTokenDataContext()
  const dailyData = state?.[tokenAddress]?.dailyData
  const hourlyData = state?.[tokenAddress]?.hourlyData
  useEffect(() => {
    async function checkForChartData() {
      if (!dailyData || !hourlyData) {
        let [dailyData, hourlyData] = await getTokenChartData(tokenAddress)
        updateChartData(tokenAddress, dailyData, hourlyData)
      }
    }
    if (!dailyData || dailyData.length === 0 || !hourlyData || hourlyData.length === 0) checkForChartData()
  }, [dailyData, hourlyData, tokenAddress, updateChartData])
  return [dailyData, hourlyData]
}

/**
 * get candlestick data for a token - saves in context based on the window and the
 * interval size
 * @param {*} tokenAddress
 * @param {*} timeWindow // a preset time window from constant - how far back to look
 * @param {*} interval  // the chunk size in seconds - default is 1 hour of 3600s
 */
export function useTokenPriceData(tokenAddress, timeWindow, interval = 3600) {
  const [state, { updatePriceData }] = useTokenDataContext()
  const chartData = state?.[tokenAddress]?.[timeWindow]?.[interval]

  useEffect(() => {
    const currentTime = dayjs.utc()
    const windowSize = timeWindow === timeframeOptions.MONTH ? 'month' : 'week'
    const startTime =
      timeWindow === timeframeOptions.ALL_TIME ? 1589760000 : currentTime.subtract(1, windowSize).startOf('min').unix()

    async function fetchData() {
      let res = await fetch(`https://api.saucerswap.finance/tokens/prices/${tokenAddress}?interval=HOUR&from=${startTime}&to=${Date.now() / 1000}`)
      if (res.status === 200) {
        let data = await res.json()
        updatePriceData(tokenAddress, data, timeWindow, interval)
      }
    }
    if (!chartData) {
      fetchData()
    }
  }, [chartData, interval, timeWindow, tokenAddress, updatePriceData])

  return chartData
}
