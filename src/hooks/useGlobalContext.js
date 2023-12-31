import { useContext, useEffect, useState } from 'react'

import { GlobalDataContext } from '../contexts/GlobalContext';

import { client } from '../apollo/client'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import fetch from 'cross-fetch'
import axios from 'axios'

import { useTimeframe } from './useApplication'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import socketIO from 'socket.io-client';
import {
  getTimeframe,
  getPercentChange,
  getBlockFromTimestamp
} from '../utils'
import {
  ETH_PRICE,
} from '../apollo/queries'
const ETH_PRICE_KEY = 'ETH_PRICE_KEY'

// const socket = socketIO.connect(process.env.BASE_URL);
// const priceSocket = socketIO.connect(process.env.BASE_URL, { path: '/prices' });
// format dayjs with the libraries that we need
dayjs.extend(utc)
dayjs.extend(weekOfYear)

export function useGlobalDataContext() {
  return useContext(GlobalDataContext)
}

// const interval = setInterval (async() => {
//   await getHbarAndSaucePrice ()
// }, 5000)

let isFetching = false;
export function useGlobalData() {
  const [state, { update, updateAllPairsInSaucerswap, updateAllTokensInSaucerswap, updateHbarAndSaucePrice, updatePrices }] = this.useGlobalDataContext()
  const [tmpPrices, setTmpPrices] = useState([])
  const [hbarPrice, saucePrice] = useHbarAndSaucePrice()
  const tokenDailyVolume = useTokenDailyVolume()
  const priceChanges = usePriceChanges()

  const data = state?.globalData

  useEffect(() => {
    async function fetchPrices() {
      const res = await axios.get(`${process.env.API_URL}/tokens/get_hbar_prices`)
      if (res.status === 200) {
        const tmp = res.data
        setTmpPrices (tmp)
        updatePrices(tmp);
      }
    }
    fetchPrices ()
    
    // socket.on('getPricesResponse', (p) => {
    //   setTmpPrices(p)
    //   updatePrices(p);
    //   if (p && p.length > 0) socket.disconnect()
    // });
  }, [updatePrices]);

  useEffect(() => {
    async function fetchData() {
      let globalData = await getGlobalData(tmpPrices, hbarPrice)

      globalData && update(globalData)

      let allPairs = await getAllPairsOnSaucerswap()
      if (allPairs && allPairs.length > 0) updateAllPairsInSaucerswap(allPairs)
      let allTokens = await getAllTokensOnSaucerswap(allPairs, tokenDailyVolume, priceChanges, hbarPrice)
      if (allTokens && allTokens.length > 0) updateAllTokensInSaucerswap(allTokens)

      let [hbarP, sauceP] = await getHbarAndSaucePrice()
      if (hbarP > 0 && sauceP > 0) updateHbarAndSaucePrice(hbarP, sauceP)
      isFetching = false;
    }
    if (data === undefined && hbarPrice && tmpPrices && tmpPrices.length > 0) {
      if (!isFetching) {
        fetchData()
        isFetching = true
      }
    }
  }, [hbarPrice, priceChanges, tokenDailyVolume, tmpPrices])

  return data || {}
}

let isFetchingGetHbarAndSaucePrice = false
export async function getHbarAndSaucePrice() {
  if (!isFetchingGetHbarAndSaucePrice) {
    try {
      isFetchingGetHbarAndSaucePrice = true
      let response = await axios.get(`${process.env.API_URL}/tokens/all`)
      if (response.status === 200) {
        const jsonData = response.data
        try {
          isFetchingGetHbarAndSaucePrice = false
          return [Number(jsonData[0]['priceUsd']), Number(jsonData[2]['priceUsd'])];
        } catch (error) {
          isFetchingGetHbarAndSaucePrice = false
          return [0, 0]
        }
      }
      isFetchingGetHbarAndSaucePrice = false
      return [0, 0]
    } catch (e) {
      isFetchingGetHbarAndSaucePrice = false
      return [0, 0]
    }
  }
  return [0, 0]
}

export async function getAllPairsOnSaucerswap() {
  try {
    let pairs = []
    let response = await axios.get(`${process.env.API_URL}/pools/all`)
    if (response.status === 200) {
      const jsonData = await response.data;
      pairs = jsonData;
    }
    return pairs
  } catch (e) {
    return []
  }
}

