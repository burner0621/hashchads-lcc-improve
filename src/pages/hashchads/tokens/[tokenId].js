/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router"
import styled from 'styled-components'
import { Col, Row, Nav, NavItem, Card, CardBody } from "reactstrap";
import { Container, Grid } from '@mui/material';
import { useMedia } from 'react-use'
import { Text } from 'rebass'
import { AlertCircle } from 'react-feather'

import Layout from '../../../layouts';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
// import TokenChart from './TokenChart';
import TokenChart from '../../../components/TokenChart';

import { RowBetween, RowFixed, AutoRow } from '../../../components/Row'
import TokenLogo from '../../../components/TokenLogo'
import Page from '../../../components/Page';
// import { ButtonLight, ButtonDark } from '../../Components/ButtonStyled'

import { formattedNum, getPercentChange } from '../../../utils'

// import { useTokenPriceData } from '../../../hooks/useTokenData'
import fetch from 'cross-fetch'

import DataTable from 'react-data-table-component';
import { timeframeOptions } from "../../../constants";
import DropdownSelect from '../../../components/DropdownSelect'
import { OptionButton } from '../../../components/ButtonStyled'
import { Activity } from 'react-feather'
import { usePrevious } from 'react-use'
import { ImpulseSpinner } from "../../../components/Impulse";
import axios from 'axios'
const PriceOption = styled(OptionButton)`
  border-radius: 2px;
`
const DashboardWrapper = styled.div`
  width: 100%;
`
const ContentWrapper = styled.div`
  display: grid;
  justify-content: start;
  align-items: start;
  grid-template-columns: 1fr;
  grid-gap: 24px;
  width: 100%;
  margin: 0 0;
  padding: 0 0;
  box-sizing: border-box;
`
const WarningGrouping = styled.div`
  opacity: ${({ disabled }) => disabled && '0.4'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
`
const TIME_RANGE_TYPE = {
    five: '5m',
    hour: '1h',
    six: '6h',
    day: '1d',
    week: '1w',
}

const TABLE_TYPE = {
    trade: 'trade',
    holder: 'holder',
    fee: 'fee'
}

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

const PRICE_PERIOD = [
    '24 H', '1 W', '1 M'
]

TokenPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function TokenPage() {
    const router = useRouter();
    const address = router.query.tokenId.replace(/-/g, '.')
    const [allTokens, setAllTokens] = useState([])
    const [priceChanges, setPriceChanges] = useState([])
    const [tokenDailyVolume, setTokenDailyVolume] = useState()
    const below1080 = useMedia('(max-width: 1080px)')
    const below600 = useMedia('(max-width: 600px)')

    const [isMobile, setIsMobile] = useState (false)
    useEffect (() => {
      setIsMobile (below600)
    }, [below600])

    const [name, setName] = useState('')
    const [symbol, setSymbol] = useState('')
    const [priceUSD, setPriceUSD] = useState(0)
    const [hbarPrice, setHbarPrice] = useState()
    const [priceChange, setPriceChange] = useState('')
    const [priceChangeColor, setPriceChangeColor] = useState('green')
    const [iconPath, setIconPath] = useState('')
    const [data, setData] = useState([])
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [timeRangeType, setTimeRangeType] = useState(TIME_RANGE_TYPE.week)
    const [tableType, setTableType] = useState(TABLE_TYPE.trade)
    const [holders, setHolders] = useState([])
    const [holderInfo, setHolderInfo] = useState([])
    const [pairs, setPairs] = useState([])

    const [totalLiquidity, setTotalLiquidity] = useState(0)
    const [dailyVolume, setDailyVolume] = useState(0)
    const [circulatingSupply, setCirculatingSupply] = useState(0)
    const [dilutedSupply, setDilutedSupply] = useState(0)
    const [tokenInfo, setTokenInfo] = useState(undefined)

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [chartFilter, setChartFilter] = useState(CHART_VIEW.PRICE)
    const [frequency, setFrequency] = useState(DATA_FREQUENCY.HOUR)
    const [timeWindow, setTimeWindow] = useState(timeframeOptions.WEEK)
    const [socialInfos, setSocialInfos] = useState(undefined)

    const [statisticData, setStatisticData] = useState({})
    const [tokenInDb, setTokenInDb] = useState()

    const [dropdownShow, setDropdownShow] = useState("hidden")
    const [statsDropdownShow, setStatsDropdownShow] = useState("hidden")

    const [period, setPeriod] = useState(PRICE_PERIOD[0])

    const [chartCompWidth, setChartCompWidth] = useState(0)
    const [chartCompHeight, setChartCompHeight] = useState(0)

    const prevWindow = usePrevious(timeWindow)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchTokenByAddress = useCallback(async () => {
        let response = await axios.get(`${process.env.API_URL}/tokens/get_token_by_address?address=${address}`)
        if (response.status === 200) {
            let jsonData = await response.data;
            setTokenInDb(jsonData)
        }
    }, [address])

    useEffect(() => {
        fetchTokenByAddress()
    }, [fetchTokenByAddress])

    const fetchTokensData = useCallback(async () => {
        let response = await axios.get(`${process.env.API_URL}/tokens/simple_all`)
        if (response.status === 200) {
            let jsonData = await response.data;
            setAllTokens(jsonData)
        }
        response = await axios.get(`${process.env.API_URL}/tokens/get_price_changes`)
        if (response.status === 200) {
            setPriceChanges(response.data)
        }
        response = await axios.get(`${process.env.API_URL}/tokens/get_daily_volumes`)
        if (response.status === 200) {
            setTokenDailyVolume(response.data)
        }
    }, [])

    useEffect(() => {
        fetchTokensData()
    }, [fetchTokensData])

    const priceData = [0]

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchNameAndSymbolData = useCallback(async () => {
        let response = await fetch(process.env.MIRROR_NODE_URL + "/api/v1/tokens/" + address);
        if (response.status === 200) {
            let jsonData = await response.json()
            setName(jsonData?.name)
            setSymbol(jsonData?.symbol)
        }
    }, [address])

    useEffect(() => {
        fetchNameAndSymbolData()
    }, [fetchNameAndSymbolData])

    const fetchSocialData = useCallback(async () => {
        let res = await fetch(process.env.API_URL + `/tokens/get_social?tokenId=${address}`)
        if (res.status === 200) {
            let jsonData = await res.json()
            setSocialInfos(jsonData)
        }
    }, [address])

    useEffect(() => {
        fetchSocialData()
    }, [fetchSocialData])

    const fetchData = useCallback(async () => {
        const res = await fetch(`${process.env.API_URL}/tokens/get_transactions?tokenId=${address}&pageNum=${currentPage}&pageSize=${rowsPerPage}`)
        if (res.status === 200) {
            const { data, count } = await res.json();
            setData(data);
            setTotalRows(count);
        }
        if (beforeAddress !== address || beforeCurrentPage !== currentPage || beforeRowsPerPage !== rowsPerPage) {
            if (fetchDataTimeout) clearTimeout(fetchDataTimeout)
            // eslint-disable-next-line react-hooks/exhaustive-deps
            beforeAddress = address;
            beforeCurrentPage = currentPage;
            beforeRowsPerPage = rowsPerPage;
        }
    }, [address, currentPage, rowsPerPage])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const calculateSwapImpactUsd = (amount) => {
        let maxSwapImpact = 1
        for (let pair of pairs) {
            if (address !== pair.tokenA.id && address !== pair.tokenB.id) continue
            let swapImpact = 0
            let reserveA = Number(pair.tokenReserveA) / Math.pow(10, Number(pair.tokenA.decimals))
            let reserveB = Number(pair.tokenReserveB) / Math.pow(10, Number(pair.tokenB.decimals))

            if (address === pair.tokenA.id) {
                // deltaYUsd = reserveB * (1 - reserveA / (reserveA + amount)) * pair.tokenB.priceUsd
                swapImpact = 1 - Math.pow(reserveA / (reserveA + 0.997 * amount), 1)
            }
            if (address === pair.tokenB.id) {
                // deltaYUsd = reserveA * (1 - reserveB / (reserveB + amount)) * pair.tokenA.priceUsd
                swapImpact = 1 - Math.pow(reserveB / (reserveB + 0.997 * amount), 1)
            }
            if (maxSwapImpact > swapImpact) maxSwapImpact = swapImpact
        }

        return 1 - maxSwapImpact
    }
    const fetchTotalData = useCallback(async () => {
        const response = await fetch(`${process.env.API_URL}/pools/all`)
        if (response.status === 200) {
            const jsonData = await response.json()
            setPairs(jsonData)
        }
    }, [])

    useEffect(() => {
        if (pairs.length === 0) fetchTotalData();
    }, [fetchTotalData, pairs])

    useEffect(() => {
        async function fetchHolderData() {
            let t = parseInt(tokenInfo.total_supply / 30), limit = 30, e = tokenInfo.total_supply, s = 0
            let l = 0
            let jsonData = []
            while (l < 25 || (jsonData.links && jsonData.links?.next !== null)) {
                let response = await fetch(process.env.MIRROR_NODE_URL + `/api/v1/tokens/${address}/balances?account.balance=gt:${t}&order=desc&limit=${limit}`);
                if (response.status === 200) {
                    jsonData = await response.json()
                    l = jsonData.balances.length
                    if (l >= 25 && jsonData['links'].next === null) {
                        break
                    } else if (jsonData['links'].next) {
                        s = t
                        t = parseInt((s + e) / 2)
                    } else {
                        e = t
                        t = parseInt((s + e) / 2)
                    }
                }
            }
            setHolders(jsonData.balances)
        }
        if (address && tokenInfo)
            fetchHolderData()
    }, [address, tokenInfo])

    useEffect(() => {
        setIsLoaded(false)
    }, [data])

    useEffect(() => {
        if (holders.length > 0 && pairs.length > 0 && tokenInfo) {
            let totalBalance = tokenInfo.total_supply / Math.pow(10, Number(tokenInfo.decimals))
            let rlt = [], i = 1
            let pairContracts = pairs.map(item => item.contractId)
            let pairsByContract = {};
            for (let pair of pairs) {
                pairsByContract[pair.contractId] = pair
            }
            for (let holder of holders) {
                let tmp = {}
                tmp['accountId'] = holder.account
                tmp['lpToken'] = pairContracts.includes(holder.account) ? pairsByContract[holder.account]['lpToken']['symbol'] : undefined
                tmp['balance'] = holder.balance / Math.pow(10, Number(tokenInfo.decimals))
                tmp['percent'] = (tmp['balance'] / totalBalance * 100).toFixed(2)
                tmp['usd'] = (tmp['balance'] * priceUSD).toFixed(tokenInfo.decimals)
                tmp['impactPercent'] = (100 * calculateSwapImpactUsd(tmp['balance'])).toFixed(2)
                tmp['impactUsd'] = tmp['usd'] * tmp['impactPercent'] / 100
                tmp['actualUsd'] = tmp['usd'] - tmp['impactUsd']
                if (tmp['actualUsd'] < 0) tmp['actualUsd'] = 0
                rlt.push(tmp)
            }
            rlt = rlt.sort((a, b) => {
                return a.balance > b.balance ? -1 : 1
            }).map((item, idx) => {
                item['no'] = idx + 1;
                return item
            })
            setHolderInfo(rlt)
        }
    }, [holders, pairs, tokenInfo, priceUSD])

    let fetchDataTimeout;
    let beforeAddress, beforeCurrentPage, beforeRowsPerPage;

    const fetchStatisticData = useCallback(async () => {
        axios.get(`${process.env.API_URL}/tokens/get_statistics?tokenId=${address}&timeRangeType=${timeRangeType}`)
            .then(
                (result) => {
                    setStatisticData(result.data);
                },
                (error) => {
                    console.log('fetchStatisticData error', error)
                }
            )
    }, [address, timeRangeType])

    useEffect(() => {
        fetchStatisticData()
    }, [fetchStatisticData])

    const handlePageChange = (page, totalRows) => {
        setIsLoaded(true);
        setCurrentPage(page)
    }

    const handlePerRowsChange = async (newPerPage, page) => {
        setRowsPerPage(newPerPage);
    }

    useEffect(() => {
        let tmpDailyVolue = tokenDailyVolume !== undefined ? (tokenDailyVolume[address] !== undefined ? tokenDailyVolume[address] : 0) : 0
        setDailyVolume(tmpDailyVolue * hbarPrice)
    }, [address, tokenDailyVolume, hbarPrice])

    const periodItemClick = (str) => {
        setPeriod(str)
        setDropdownShow("hidden")
        let tmpChange = priceChange
        if (tokenInDb && tokenInDb['monthlyPrice']) {
            if (str === PRICE_PERIOD[0] && tokenInDb['monthlyPrice'].length > 0) {
                tmpChange = priceChanges[address]
            } else if (str === PRICE_PERIOD[1] && tokenInDb['monthlyPrice'].length > 6) {
                tmpChange = getPercentChange(priceUSD, tokenInDb['monthlyPrice'][tokenInDb['monthlyPrice'].length - 7]['closeUsd'])
            } else if (str === PRICE_PERIOD[2] && tokenInDb['monthlyPrice'].length > 30) {
                tmpChange = getPercentChange(priceUSD, tokenInDb['monthlyPrice'][0]['closeUsd'])
            }
        }
        if (Number(tmpChange) > 0) { setPriceChange('+' + Math.abs(Number(tmpChange)).toFixed(4) + '%'); setPriceChangeColor('green') }
        else { setPriceChange(Math.abs(Number(tmpChange)).toFixed(4) + '%'); setPriceChangeColor('red') }
    }

    const fetchTotalPriceData = useCallback(async () => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=hedera-hashgraph&vs_currencies=usd`)
            if (response.status === 200) {
                const jsonData = await response.json()
                setHbarPrice(jsonData["hedera-hashgraph"]["usd"])
            }
        } catch (e) {
            console.error("https://api.coingecko.com/api/v3/simple/price?ids=hedera-hashgraph&vs_currencies=usd", e);
        }
    }, [])

    useEffect(() => {
        if (hbarPrice === undefined || hbarPrice === 0) fetchTotalPriceData()
    }, [hbarPrice, fetchTotalPriceData])

    const fetchTotalPriceLatestData = useCallback(async () => {
        const response = await fetch(`https://api.saucerswap.finance/tokens/prices/latest/${address}?interval=DAY`)
        if (response.status === 200) {
            const jsonData = await response.json()
            setTotalLiquidity(jsonData.liquidityUsd)
            setPriceUSD(jsonData.closeUsd)
        }
    }, [address])

    useEffect(() => {
        if (totalLiquidity === undefined || totalLiquidity === 0) fetchTotalPriceLatestData()
        if (priceUSD === undefined || priceUSD === 0) fetchTotalPriceLatestData()
    }, [address, fetchTotalPriceLatestData, priceUSD, totalLiquidity])

    useEffect(() => {
        async function fetchTokenData() {
            let response = await fetch(process.env.MIRROR_NODE_URL + "/api/v1/tokens/" + address);
            if (response.status === 200) {
                let jsonData = await response.json()
                let response1 = await fetch(process.env.MIRROR_NODE_URL + `/api/v1/tokens/${address}/balances?account.id=${jsonData?.treasury_account_id}`);
                if (response1.status === 200) {
                    setTokenInfo(jsonData)
                    let jsonData1 = await response1.json()
                    let balances = jsonData1?.balances
                    let p = (Number(jsonData?.total_supply) - Number(balances[0]['balance'])) / Math.pow(10, Number(jsonData?.decimals)) * priceUSD
                    setCirculatingSupply(p)
                    p = (Number(jsonData?.total_supply)) / Math.pow(10, Number(jsonData?.decimals)) * priceUSD
                    setDilutedSupply(p)
                }
            }
        }
        if (priceUSD > 0 && address) fetchTokenData()
    }, [address, priceUSD])

    useEffect(() => {
        for (let token of allTokens) {
            if (token.id === address) {
                setIconPath(token?.icon)
            }
        }
    }, [address, allTokens])

    useEffect(() => {
        try {
            if (Number(priceChanges[address]) > 0) { setPriceChange('+' + Math.abs(Number(priceChanges[address])).toFixed(4) + '%'); setPriceChangeColor('green') }
            else { setPriceChange(Math.abs(Number(priceChanges[address])).toFixed(4) + '%'); setPriceChangeColor('red') }
        } catch (e) {
            console.log(e)
        }
    }, [address, priceChanges])

    // switch to hourly data when switched to week window
    useEffect(() => {
        if (timeWindow === timeframeOptions.WEEK && prevWindow && prevWindow !== timeframeOptions.WEEK) {
            setFrequency(DATA_FREQUENCY.HOUR)
        }
    }, [prevWindow, timeWindow])

    // switch to daily data if switche to month or all time view
    useEffect(() => {
        if (timeWindow === timeframeOptions.MONTH && prevWindow && prevWindow !== timeframeOptions.MONTH) {
            setFrequency(DATA_FREQUENCY.DAY)
        }
        if (timeWindow === timeframeOptions.ALL_TIME && prevWindow && prevWindow !== timeframeOptions.ALL_TIME) {
            setFrequency(DATA_FREQUENCY.DAY)
        }
    }, [prevWindow, timeWindow])

    const LENGTH = below1080 ? 10 : 16
    const formattedSymbol = symbol?.length > LENGTH ? symbol.slice(0, LENGTH) + '...' : symbol

    const handleTimeRangeType = (type) => {
        setStatsDropdownShow('hidden')
        if (timeRangeType !== type) setTimeRangeType(type)
    }

    const handleTableType = (type) => {
        if (tableType !== type) setTableType(type)
    }

    const handleCopyAddress = () => {

    }

    const calcUnit = (value) => {
        if (value < 1000) return value;
        else if (value < 1000000) return value / 1000 + 'K';
        else if (value < 1000000000) return value / 1000000 + 'M';
        else return value / 1000000000 + 'B'
    }

    const columns = [

        {
            name: <span className='font-weight-bold fs-16'>Date</span>,
            sortField: 'timestamp',
            cell: row => {

                return (
                    row.state === 'buy' ? <span className="text-buy text-buy-date">{(new Date(row.timestamp * 1000)).toLocaleString("en-US")}</span> :
                        <span className="text-sell text-sell-date">{(new Date(row.timestamp * 1000)).toLocaleString("en-US")}</span>
                )
            },
            sortable: true,
            width: 180
        },
        {
            name: <span className='font-weight-bold fs-16'>Type</span>,
            sortable: true,
            cell: (row) => {
                return (
                    row.state === 'buy' ? <span className="text-green">{row.state}</span> :
                        <span className="text-red">{row.state}</span>
                );
            },
            width: 70
        },
        {
            name: <span className='font-weight-bold fs-16'>Amount</span>,
            sortable: true,
            cell: (row) => {
                return (
                    row.state === 'buy' ? <span className="text-buy">{formattedNum(Math.abs(row.amount), false)}</span> :
                        <span className="text-sell">{formattedNum(Math.abs(row.amount), false)}</span>
                )
            },
            width: 180
        },
        {
            name: <span className='font-weight-bold fs-16'>Maker</span>,
            cell: (row) => {
                return (
                    row.state === 'buy' ?
                        <a href={"https://hashscan.io/mainnet/account/" + row.accountId} target="_blank" style={{ color: "#cdffe7" }} rel="noreferrer">
                            <span className="text-buy link">{row.accountId}</span>
                        </a> :
                        <a href={"https://hashscan.io/mainnet/account/" + row.accountId} target="_blank" style={{ color: "#ffacb1" }} rel="noreferrer">
                            <span className="text-sell link">{row.accountId}</span>
                        </a>
                )
            },
            sortable: true,
            width: 120
        },
        {
            name: <span className='font-weight-bold fs-16'>TXID</span>,
            sortable: true,
            cell: (row) => {
                return (
                    <a
                        style={{ width: 'fit-content' }}
                        color={'#00b8d8'}
                        external
                        href={'https://hashscan.io/mainnet/transactionsById/' + row.transactionId}
                    >
                        <Text style={{ marginLeft: '.15rem' }} fontSize={'14px'} fontWeight={400}>
                            ({row.transactionId})
                        </Text>
                    </a>
                )
            },
            width: 300
        },
    ];

    const holder_columns = [
        {
            name: <span className='font-weight-bold fs-16'>RANK</span>,
            sortable: true,
            cell: (row) => {
                return (
                    <span className="text-center">{row.no}</span>
                );
            },
            width: 80
        },
        {
            name: <span className='font-weight-bold fs-16'>Account ID</span>,
            sortable: true,
            cell: (row) => {
                return (
                    <span>{row.lpToken ? ">> " + row.accountId + " <<\n[LP]" + row.lpToken : row.accountId}
                    </span>
                );
            },
            width: 170
        },
        {
            name: <span className='font-weight-bold fs-16'>BALANCE</span>,
            sortable: true,
            cell: (row) => {
                return (
                    <span>{formattedNum(row.balance, false)}</span>
                );
            },
            width: 110
        },
        {
            name: <span className='font-weight-bold fs-16'>PERCENT</span>,
            sortable: true,
            cell: (row) => {
                return (
                    // <div style={{ width: '100%', height: '2px', background: 'white' }}>{row.percent + '%'}</div>
                    <span>{row.percent + '%'}</span>
                );
            },
            width: 110
        },
        {
            name: <span className='font-weight-bold fs-16'>USD</span>,
            sortable: true,
            cell: (row) => {
                return (
                    <span>{formattedNum(row.usd, true)}</span>
                );
            },
            width: 100
        },
        {
            name: <span className='font-weight-bold fs-16'>SWAP IMPACT</span>,
            sortable: true,
            cell: (row) => {
                return (
                    <span>{row.impactPercent + '%'}</span>
                );
            },
            width: 160
        },
        {
            name: <span className='font-weight-bold fs-16'>ACTUAL USD</span>,
            sortable: true,
            cell: (row) => {
                return (
                    <span>{formattedNum(row.actualUsd, true)}</span>
                );
            },
            width: 160
        },
    ]

    const fee_columns = [

        {
            name: <span className='font-weight-bold fs-13'>Fractional Fee</span>,
            selector: row => ((row.amount.numerator / row.amount.denominator * 100) + '%') || '',
            sortable: true,
            width: 150
        },
        {
            name: <span className='font-weight-bold fs-13'>Fee Currency</span>,
            sortable: true,
            selector: (cell) => {
                return (
                    <div className='flex'>
                        <span>{cell.denominating_token_id} </span>
                        <span className='text-symbol'>{'[' + tokenInfo.name + ']'}</span>
                    </div>
                );
            },
            width: 180,
        },
        {
            name: <span className='font-weight-bold fs-13'>Collector Account</span>,
            selector: row => row.collector_account_id,
            sortable: true,
            width: 120,
        },
        {
            name: <span className='font-weight-bold fs-13'>Min</span>,
            selector: row => row.minimum,
            sortable: true,
            width: 100
        },
        {
            name: <span className='font-weight-bold fs-13'>Max</span>,
            selector: row => row.max ? row.max : 'none',
            sortable: true,
            width: 100
        },
        {
            name: <span className='font-weight-bold fs-13'>Net</span>,
            sortable: true,
            selector: row => row.denominating_token_id,
            width: 100
        },
    ];

    const ref = useRef()

    const setChartHeight = useCallback(() => {
        if (ref.current.offsetWidth > 0) {
            setChartCompWidth(ref.current.offsetWidth)
            setChartCompHeight(ref.current.offsetWidth * 0.6)
        }
    }, [])
    useEffect(() => {
        setChartHeight()
    }, [setChartHeight])

    return (
        <Page title={`Token Page: ${address}`}>
            <div className="page-content">
                <div className="p-0">
                    <ContentWrapper style={{ margin: "auto" }} className="px-2 sm:px-4">
                        <div className="flex flex-col rounded ">

                            <WarningGrouping disabled={false}>
                                <DashboardWrapper style={{ marginTop: below1080 ? '0' : '0' }}>
                                    <div className="flex flex-col sm:flex-row sm:justify-between" >
                                        <div className="items-baseline w-fit">
                                            <div className="flex flex-row w-fit">
                                                <TokenLogo path={iconPath} size="48px" style={{ alignSelf: 'center' }} />
                                                <div fontSize={below1080 ? '1.5rem' : '2rem'} fontWeight={500} style={{ margin: '0 1rem' }}>
                                                    <RowFixed gap="6px">
                                                        <div className="mr-3 text-[24px] text-white">{name}</div>{' '}
                                                        <span className="text-[18px] text-gray-600">{formattedSymbol ? `(${formattedSymbol})` : ''}</span>
                                                    </RowFixed>
                                                    <RowFixed>
                                                        <span className="mr-4 text-[16px] font-medium">
                                                            {`$` + priceUSD.toFixed(8)}
                                                        </span>
                                                        <span className="flex flex-row text-white px-[5px] py-[3px] rounded-3xl" style={{ background: priceChangeColor }}>
                                                            {priceChange}
                                                        </span>
                                                        <span>
                                                            <button id="period" dataDropdownToggle="dropdown" className="text-gray-400 bg-transparent text-xs p-1.5 text-center inline-flex items-center" type="button" onClick={() => { dropdownShow === "hidden" ? setDropdownShow('') : setDropdownShow('hidden') }}>
                                                                {period}
                                                                <svg className="w-2.5 h-2.5 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                                </svg>
                                                            </button>
                                                            <div id="dropdown" className={dropdownShow + " absolute z-10 bg-transparent divide-y divide-gray-100 rounded-lg shadow w-10"} >
                                                                <ul className="py-2 text-xs text-gray-400 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                                    {
                                                                        PRICE_PERIOD.map((item, idx) => {
                                                                            return (
                                                                                <li key={idx} onClick={() => periodItemClick(item)}>
                                                                                    <a href="#" className="block py-2 hover:bg-gray-700 hover:text-gray-300 rounded-lg text-center">{item}</a>
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </span>
                                                    </RowFixed>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="items-baseline w-fit">
                                            <div className="flex-wrap items-start mt-2 sm:mt-0 sm:items-end mb-4 flex flex-col">
                                                <AutoRow align="flex-end" style={{ width: 'fit-content' }}>
                                                    <div className="font-medium, text-sm text-white">
                                                        <a href="/hashchads/tokens">{'Tokens '}</a>→ {symbol}
                                                    </div>
                                                    <a
                                                        className="text-red w-fit"
                                                        external
                                                        href={'https://hashscan.io/mainnet/token/' + address}
                                                    >
                                                        <Text style={{ marginLeft: '.15rem' }} fontSize={'14px'} fontWeight={400}>
                                                            ({address.slice(0, 8) + '...' + address.slice(36, 42)})
                                                        </Text>
                                                    </a>
                                                </AutoRow>
                                                <div className="flex space-around mt-3">
                                                    {
                                                        socialInfos && socialInfos['Linktree'] &&
                                                        <div className="flex ml-[10px]">
                                                            <a target="_blank" className="tooltipp" href={socialInfos['Linktree']} rel="noreferrer">
                                                                <span className="tooltiptext">LinkTree</span>
                                                                <img src="/socials/linktree.png" width="20" />
                                                            </a>
                                                        </div>
                                                    }
                                                    {
                                                        socialInfos && socialInfos['Website'] &&
                                                        <div className="flex ml-[10px]">
                                                            <a target="_blank" className="tooltipp" href={socialInfos['Website']} rel="noreferrer">
                                                                <span className="tooltiptext">Website</span>
                                                                <img src="/socials/website.png" width="20" />
                                                            </a>
                                                        </div>
                                                    }
                                                    {
                                                        socialInfos && socialInfos['Twitter'] &&
                                                        <div className="flex ml-[10px]">
                                                            <a target="_blank" className="tooltipp" href={socialInfos['Twitter']} rel="noreferrer">
                                                                <span className="tooltiptext">Twitter</span>
                                                                <img src="/socials/twitter.png" width="20" />
                                                            </a>
                                                        </div>
                                                    }
                                                    {
                                                        socialInfos && socialInfos['Discord'] &&
                                                        <div className="flex ml-[10px]">
                                                            <a target="_blank" className="tooltipp" href={socialInfos['Discord']} rel="noreferrer">
                                                                <span className="tooltiptext">Discord</span>
                                                                <img src="/socials/discord.png" width="20" />
                                                            </a>
                                                        </div>
                                                    }
                                                    {
                                                        socialInfos && socialInfos['Telegram'] &&
                                                        <div className="flex ml-[10px]">
                                                            <a target="_blank" className="tooltipp" href={socialInfos['Telegram']} rel="noreferrer">
                                                                <span className="tooltiptext">Telegram</span>
                                                                <img src="/socials/telegram.png" width="20" />
                                                            </a>
                                                        </div>
                                                    }
                                                    {
                                                        socialInfos && socialInfos['Reddit'] &&
                                                        <div className="flex ml-[10px]">
                                                            <a target="_blank" className="tooltipp" href={socialInfos['Reddit']} rel="noreferrer">
                                                                <span className="tooltiptext">Reddit</span>
                                                                <img src="/socials/reddit.png" width="20" />
                                                            </a>
                                                        </div>
                                                    }
                                                    {
                                                        socialInfos && socialInfos['GitHub'] &&
                                                        <div className="flex ml-[10px]">
                                                            <a target="_blank" className="tooltipp" href={socialInfos['GitHub']} rel="noreferrer">
                                                                <span className="tooltiptext">GitHub</span>
                                                                <img src="/socials/github.png" width="20" />
                                                            </a>
                                                        </div>
                                                    }
                                                    {
                                                        socialInfos && socialInfos['Calaxy'] &&
                                                        <div className="flex ml-[10px]">
                                                            <a target="_blank" className="tooltipp" href={socialInfos['Calaxy']} rel="noreferrer">
                                                                <span className="tooltiptext">Calaxy</span>
                                                                <img src="/socials/calaxy.png" width="20" />
                                                            </a>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </DashboardWrapper>
                            </WarningGrouping>
                        </div>
                        {/* <Row>
                            <Widgets address={address} price={priceUSD} />
                        </Row> */}
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="w-full md:w-9/12 mb-5" style={{ marginBottom: '20px' }}>
                                <div className="flex flex-col bg-[#274963] panel-shadow br-10 p-0.5 sm:p-4">
                                    <div className="bg-[#0b1217] rounded-2xl py-2 px-0 sm:px-2 mb-3 panel-shadow h-fit" ref={ref} style={{ height: isMobile? 350: chartCompHeight }}>
                                        {isMobile ? (
                                            <RowBetween>
                                                <DropdownSelect options={CHART_VIEW} active={chartFilter} setActive={setChartFilter} color={'#ff007a'} />
                                                <DropdownSelect options={timeframeOptions} active={timeWindow} setActive={setTimeWindow} color={'#ff007a'} />
                                            </RowBetween>
                                        ) : (
                                            <RowBetween
                                                mb={20}
                                                align="flex-start"
                                                className="p-2 rounded-xl"
                                            >
                                                <AutoRow justify="flex-start" gap="6px" align="flex-start">
                                                    {/* <RowFixed> */}
                                                    <OptionButton
                                                        active={chartFilter === CHART_VIEW.LIQUIDITY}
                                                        onClick={() => setChartFilter(CHART_VIEW.LIQUIDITY)}
                                                        style={{ marginRight: '6px' }}
                                                        className={chartFilter === CHART_VIEW.LIQUIDITY ? "green-bg" : ""}
                                                    >
                                                        Liquidity
                                                    </OptionButton>
                                                    <OptionButton
                                                        active={chartFilter === CHART_VIEW.VOLUME}
                                                        onClick={() => setChartFilter(CHART_VIEW.VOLUME)}
                                                        style={{ marginRight: '6px' }}
                                                        className={chartFilter === CHART_VIEW.VOLUME ? "green-bg" : ""}
                                                    >
                                                        Volume
                                                    </OptionButton>
                                                    <OptionButton
                                                        style={{ cursor: 'pointer' }}
                                                        active={chartFilter === CHART_VIEW.PRICE}
                                                        onClick={() => {
                                                            setChartFilter(CHART_VIEW.PRICE)
                                                        }}
                                                        className={chartFilter === CHART_VIEW.PRICE ? "green-bg" : ""}
                                                    >
                                                        Price
                                                    </OptionButton>
                                                    {/* </RowFixed> */}
                                                    {chartFilter === CHART_VIEW.PRICE && (
                                                        <>
                                                            <PriceOption
                                                                active={frequency === DATA_FREQUENCY.DAY}
                                                                onClick={() => {
                                                                    setTimeWindow(timeframeOptions.MONTH)
                                                                    setFrequency(DATA_FREQUENCY.DAY)
                                                                }}
                                                                style={frequency === DATA_FREQUENCY.DAY ? { background: "green" } : {}}
                                                            >
                                                                D
                                                            </PriceOption>
                                                            <PriceOption
                                                                active={frequency === DATA_FREQUENCY.HOUR}
                                                                onClick={() => setFrequency(DATA_FREQUENCY.HOUR)}
                                                                style={frequency === DATA_FREQUENCY.HOUR ? { background: "green" } : {}}
                                                            >
                                                                H
                                                            </PriceOption>
                                                            <PriceOption
                                                                active={frequency === DATA_FREQUENCY.LINE}
                                                                onClick={() => setFrequency(DATA_FREQUENCY.LINE)}
                                                                style={frequency === DATA_FREQUENCY.LINE ? { background: "green" } : {}}
                                                            >
                                                                <Activity size={18} />
                                                            </PriceOption>
                                                        </>
                                                    )}
                                                </AutoRow>
                                                <AutoRow justify="flex-end" gap="6px" align="flex-start">
                                                    <OptionButton
                                                        active={timeWindow === timeframeOptions.WEEK}
                                                        onClick={() => setTimeWindow(timeframeOptions.WEEK)}
                                                        className={timeWindow === timeframeOptions.WEEK ? "green-bg" : ""}
                                                    >
                                                        1W
                                                    </OptionButton>
                                                    <OptionButton
                                                        active={timeWindow === timeframeOptions.MONTH}
                                                        onClick={() => setTimeWindow(timeframeOptions.MONTH)}
                                                        className={timeWindow === timeframeOptions.MONTH ? "green-bg" : ""}
                                                    >
                                                        1M
                                                    </OptionButton>
                                                    <OptionButton
                                                        active={timeWindow === timeframeOptions.ALL_TIME}
                                                        onClick={() => setTimeWindow(timeframeOptions.ALL_TIME)}
                                                        className={timeWindow === timeframeOptions.ALL_TIME ? "green-bg" : ""}
                                                    >
                                                        All
                                                    </OptionButton>
                                                </AutoRow>
                                            </RowBetween>
                                        )}
                                        <TokenChart
                                            address={address}
                                            color={'#ff007a'}
                                            base={priceUSD}
                                            priceData={priceData}
                                            chartFilter={chartFilter}
                                            timeWindow={timeWindow}
                                            frequency={frequency}
                                            symbol={symbol}
                                            pWidth={chartCompWidth}
                                            pHeight={chartCompHeight}
                                        />
                                    </div>
                                    <div className="bg-[#0b1217] rounded-2xl panel-shadow">
                                        <div className="flex justify-start">
                                            <Nav pills className="py-3">
                                                <NavItem className="flex items-center justify-center" style={{ width: "6rem" }}>
                                                    <div style={{ cursor: "pointer" }} className={tableType == TABLE_TYPE.trade ? "active badge-active-bg" : ""} onClick={() => { handleTableType(TABLE_TYPE.trade) }} >
                                                        <span className={tableType == TABLE_TYPE.trade ? "text-white badge" : "text-badge badge"}>Trade History</span>
                                                    </div>
                                                </NavItem>
                                                <NavItem className="flex items-center justify-center" style={{ width: "4rem" }}>
                                                    <div style={{ cursor: "pointer" }} className={tableType == TABLE_TYPE.holder ? "active badge-active-bg" : ""} onClick={() => { handleTableType(TABLE_TYPE.holder) }} >
                                                        <span className={tableType == TABLE_TYPE.holder ? "text-white badge" : "text-badge badge"}>Holders</span>
                                                    </div>
                                                </NavItem>
                                                {tokenInfo && tokenInfo.custom_fees && tokenInfo.custom_fees.fractional_fees && tokenInfo.custom_fees.fractional_fees.length > 0 && (
                                                    <NavItem className="flex items-center justify-center" style={{ width: "4rem" }}>
                                                        <div style={{ cursor: "pointer" }} className={tableType == TABLE_TYPE.fee ? "active badge-active-bg" : ""} onClick={() => { handleTableType(TABLE_TYPE.fee) }} >
                                                            <span className={tableType == TABLE_TYPE.fee ? "text-white badge" : "text-badge badge"}>Fees</span>
                                                        </div>
                                                    </NavItem>
                                                )}
                                            </Nav>
                                        </div>
                                        {tableType === TABLE_TYPE.trade && (error ? (<div>Error:{error.message}</div>) : (
                                            // isLoaded ? (<div>Loading...</div>) : (
                                            <>
                                                <div className={isLoaded ? "visible flex w-full items-center justify-center" : "hidden flex w-full items-center justify-center"}>
                                                    <ImpulseSpinner />
                                                </div>
                                                <div className="overflow-x-auto max-w-[300px] sm:max-w-[9999px]">
                                                <DataTable
                                                    className={isLoaded ? "height-50 hidden" : "visible"}
                                                    customStyles={{
                                                        headRow: {
                                                            style: {
                                                                background: "#0b1217",
                                                                color: "white"
                                                            }
                                                        },
                                                        table: {
                                                            style: {
                                                                background: "#0B1217",
                                                                color: "white"
                                                            }
                                                        },
                                                        rows: {
                                                            style: {
                                                                background: "#0B1217",
                                                                color: "white"
                                                            }
                                                        },
                                                        pagination: {
                                                            style: {
                                                                background: "#0B1217",
                                                                color: "white",
                                                                borderRadius: '15px'
                                                            },
                                                            pageButtonsStyle: {
                                                                color: "white",
                                                                fill: "white"
                                                            }
                                                        },
                                                        noData: {
                                                            style: {
                                                                background: "#0B1217",
                                                                color: "white"
                                                            }
                                                        },
                                                        cells: {
                                                            style: {
                                                                paddingRight: "0px",
                                                                color: "white"
                                                            }
                                                        }
                                                    }}
                                                    columns={columns}
                                                    data={data || []}
                                                    pagination
                                                    paginationServer
                                                    paginationTotalRows={totalRows}
                                                    onChangePage={handlePageChange}
                                                    onChangeRowsPerPage={handlePerRowsChange}
                                                    currentPage={currentPage}
                                                    rowsPerPage={rowsPerPage}
                                                />
                                                </div>
                                            </>
                                            // )
                                        ))}
                                        {tableType === TABLE_TYPE.holder && (
                                            <div className="overflow-x-auto max-w-[300px] sm:max-w-[9999px]">
                                                {
                                                    holderInfo && holderInfo.length > 0 ?
                                                        (<DataTable
                                                            customStyles={{
                                                                headRow: {
                                                                    style: {
                                                                        background: "#0B1217",
                                                                        color: "white"
                                                                    }
                                                                },
                                                                table: {
                                                                    style: {
                                                                        background: "#0B1217",
                                                                        color: "white"
                                                                    }
                                                                },
                                                                rows: {
                                                                    style: {
                                                                        background: "#0B1217",
                                                                        color: "white"
                                                                    }
                                                                },
                                                                pagination: {
                                                                    style: {
                                                                        background: "#0B1217",
                                                                        color: "white",
                                                                        borderRadius: '15px'
                                                                    },
                                                                    pageButtonsStyle: {
                                                                        color: "white",
                                                                        fill: "white"
                                                                    }
                                                                },
                                                                noData: {
                                                                    style: {
                                                                        background: "#0B1217",
                                                                        color: "white"
                                                                    }
                                                                },
                                                                cells: {
                                                                    style: {
                                                                        paddingRight: "0px",
                                                                        color: "white"
                                                                    }
                                                                }
                                                            }}
                                                            columns={holder_columns}
                                                            data={holderInfo || []}
                                                            pagination />) :
                                                        (
                                                            <div className="visible flex w-full items-center justify-center">
                                                                <ImpulseSpinner />
                                                            </div>
                                                        )
                                                }
                                            </div>
                                        )}
                                        {tableType == TABLE_TYPE.fee && (
                                            <DataTable
                                                customStyles={{
                                                    headRow: {
                                                        style: {
                                                            background: "#0B1217",
                                                            color: "white"
                                                        }
                                                    },
                                                    table: {
                                                        style: {
                                                            background: "#0B1217",
                                                            color: "white"
                                                        }
                                                    },
                                                    rows: {
                                                        style: {
                                                            background: "#0B1217",
                                                            color: "white"
                                                        }
                                                    },
                                                    pagination: {
                                                        style: {
                                                            background: "#0B1217",
                                                            color: "white",
                                                            borderRadius: '15px'
                                                        },
                                                        pageButtonsStyle: {
                                                            color: "white",
                                                            fill: "white"
                                                        }
                                                    },
                                                    noData: {
                                                        style: {
                                                            background: "#0B1217",
                                                            color: "white"
                                                        }
                                                    },
                                                    cells: {
                                                        style: {
                                                            paddingRight: "0px",
                                                            color: "white"
                                                        }
                                                    }
                                                }}
                                                columns={fee_columns}
                                                data={tokenInfo && tokenInfo.custom_fees && tokenInfo.custom_fees.fractional_fees || []}
                                                pagination
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* <TokenChart dataColors='["--vz-success", "--vz-danger"]' tokenId={address} /> */}
                            <div className="w-full md:w-3/12">
                                <div className="flex flex-col">
                                    <Card className="card-animate bg-[#274963] panel-shadow rounded-[10px]">
                                        <CardBody>
                                            <div className="flex flex-col">
                                                <div className="flex justify-between mb-[3px]" >
                                                    <span className="w-auto font-medium text-white" />
                                                    <span className="w-auto font-medium text-white">
                                                        {
                                                            socialInfos !== undefined && socialInfos['DeepLink'] !== undefined &&
                                                            <a target="_blank" className="tooltipp ml-4 mr-2.5 flex flex-col justify-end" href={socialInfos['DeepLink']} rel="noreferrer">
                                                                <span className="tooltiptext">Swap</span>
                                                                <img src="/assets/images/trade.png" width="18" height="18" />
                                                            </a>
                                                        }
                                                        {
                                                            socialInfos !== undefined && socialInfos['Saucerswap'] !== undefined &&
                                                            <a target="_blank" className="tooltipp flex flex-col justify-end" href={socialInfos['Saucerswap']} rel="noreferrer">
                                                                <span className="tooltiptext">Trade</span>
                                                                <img src="/assets/images/saucerswap.png" width="18" height="18" />
                                                            </a>
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex flex-row justify-between mb-[10px] rounded-xl bg-black p-1.5" >
                                                    <span className="w-fit">
                                                        <button id="periodStats" dataDropdownToggle="statsDropdown" className="text-gray-400 bg-transparent text-xs p-1.5 text-center inline-flex items-center" type="button" onClick={() => { statsDropdownShow === "hidden" ? setStatsDropdownShow('') : setStatsDropdownShow('hidden') }}>
                                                            {timeRangeType}
                                                            <svg className="w-2.5 h-2.5 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                            </svg>
                                                        </button>
                                                        <div id="statsDropdown" className={statsDropdownShow + " absolute z-10 bg-black divide-y divide-gray-100 rounded-lg shadow w-10"} >
                                                            <ul className="py-2 text-xs text-gray-400 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                                {
                                                                    Object.keys(TIME_RANGE_TYPE).map((key, idx) => {
                                                                        return (
                                                                            <li key={idx} onClick={() => handleTimeRangeType(TIME_RANGE_TYPE[key])}>
                                                                                <a href="#" className="block py-2 hover:bg-gray-700 hover:text-gray-300 rounded-lg text-center">{TIME_RANGE_TYPE[key]}</a>
                                                                            </li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                    </span>
                                                    <div className="flex space-around self-end">
                                                        <div className="flex flex-col w-16">
                                                            <span className="text-badge text-center text-xs">Txs</span>
                                                            <span className="text-white text-center text-xs">{statisticData?.txs}</span>
                                                        </div>
                                                        <div className="flex flex-col w-16">
                                                            <span className="text-badge text-center text-xs">Buys</span>
                                                            <span className="text-white text-center text-xs">{statisticData?.buys}</span>
                                                        </div>
                                                        <div className="flex flex-col w-16">
                                                            <span className="text-badge text-center text-xs">Sells</span>
                                                            <span className="text-white text-center text-xs">{statisticData?.sells}</span>
                                                        </div>
                                                        <div className="flex flex-col w-16">
                                                            <span className="text-badge text-center text-xs">Vol.</span>
                                                            <span className="text-white text-center text-xs">{formattedNum(statisticData?.vol * priceUSD, true)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Row className="flex justify-between mb-[10px]" >
                                                    <span className="w-auto font-medium text-white">Total Liquidity:</span>
                                                    <span className="w-auto font-medium text-white text-right">{formattedNum(totalLiquidity ? parseFloat(totalLiquidity).toFixed(2) : 0, true)}</span>
                                                </Row>
                                                <Row className="flex justify-between mb-[10px]">
                                                    <span className="w-auto font-medium text-white">24hr Volume:</span>
                                                    <span className="w-auto font-medium text-white text-right">{formattedNum(dailyVolume ? parseFloat(dailyVolume).toFixed(2) : 0, true)}</span>
                                                </Row>
                                                <Row className="flex justify-between mb-[10px]">
                                                    <span className="w-auto font-medium text-white">Market Cap(Circulating):</span>
                                                    <span className="w-auto font-medium text-white text-right">{formattedNum(circulatingSupply ? parseFloat(circulatingSupply).toFixed(2) : 0, true)}</span>
                                                </Row>
                                                <Row className="flex justify-between mb-[10px]">
                                                    <span className="w-auto font-medium text-white">Market Cap(Diluted):</span>
                                                    <span className="w-auto font-medium text-white text-right">{formattedNum(dilutedSupply ? parseFloat(dilutedSupply).toFixed(2) : 0, true)}</span>
                                                </Row>
                                                <Row className="flex justify-between mb-[10px]">
                                                    <span className="w-auto font-medium text-white">Treasury:</span>
                                                    <span className="w-auto font-medium text-white text-right">{tokenInfo ? tokenInfo?.treasury_account_id : ''}</span>
                                                </Row>
                                                <Row className="flex justify-between mb-[10px]">
                                                    <span className="w-auto font-medium text-white">Max Supply:</span>
                                                    <span className="w-auto font-medium text-white text-right">{formattedNum(tokenInfo ? (tokenInfo?.total_supply / Math.pow(10, tokenInfo?.decimals)).toFixed(4) : '0')}</span>
                                                </Row>
                                                <Row className="flex justify-between mb-[10px]">
                                                    <span className="w-auto font-medium text-white">Total Supply:</span>
                                                    <span className="w-auto font-medium text-white text-right">{formattedNum(tokenInfo ? (tokenInfo?.total_supply / Math.pow(10, tokenInfo?.decimals)).toFixed(4) : '0')}</span>
                                                </Row>
                                                <Row className="flex justify-between mb-[10px]">
                                                    <span className="w-auto font-medium text-white">Supply Type:</span>
                                                    <span className="w-auto font-medium text-white text-right">{tokenInfo ? tokenInfo?.supply_type : ''}</span>
                                                </Row>
                                                {
                                                    tokenInfo && tokenInfo.supply_key && tokenInfo.supply_key.key &&
                                                    <Row className="grid grid-cols-2 justify-between mb-[10px]">
                                                        <span className="w-auto font-medium text-white">Supply Key:</span>
                                                        <span className="w-auto font-medium text-white text-right">{tokenInfo?.supply_key?.key}</span>
                                                    </Row>
                                                }
                                                {
                                                    tokenInfo && tokenInfo.freeze_key && tokenInfo.freeze_key.key &&
                                                    <Row className="grid grid-cols-2 justify-between mb-[10px]">
                                                        <span className="w-auto font-medium text-white">Freeze Key:</span>
                                                        <span className="w-auto font-medium text-white text-right">{tokenInfo?.freeze_key?.key}</span>
                                                    </Row>
                                                }
                                                {
                                                    tokenInfo && tokenInfo.pause_key && tokenInfo.pause_key.key &&
                                                    <Row className="grid grid-cols-2 justify-between mb-[10px]">
                                                        <span className="w-auto font-medium text-white">Pause Key:</span>
                                                        <span className="w-auto font-medium text-white text-right">{tokenInfo?.pause_key?.key}</span>
                                                    </Row>
                                                }
                                                {
                                                    tokenInfo && tokenInfo.wipe_key && tokenInfo.wipe_key.key &&
                                                    <Row className="grid grid-cols-2 justify-between mb-[10px]">
                                                        <span className="w-auto font-medium text-white">Wipe Key:</span>
                                                        <span className="w-auto font-medium text-white text-right">{tokenInfo?.wipe_key?.key}</span>
                                                    </Row>
                                                }
                                                {
                                                    tokenInfo && tokenInfo.admin_key && tokenInfo.admin_key.key &&
                                                    <Row className="grid grid-cols-2 justify-between mb-[10px]">
                                                        <span className="w-auto font-medium text-white">Admin Key:</span>
                                                        <span className="w-auto font-medium text-white text-right">{tokenInfo?.admin_key?.key}</span>
                                                    </Row>
                                                }
                                                {
                                                    tokenInfo &&
                                                    <Row className="grid grid-cols-2 justify-between mb-[10px]">
                                                        <span className="w-auto font-medium text-white">Created:</span>
                                                        <span className="w-auto font-medium text-white text-right">{(new Date(Number(tokenInfo?.created_timestamp) * 1000)).toLocaleString("en-US")}</span>
                                                    </Row>
                                                }
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>

                            </div>
                        </div>
                    </ContentWrapper>
                </div>
            </div>
        </Page>
    )
}