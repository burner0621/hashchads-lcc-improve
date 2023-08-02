import React, { createContext, useReducer, useMemo, useCallback } from 'react'

import { useHbarAndSaucePrice } from '../hooks/useGlobalContext'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

const UPDATE = 'UPDATE'
const UPDATE_CHART_DATA = 'UPDATE_CHART_DATA'
const UPDATE_PRICE_DATA = 'UPDATE_PRICE_DATA'

dayjs.extend(utc)

const TokenDataContext = createContext()

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      const { tokenAddress, data } = payload
      return {
        ...state,
        [tokenAddress]: {
          ...state?.[tokenAddress],
          ...data,
        },
      }
    }
    case UPDATE_CHART_DATA: {
      const { address, dailyData, hourlyData } = payload
      return {
        ...state,
        [address]: {
          ...state?.[address],
          dailyData,
          hourlyData,
        },
      }
    }

    case UPDATE_PRICE_DATA: {
      const { address, data, timeWindow, interval } = payload
      return {
        ...state,
        [address]: {
          ...state?.[address],
          [timeWindow]: {
            ...state?.[address]?.[timeWindow],
            [interval]: data,
          },
        },
      }
    }

    default: {
      throw Error(`Unexpected action type in DataContext reducer: '${type}'.`)
    }
  }
}

function TokenDataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {})
  const update = useCallback((tokenAddress, data) => {
    dispatch({
      type: UPDATE,
      payload: {
        tokenAddress,
        data,
      },
    })
  }, [])

  const updateChartData = useCallback((address, dailyData, hourlyData) => {
    dispatch({
      type: UPDATE_CHART_DATA,
      payload: { address, dailyData, hourlyData},
    })
  }, [])


  const updatePriceData = useCallback((address, data, timeWindow, interval) => {
    dispatch({
      type: UPDATE_PRICE_DATA,
      payload: { address, data, timeWindow, interval },
    })
  }, [])

  return (
    <TokenDataContext.Provider
      value={useMemo(
        () => [
          state,
          {
            update,
            updateChartData,
            updatePriceData,
          },
        ],
        [
          state,
          update,
          updateChartData,
          updatePriceData,
        ]
      )}
    >
      {children}
    </TokenDataContext.Provider>
  )
}

export function Updater() {
  return null
}

export { TokenDataContext, TokenDataProvider };