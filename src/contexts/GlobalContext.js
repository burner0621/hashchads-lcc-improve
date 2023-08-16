import React, { createContext, useReducer, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types';
const UPDATE = 'UPDATE'
const UPDATE_CHART = 'UPDATE_CHART'
const UPDATE_ALL_PAIRS_IN_SAUCERSWAP = 'UPDAUPDATE_ALL_PAIRS_IN_SAUCERSWAPTE_TOP_PAIRS'
const UPDATE_ALL_TOKENS_IN_SAUCERSWAP = 'UPDATE_ALL_TOKENS_IN_SAUCERSWAP'
const UPDATE_HBAR_AND_SAUCE_PRICE = 'UPDATE_HBAR_AND_SAUCE_PRICE'
const UPDATE_PRICES = 'UPDATE_PRICES'
const UPDATE_TOKEN_DAILY_VOLUME = 'UPDATE_TOKEN_DAILY_VOLUME'
const UPDATE_PRICE_CHANGE = 'UPDATE_PRICE_CHANGE'
const UPDATE_TOKEN_DATA = 'UPDATE_TOKEN_DATA'
const UPDATE_PAIR_WEEKLY_VOLUME = 'UPDATE_PAIR_WEEKLY_VOLUME'
const UPDATE_PAIR_DAILY_VOLUME = 'UPDATE_PAIR_DAILY_VOLUME'
const UPDATE_TOKEN_DAILY_PRICE_DATA = 'UPDATE_TOKEN_DAILY_PRICE_DATA'

const GlobalDataContext = createContext()

function reducer(state, { type, payload }) {
    switch (type) {
        case UPDATE: {
            const { data } = payload
            return {
                ...state,
                globalData: data,
            }
        }

        case UPDATE_PRICES: {
            const { prices } = payload
            return {
                ...state,
                prices,
            }
        }

        case UPDATE_TOKEN_DAILY_VOLUME: {
            const { tokenDailyVolume } = payload
            return {
                ...state,
                tokenDailyVolume,
            }
        }

        case UPDATE_PAIR_DAILY_VOLUME: {
            const { pairDailyVolume } = payload
            return {
                ...state,
                pairDailyVolume,
            }
        }

        case UPDATE_PAIR_WEEKLY_VOLUME: {
            const { pairWeeklyVolume } = payload
            return {
                ...state,
                pairWeeklyVolume,
            }
        }

        case UPDATE_PRICE_CHANGE: {
            const { priceChange } = payload
            return {
                ...state,
                priceChange,
            }
        }

        case UPDATE_TOKEN_DAILY_PRICE_DATA: {
            const { dailyPriceData } = payload
            return {
                ...state,
                dailyPriceData
            }
        }

        case UPDATE_ALL_PAIRS_IN_SAUCERSWAP: {
            const { allPairs } = payload
            return {
                ...state,
                allPairs,
            }
        }

        case UPDATE_ALL_TOKENS_IN_SAUCERSWAP: {
            const { allTokens } = payload
            return {
                ...state,
                allTokens,
            }
        }

        case UPDATE_CHART: {
            const { daily, weekly } = payload
            return {
                ...state,
                chartData: {
                    daily,
                    weekly,
                },
            }
        }

        case UPDATE_TOKEN_DATA: {
            const { tokenData } = payload
            return {
                ...state,
                tokenData
            }
        }

        case UPDATE_HBAR_AND_SAUCE_PRICE: {
            const { hBarPrice, saucePrice } = payload
            return {
                ...state,
                hBarPrice,
                saucePrice
            }
        }
        default: {
            throw Error(`Unexpected action type in DataContext reducer: '${type}'.`)
        }
    }
}


GlobalProvider.propTypes = {
    children: PropTypes.node,
};

function GlobalProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {})
    const update = useCallback((data) => {
        dispatch({
            type: UPDATE,
            payload: {
                data,
            },
        })
    }, [])

    const updatePrices = useCallback((data) => {
        dispatch({
            type: UPDATE_PRICES,
            payload: {
                prices: data,
            },
        })
    }, [])

    const updateTokenDailyVolume = useCallback((data) => {
        dispatch({
            type: UPDATE_TOKEN_DAILY_VOLUME,
            payload: {
                tokenDailyVolume: data,
            },
        })
    }, [])

    const updatePairDailyVolume = useCallback((data) => {
        dispatch({
            type: UPDATE_PAIR_DAILY_VOLUME,
            payload: {
                pairDailyVolume: data,
            },
        })
    }, [])

    const updatePairWeeklyVolume = useCallback((data) => {
        dispatch({
            type: UPDATE_PAIR_WEEKLY_VOLUME,
            payload: {
                pairWeeklyVolume: data,
            },
        })
    }, [])

    const updatePriceChange = useCallback((data) => {
        dispatch({
            type: UPDATE_PRICE_CHANGE,
            payload: {
                priceChange: data,
            },
        })
    }, [])

    const updateDailyPriceData = useCallback((data) => {
        dispatch({
            type: UPDATE_TOKEN_DAILY_PRICE_DATA,
            payload: {
                dailyPriceData: data,
            },
        })
    }, [])

    const updateAllPairsInSaucerswap = useCallback((allPairs) => {
        dispatch({
            type: UPDATE_ALL_PAIRS_IN_SAUCERSWAP,
            payload: {
                allPairs,
            },
        })
    }, [])

    const updateAllTokensInSaucerswap = useCallback((allTokens) => {
        dispatch({
            type: UPDATE_ALL_TOKENS_IN_SAUCERSWAP,
            payload: {
                allTokens,
            },
        })
    }, [])

    const updateHbarAndSaucePrice = useCallback((hbarPrice, saucePrice) => {
        dispatch({
            type: UPDATE_HBAR_AND_SAUCE_PRICE,
            payload: {
                hBarPrice: hbarPrice,
                saucePrice: saucePrice
            },
        })
    }, [])

    const updateChart = useCallback((daily, weekly) => {
        dispatch({
            type: UPDATE_CHART,
            payload: {
                daily,
                weekly,
            },
        })
    }, [])

    return (
        <GlobalDataContext.Provider
            value={useMemo(
                () => [
                    state,
                    {
                        update,
                        updatePrices,
                        updatePriceChange,
                        updateDailyPriceData,
                        updatePairDailyVolume,
                        updatePairWeeklyVolume,
                        updateTokenDailyVolume,
                        updateAllPairsInSaucerswap,
                        updateAllTokensInSaucerswap,
                        updateHbarAndSaucePrice,
                        updateChart
                    }
                ],
                [
                    state,
                    update,
                    updatePrices,
                    updatePriceChange,
                    updateDailyPriceData,
                    updatePairDailyVolume,
                    updatePairWeeklyVolume,
                    updateTokenDailyVolume,
                    updateAllPairsInSaucerswap,
                    updateAllTokensInSaucerswap,
                    updateHbarAndSaucePrice,
                    updateChart
                ])}
        >
            {children}
        </GlobalDataContext.Provider>
    )
}

export { GlobalDataContext, GlobalProvider };