export async function getAllTokensOnSaucerswap(_allPairs, tokenDailyVolume, priceChanges, hbarPrice) {
  try {
    let tokens = [], tmpTokens = []
    let rlt = []
    let response = await axios.get(`${process.env.API_URL}/tokens/all`)
    if (response.status === 200) {
      const jsonData = await response.data;
      tokens = jsonData;
      for (let token of tokens) {
        if (tokenDailyVolume && Object.keys(tokenDailyVolume).length > 0) {
          token['oneDayVolumeUSD'] = Number(tokenDailyVolume[token['id']]) * (hbarPrice !== undefined ? Number(hbarPrice).toFixed(4) : 0)
          token['priceChangeUSD'] = Number(priceChanges[token['id']])
        }
        else {
          token['oneDayVolumeUSD'] = 0
          token['priceChangeUSD'] = 0
        }
        tmpTokens.push(token)
      }

      let _tokenData = {}
      if (_allPairs)
        for (let pair of _allPairs) {
          if (_tokenData[pair.tokenA.id]) {
            _tokenData[pair.tokenA.id]['liquidity'] += Number(pair.tokenReserveA) / Math.pow(10, Number(pair.tokenA.decimals)) * Number(pair.tokenA.priceUsd)
          } else {
            _tokenData[pair.tokenA.id] = {}
            _tokenData[pair.tokenA.id]['liquidity'] = Number(pair.tokenReserveA) / Math.pow(10, Number(pair.tokenA.decimals)) * Number(pair.tokenA.priceUsd)
          }
          if (_tokenData[pair.tokenB.id]) {
            _tokenData[pair.tokenB.id]['liquidity'] += Number(pair.tokenReserveB) / Math.pow(10, Number(pair.tokenB.decimals)) * Number(pair.tokenB.priceUsd)
          } else {
            _tokenData[pair.tokenB.id] = {}
            _tokenData[pair.tokenB.id]['liquidity'] = Number(pair.tokenReserveB) / Math.pow(10, Number(pair.tokenB.decimals)) * Number(pair.tokenB.priceUsd)
          }
        }

      for (let token of tmpTokens) {
        if (_tokenData[token['id']]) {
          token['liquidity'] = Number(_tokenData[token['id']]['liquidity'])
          rlt.push(token)
        }
      }
      return rlt
    } else {
      return []
    }
  } catch (e) {
    console.error('getAllTokensOnSaucerswap error', e)
    return []
  }
}

export function useTokenDailyPriceData() {
  const [state, { updateDailyPriceData }] = this.useGlobalDataContext()
  const dailyPriceData = state?.dailyPriceData
  // priceSocket.emit('dailyPriceData')
  // useEffect(() => {
  //   priceSocket.on('getDailyPriceData', (p) => {
  //     updateDailyPriceData(p);
  //     if (p && Object.keys(p).length > 0) priceSocket.disconnect()
  //   });
  // })
  return dailyPriceData || {}
}
let isUseHbarAndSaucePrice = false;
export function useHbarAndSaucePrice() {
  const [state, { updateHbarAndSaucePrice }] = this.useGlobalDataContext()
  const hBarPrice = state?.hBarPrice
  const saucePrice = state?.saucePrice;
  if (!hBarPrice) {
    if (!isUseHbarAndSaucePrice) {
      try {
        isUseHbarAndSaucePrice = true
        getHbarAndSaucePrice().then((value) => {
          if (value[0] > 0 && value[1] > 0) updateHbarAndSaucePrice(value[0], value[1])
          isUseHbarAndSaucePrice = false
        })
      } catch (e) {
        isUseHbarAndSaucePrice = false
      }
    }
  }
  return [hBarPrice, saucePrice]
}

export function usePrices() {
  const [state] = this.useGlobalDataContext()
  let prices = state?.prices
  return prices
}

export function useEthPrice() {
  const [state, { updateEthPrice }] = this.useGlobalDataContext()
  const ethPrice = state?.[ETH_PRICE_KEY]
  const ethPriceOld = state?.['oneDayPrice']
  useEffect(() => {
    async function checkForEthPrice() {
      if (!ethPrice) {
        let [newPrice, oneDayPrice, priceChange] = await getEthPrice()
        updateEthPrice(newPrice, oneDayPrice, priceChange)
      }
    }
    checkForEthPrice()
  }, [ethPrice, updateEthPrice])

  return [ethPrice, ethPriceOld]
}

