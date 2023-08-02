import React, { createContext, useReducer, useMemo, useCallback } from 'react'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

const UPDATE = 'UPDATE'
const UPDATE_CHART_DATA = 'UPDATE_CHART_DATA'
const UPDATE_PAIR_DATA = 'UPDATE_PAIR_DATA'

dayjs.extend(utc)

const PairDataContext = createContext()

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      const { pairAddress, data } = payload
      return {
        ...state,
        [pairAddress]: {
          ...state?.[pairAddress],
          ...data,
        },
      }
    }

    case UPDATE_PAIR_DATA: {
      const { address, pairData } = payload

      return {
        ...state,
        [address]: {
          ...state?.[address],
          pairData
        },
      }
    }

    case UPDATE_CHART_DATA: {
      const { address, dailyChartData, hourlyChartData } = payload
      return {
        ...state,
        [address]: {
          ...state?.[address],
          dailyChartData,
          hourlyChartData
        },
      }
    }

    default: {
      throw Error(`Unexpected action type in DataContext reducer: '${type}'.`)
    }
  }
}

function PairDataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {})

  // update pair specific data
  const update = useCallback((pairAddress, data) => {
    dispatch({
      type: UPDATE,
      payload: {
        pairAddress,
        data,
      },
    })
  }, [])

  const updatePairData = useCallback((address, pairData) => {
    dispatch({
      type: UPDATE_PAIR_DATA,
      payload: {
        address,
        pairData
      },
    })
  }, [])

  const updateChartData = useCallback((address, hourlyChartData, dailyChartData) => {
    dispatch({
      type: UPDATE_CHART_DATA,
      payload: { address, hourlyChartData, dailyChartData },
    })
  }, [])

  // const updateHourlyData = useCallback((address, hourlyData, timeWindow) => {
  //   dispatch({
  //     type: UPDATE_HOURLY_DATA,
  //     payload: { address, hourlyData, timeWindow },
  //   })
  // }, [])

  return (
    <PairDataContext.Provider
      value={useMemo(
        () => [
          state,
          {
            update,
            updatePairData,
            updateChartData,
            // updateTopPairs,
            // updateHourlyData,
          },
        ],
        [state, update, updatePairData, updateChartData]
      )}
    >
      {children}
    </PairDataContext.Provider>
  )
}

export { PairDataContext, PairDataProvider };