import { createContext, useContext, useEffect, useState } from 'react'

import { PairDataContext } from '../contexts/PairContext'
import { useAllPairsInSaucerswap } from './useGlobalContext'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function safeAccess(object, path) {
  return object
    ? path.reduce(
      (accumulator, currentValue) => (accumulator && accumulator[currentValue] ? accumulator[currentValue] : null),
      object
    )
    : null
}

function usePairDataContext() {
  return useContext(PairDataContext)
}

const getPairChartData = async (pairAddress, pairId) => {
  const utcEndTime = dayjs.utc()
  let utcStartTime = utcEndTime.subtract(1, 'year').startOf('minute')
  let startTime = utcStartTime.unix() - 1

  try {
    let response = await fetch(`https://api.saucerswap.finance/pools/conversionRates/${pairId}?interval=DAY&from=${startTime}&to=${Date.now() / 1000}`)
    if (response.status === 200) {
      const dailyData = await response.json()
      response = await fetch(`https://api.saucerswap.finance/pools/conversionRates/${pairId}?interval=HOUR&from=${startTime}&to=${Date.now() / 1000}`)
      if (response.status === 200) {
        const hourlyData = await response.json()
        return [hourlyData, dailyData]
      }
      return [undefined, dailyData]
    }
  } catch (e) {
    return []
  }
}

/**
 * Get all the current and 24hr changes for a pair
 */
export function usePairData(pairAddress) {
  const [state, { updatePairData }] = usePairDataContext()
  const pairData = state?.[pairAddress]?.pairData
  const _allPairs = useAllPairsInSaucerswap()
  let pairId = -1
  let _pair = {}

  useEffect(() => {
    async function fetchData() {
      for (let pair of _allPairs) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (pair.contractId === pairAddress) { pairId = pair.id; _pair = pair; break }
      }
      if (Number(pairId) > -1) {
        let data = await getPairData(pairId, _pair)
        data && updatePairData(pairAddress, data)
      }
    }
    if ((!pairData || pairData.length > 0) && pairAddress && _allPairs) {
      fetchData()
    }
  }, [pairAddress, pairData, updatePairData, _allPairs])

  return pairData || {}
}
async function getPairData(pairId, pair) {
  let res = await fetch(`${process.env.API_URL}/pools/conversionRates/latest/${pairId}?interval=DAY`)
  if (res.status === 200) {
    let jsonData = await res.json()
    for (let key of Object.keys(pair)) {
      jsonData[key] = pair[key]
    }
  return jsonData
  }
  return []
}

export function usePairChartData(poolId) {
  const _allPairs = useAllPairsInSaucerswap()
  const pairAddress = _allPairs[poolId]?.contractId
  const [state, { updateChartData }] = usePairDataContext()
  const dailyChartData = state?.[pairAddress]?.dailyChartData
  const hourlyChartData = state?.[pairAddress]?.hourlyChartData

  useEffect(() => {
    async function checkForChartData() {
      if (!dailyChartData || !hourlyChartData) {
        const [hourlyData, dailyData] = await getPairChartData(pairAddress, poolId)
        updateChartData(pairAddress, hourlyData, dailyData)
      }
    }
    checkForChartData()
  }, [hourlyChartData, dailyChartData, pairAddress, poolId, updateChartData])

  return [hourlyChartData, dailyChartData]
}

/**
 * Get list of all pairs in Uniswap
 */
export function useAllPairData() {
  const [state] = usePairDataContext()
  return state || {}
}