let isGettingPairs = false;
export function useAllPairsInSaucerswap() {
  const [state, { updateAllPairsInSaucerswap }] = this.useGlobalDataContext()
  let allPairs = state?.allPairs
  // useEffect(() => {
  async function fetchData() {
    let allPairData = await getAllPairsOnSaucerswap()
    if (allPairData && allPairData.length > 0) updateAllPairsInSaucerswap(allPairData)
    isGettingPairs = false
  }
  if (!allPairs || allPairs?.length === 0) {
    if (!isGettingPairs) {
      fetchData()
      isGettingPairs = true
    }
  }
  // }, [allPairs])
  return allPairs || []
}

let isFetchingUsePriceChanges = false;
export function usePriceChanges() {
  const [state, { updatePriceChange }] = this.useGlobalDataContext()
  let priceChange = state?.priceChange

  if (!priceChange || priceChange?.length === {}) {
    if (!isFetchingUsePriceChanges) {
      try {
        isFetchingUsePriceChanges = true
        axios.get(`${process.env.API_URL}/tokens/get_price_changes`).then((response) => {
          if (response.status === 200) {
            updatePriceChange(response.data)
            isFetchingUsePriceChanges = false
          } else {
            isFetchingUsePriceChanges = false
          }
        })
      } catch (e) {
        isFetchingUsePriceChanges = false
      }
    }
  }
  return priceChange;
}

let isFetchingUseTokenDailyVolume = false
export function useTokenDailyVolume() {

  const [state, { updateTokenDailyVolume }] = this.useGlobalDataContext()
  let tokenDailyVolume = state?.tokenDailyVolume

  if (tokenDailyVolume === undefined || tokenDailyVolume === {}) {
    if (!isFetchingUseTokenDailyVolume) {
      try {
        isFetchingUseTokenDailyVolume = true
        axios.get(`${process.env.API_URL}/tokens/get_daily_volumes`).then((response) => {
          if (response.status === 200) {
            updateTokenDailyVolume(response.data)
            isFetchingUseTokenDailyVolume = false
          } else {
            isFetchingUseTokenDailyVolume = false
          }
        })
      } catch (e) {
        isFetchingUseTokenDailyVolume = false
      }
    }
  }
  return state?.tokenDailyVolume
}

// export function dispatchTokenDailyVolume (dailyVolData) {
//   updateTokenDailyVolume(dailyVolData)
// }

export function usePairDailyVolume() {
  const [state, { updatePairDailyVolume }] = this.useGlobalDataContext()
  let pairDailyVolume = state?.pairDailyVolume
  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get(`${process.env.API_URL}/pools/get_daily_volumes`)

        if (response.status === 200) {
          const dailyVolData = await response.data;
          updatePairDailyVolume(dailyVolData)
        }
      } catch (e) {
        console.log(e)
      }
    }
    if (pairDailyVolume === undefined || pairDailyVolume.length === 0) {
      fetchData()
    }
  }, [updatePairDailyVolume, pairDailyVolume])
  return pairDailyVolume || {}
}

export function usePairWeeklyVolume() {
  const [state, { updatePairWeeklyVolume }] = this.useGlobalDataContext()
  let pairWeeklyVolume = state?.pairWeeklyVolume
  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get(`${process.env.API_URL}/pools/get_weekly_volumes`)

        if (response.status === 200) {
          const dailyVolData = await response.data;
          updatePairWeeklyVolume(dailyVolData)
        }
      } catch (e) {
        console.log(e)
      }
    }
    if (pairWeeklyVolume === undefined || pairWeeklyVolume.length === 0) {
      fetchData()
    }
  }, [updatePairWeeklyVolume, pairWeeklyVolume])
  return pairWeeklyVolume || {}
}

let isUseAllTokensInSaucerswap = false
export function useAllTokensInSaucerswap() {
  const [state, { updateAllTokensInSaucerswap }] = this.useGlobalDataContext()
  const tokenDailyVolume = useTokenDailyVolume()
  const priceChanges = usePriceChanges()
  const [hbarPrice, saucePrice] = useHbarAndSaucePrice()
  const _allPairs = useAllPairsInSaucerswap()

  let allTokens = state?.allTokens || []

  useEffect(() => {
    async function fetchData() {
      let data = await getAllTokensOnSaucerswap(_allPairs, state?.tokenDailyVolume, priceChanges, hbarPrice)
      if (data && data.length > 0) updateAllTokensInSaucerswap(data)
      isUseAllTokensInSaucerswap = false
    }
    if ((allTokens === undefined || allTokens?.length === 0) && state?.tokenDailyVolume && priceChanges && _allPairs && hbarPrice > 0 && !isUseAllTokensInSaucerswap) {
      fetchData()
      isUseAllTokensInSaucerswap = true
    }
  }, [priceChanges, tokenDailyVolume, hbarPrice, _allPairs])
  return allTokens;
}

export function useGlobalChartData() {
  const [state, { updateChart, updatePrices }] = this.useGlobalDataContext()
  const [oldestDateFetch, setOldestDateFetched] = useState()
  const [activeWindow] = useTimeframe()
  const [tmpPrices, setTmpPrices] = useState([])

  const chartDataDaily = state?.chartData?.daily
  const chartDataWeekly = state?.chartData?.weekly

  // useEffect(() => {
  //   socket.on('getPricesResponse', (p) => {
  //     setTmpPrices(p)
  //     updatePrices(p);
  //   });
  // }, [updatePrices]);

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

  /**
   * Fetch data if none fetched or older data is needed
   */
  useEffect(() => {
    async function fetchData() {
      // historical stuff for chart
      const [newChartData, newWeeklyData] = await getChartData(oldestDateFetch, tmpPrices)
      updateChart(newChartData, newWeeklyData)
    }
    if (oldestDateFetch && !(chartDataDaily && chartDataWeekly) && tmpPrices && tmpPrices.length > 0) {
      fetchData()
    }
  }, [chartDataDaily, tmpPrices, chartDataWeekly, oldestDateFetch, updateChart])

  return [chartDataDaily, chartDataWeekly]
}

export async function getGlobalData(prices, hbarPrice) {
  let data = {}
  try {
    let now_date = Date.now()
    data.totalVolumeUSD = 0
    data.totalVolumeHBAR = 0
    data.totalLiquidityUSD = 0
    data.totalLiquidityHbar = 0
    data.todayVolumeUSD = 0
    let nowData_totalVolumeUSD = 0
    let nowWeekData_totalVolumeUSD = 0
    let oneDayData_totalVolumeUSD = 0
    let oneWeekData_totalVolumeUSD = 0
    let totalLiquidityUSD = 0
    let oneDay_totalLiquidityUSD = 0
    let liquidityChangeUSD = 0
    try {
      let response = await axios.get(`${process.env.API_URL}/stats`)
      if (response.status === 200) {
        const jsonData = await response.data;
        try {
          data.totalVolumeHBAR = (Number(jsonData['tvl']) / 100000000).toFixed(4);
          data.totalVolumeUSD = Number(jsonData['tvlUsd']).toFixed(4);
        } catch (error) {
          console.log(error)
        }
      }
    } catch (e) {
      console.log(e)
    }

    try {
      let response = await axios.get(`${process.env.API_URL}/stats/get_daily_volumes`)
      if (response.status === 200) {
        let jsonData = await response.data;
        data.todayVolumeUSD = Number(jsonData[0]['dailyVolume'] / 100000000).toFixed(4)
      }
    } catch (e) {
      console.log(e)
    }

    try {
      let response = await axios.get(`${process.env.API_URL}/stats/get_interval_info?field=VOLUME&interval=DAY&from=${now_date / 1000 - 86400 * 4}&to=${now_date / 1000}`)
      if (response.status === 200) {
        let jsonData = await response.data;
        nowData_totalVolumeUSD = (Number(jsonData[jsonData.length - 1]['valueHbar']) / 100000000 * prices[prices.length - 2][1]).toFixed(4)
        oneDayData_totalVolumeUSD = (Number(jsonData[jsonData.length - 2]['valueHbar']) / 100000000 * prices[prices.length - 3][1]).toFixed(4)
      }
    } catch (e) {
      console.log(e)
    }

    try {
      let response = await axios.get(`${process.env.API_URL}/stats/get_interval_info?field=VOLUME&interval=WEEK&from=${now_date / 1000 - 86400 * 30}&to=${now_date / 1000}`)
      if (response.status === 200) {
        let jsonData = await response.data;
        nowWeekData_totalVolumeUSD = (Number(jsonData[jsonData.length - 1]['valueHbar']) / 100000000 * prices[prices.length - 2][1]).toFixed(4)
        oneWeekData_totalVolumeUSD = (Number(jsonData[jsonData.length - 2]['valueHbar']) / 100000000 * prices[prices.length - 3][1]).toFixed(4)
      }
    } catch (e) {
      console.log(e)
    }

    try {
      let response = await axios.get(`${process.env.API_URL}/stats/get_interval_info?field=LIQUIDITY&interval=DAY&from=${now_date / 1000 - 86400 * 3}&to=${now_date / 1000}`)
      if (response.status === 200) {
        let jsonData = await response.data;
        totalLiquidityUSD = (Number(jsonData[jsonData.length - 1]['valueHbar']) / 100000000 * prices[prices.length - 2][1]).toFixed(4)
        oneDay_totalLiquidityUSD = (Number(jsonData[jsonData.length - 2]['valueHbar']) / 100000000 * prices[prices.length - 3][1]).toFixed(4)

        liquidityChangeUSD = getPercentChange(
          totalLiquidityUSD,
          oneDay_totalLiquidityUSD
        )
      }
    } catch (e) {
      console.log(e)
    }

    if (nowData_totalVolumeUSD && oneDayData_totalVolumeUSD) {
      const volumeChangeUSD = getPercentChange(
        nowData_totalVolumeUSD,
        oneDayData_totalVolumeUSD,
      )

      const weeklyVolumeChange = getPercentChange(
        nowWeekData_totalVolumeUSD,
        oneWeekData_totalVolumeUSD,
      )

      data.totalLiquidityUSD = totalLiquidityUSD
      data.liquidityChangeUSD = liquidityChangeUSD
      data.oneDayVolumeUSD = nowData_totalVolumeUSD
      data.oneWeekVolume = nowWeekData_totalVolumeUSD
      data.weeklyVolumeChange = weeklyVolumeChange
      data.volumeChangeUSD = volumeChangeUSD
    }

  } catch (e) {
    console.log(e)
  }
  return data;
}

/**
 * Gets the current price  of ETH, 24 hour price, and % change between them
 */
const getEthPrice = async () => {
  const utcCurrentTime = dayjs()
  const utcOneDayBack = utcCurrentTime.subtract(1, 'day').startOf('minute').unix()

  let ethPrice = 0
  let ethPriceOneDay = 0
  let priceChangeETH = 0

  try {
    let oneDayBlock = await getBlockFromTimestamp(utcOneDayBack)
    let result = await client.query({
      query: ETH_PRICE(),
      fetchPolicy: 'cache-first',
    })
    let resultOneDay = await client.query({
      query: ETH_PRICE(oneDayBlock),
      fetchPolicy: 'cache-first',
    })
    const currentPrice = result?.data?.bundles[0]?.ethPrice
    const oneDayBackPrice = resultOneDay?.data?.bundles[0]?.ethPrice
    priceChangeETH = getPercentChange(currentPrice, oneDayBackPrice)
    ethPrice = currentPrice
    ethPriceOneDay = oneDayBackPrice
  } catch (e) {
    console.log(e)
  }

  return [ethPrice, ethPriceOneDay, priceChangeETH]
}

export const getChartData = async (oldestDateToFetch, prices) => {
  try {
    let data = []
    let weekelyData = []
    const now_date = Date.now()
    let response = await axios.get(`${process.env.API_URL}/stats/get_interval_info?field=LIQUIDITY&interval=DAY&from=${oldestDateToFetch}&to=${now_date}`)
    if (response.status === 200) {
      if (prices.length > 0) {
        let jsonData = await response.data;
        jsonData.pop()
        let diff = prices.length - jsonData.length
        for (var i = 0; i < jsonData.length; i++) {
          data.push({ "liquidity": Number(jsonData[i]['valueHbar']) / 100000000 * prices[diff + i - 1][1], "date": jsonData[i]['timestampSeconds'] })
        }
      }

    }

    response = await axios.get(`${process.env.API_URL}/stats/get_interval_info?field=VOLUME&interval=DAY&from=${oldestDateToFetch}&to=${now_date}`)
    if (response.status === 200) {
      if (prices.length > 0) {
        let jsonData = await response.data;
        jsonData.pop()
        let diff = prices.length - jsonData.length
        for (let i = 0; i < jsonData.length; i++) {
          data[i]["dailyVolumeUSD"] = Number(jsonData[i]['valueHbar']) / 100000000 * prices[diff + i - 1][1]
        }
      }
    }

    response = await axios.get(`${process.env.API_URL}/stats/get_interval_info?field=VOLUME&interval=WEEK&from=${oldestDateToFetch}&to=${now_date}`)
    if (response.status === 200) {
      if (prices.length > 0) {
        let jsonData = await response.data;
        let diff = prices.length - jsonData.length
        for (let i = 0; i < jsonData.length; i++) {
          weekelyData.push({ "weeklyVolumeUSD": Number(jsonData[i]['valueHbar']) / 100000000 * prices[diff + i - 1][1], "date": jsonData[i]['timestampSeconds'] })
        }
      }
    }

    return [data, weekelyData]
  } catch (e) {
    console.log(e)
  }
}