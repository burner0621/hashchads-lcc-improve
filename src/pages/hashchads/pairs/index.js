import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { paramCase } from 'change-case';
import { Container, NavItem, Nav, NavLink, FormGroup, Label } from "reactstrap";
import styled from 'styled-components'
import { useMedia } from 'react-use'

import Layout from '../../../layouts';

import { PATH_HASHCHADS } from '../../../routes/paths';

import Page from '../../../components/Page';
import { Button, Switch } from '@mui/material';
import { RowBetween } from '../../../components/Row'
import DataTable from 'react-data-table-component';
import { Link } from '@mui/material';

import axios from 'axios'
import TokenLogo from "../../../components/TokenLogo";
import { FullWrapper, PageWrapper } from "../tokens";

const PAIRS_TYPE = {
    pairs: 'pairs',
    gainers: 'gainers',
    losers: 'losers'
}

const PAIRS_TYPE_NAME = {
    pairs: 'Pairs',
    gainers: 'Gainers',
    losers: 'Losers'
}

const TIME_RANGE_TYPE = {
    day: 'day',
    week: 'week',
}

const TIME_RANGE_TYPE_NAME = {
    day: '24h',
    week: '1W',
}

export const AdsBannerWrapper = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0px 0px;
  @media screen and (max-width: 1180px) {
    padding: 0px 1rem;
  }
`
GeneralPairs.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function GeneralPairs() {
    const { push } = useRouter();

    const [pairsType, setPairsType] = useState(PAIRS_TYPE.pairs)
    const [timeRangeType, setTimeRangeType] = useState(TIME_RANGE_TYPE.day)
    const [data, setData] = useState([])
    const [allPairs, setAllPairs] = useState([])
    const [gainers, setGainers] = useState([])
    const [losers, setLosers] = useState([])
    const [showLiquidity, setShowLiquidity] = useState(true)

    const [_allPairs, setTAllPairs] = useState([])
    const [_dailyPairVolume, setDailyPairVolume] = useState([])
    const [_weeklyPairVolume, setWeeklyPairVolume] = useState([])
    const [_priceChanges, setPriceChanges] = useState([])

    useEffect(() => {
        axios.get(`${process.env.API_URL}/pools/all`).then((res) => {
            if (res.status === 200)
                setTAllPairs(res.data)
        })
        axios.get(`${process.env.API_URL}/pools/get_weekly_volumes`).then((res) => {
            if (res.status === 200) setWeeklyPairVolume(res.data)
        })
        axios.get(`${process.env.API_URL}/pools/get_daily_volumes`).then((res) => {
            if (res.status === 200) setDailyPairVolume(res.data)
        })
        axios.get(`${process.env.API_URL}/tokens/get_price_changes`).then((res) => {
            if (res.status === 200) {
                setPriceChanges(res.data)
            }
        })
    }, [])

    useEffect(() => {
        if (_priceChanges && (Object.keys(_priceChanges)).length > 0) {
            let _data = [], tmpGainers = [], tmpLosers = []
            for (let pair of _allPairs) {
                let tmp = {}
                tmp.icon = pair.tokenA.icon
                tmp.first = pair.tokenA.symbol
                tmp.second = pair.tokenB.symbol
                tmp.pair_address = pair.contractId
                tmp.price = pair.tokenA.priceUsd
                tmp.percent = _priceChanges[pair.tokenA.id]
                tmp.createdAt = ''
                if (timeRangeType === TIME_RANGE_TYPE.day) tmp.volume = _dailyPairVolume[pair.id]
                if (timeRangeType === TIME_RANGE_TYPE.week) tmp.volume = _weeklyPairVolume[pair.id]
                tmp.liquidity = 2 * pair.tokenA.priceUsd * pair.tokenReserveA / Math.pow(10, pair.tokenA.decimals)
                if (showLiquidity) {
                    if (tmp.liquidity >= 500) {
                        _data.push(tmp)
                        if (tmp.percent <= 0) tmpLosers.push(tmp)
                        else tmpGainers.push(tmp)
                    }
                } else {
                    _data.push(tmp)
                    if (tmp.percent <= 0) tmpLosers.push(tmp)
                    else tmpGainers.push(tmp)
                }

            }
            setAllPairs(_data)
            setGainers(tmpGainers)
            setLosers(tmpLosers)
        }
    }, [_allPairs, _priceChanges, _dailyPairVolume, _weeklyPairVolume, timeRangeType, showLiquidity])

    const below600 = useMedia('(max-width: 600px)')

    useEffect(() => {
        if (pairsType === PAIRS_TYPE.pairs) setData(allPairs)
        else if (pairsType === PAIRS_TYPE.gainers) setData(gainers)
        else setData(losers)
    }, [pairsType, allPairs, gainers, losers])

    const handlePairsType = (type) => {
        if (pairsType !== type) setPairsType(type)
    }

    const handleTimeRangeType = (type) => {
        if (timeRangeType !== type) setTimeRangeType(type)
    }

    const handleCopyAddress = () => {

    }

    const calcUnit = (value) => {
        if (value < 1000) return value;
        else if (value < 1000000) return value / 1000 + 'K';
        else if (value < 1000000000) return value / 1000000 + 'M';
        else return value / 1000000000 + 'B'
    }

    const redirectPairPage = (contractId) => {
        push(PATH_HASHCHADS.pairs.view(paramCase(contractId)));
    };

    const columns = [

        {
            name: <span className='font-weight-bold fs-16'>Pair</span>,
            cell: row => {
                return (
                    <Link onClick={() => redirectPairPage(row.pair_address.replace(/-/g, '.'))} className='cursor-pointer'>
                        <div className="flex flex-row min-w-[130px]">
                            <TokenLogo path={row.icon} />
                            <div className="flex flex-column" style={{ marginLeft: 4 }}>
                                <div className="flex">
                                    <span className="text-pair-first text-white text-hover">{row.first}</span>
                                    <span className="text-pair-second text-gray-500">{'/' + row.second}</span>
                                </div>
                                <span className="text-yellow-weight" style={{ textOverflow: "clip" }} onClick={() => handleCopyAddress()}>{row.pair_address}<i className="mdi mdi-content-copy" /></span>
                            </div>
                        </div>
                    </Link>

                )
            },
            sortable: true,
            width: 210
            // width: 180
        },
        {
            name: <span className='font-weight-bold fs-16 ml-5'>Price</span>,
            sortable: true,
            cell: (row) => {
                if (row.percent >= 0) {
                    return (
                        <Link onClick={() => redirectPairPage(row.pair_address)}>
                            <span className="text-green-weight ml-5">{row.price ? '$' + parseFloat(row.price).toFixed(4) : ''}</span>
                        </Link>
                    );
                } else {
                    return (
                        <Link onClick={() => redirectPairPage(row.pair_address)}>
                            <span className="text-red-weight ml-5">{row.price ? '$' + parseFloat(row.price).toFixed(4) : ''}</span>
                        </Link>
                    );
                }
            },
            width: 150,
            // width: 120
        },
        {
            name: <span className='font-weight-bold fs-16'>{'% ' + TIME_RANGE_TYPE_NAME[timeRangeType]}</span>,
            sortable: true,
            cell: (row) => {
                if (row.percent >= 0) {
                    return <a onClick={() => redirectPairPage(row.pair_address)} className="flex flex-row">
                        <span className='text-green-weight'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </span>
                        <span className="text-green-weight">{row.percent ? parseFloat(row.percent).toFixed(4) + '%' : ''}</span>
                    </a>

                } else {
                    return <a onClick={() => redirectPairPage(row.pair_address)} className="flex flex-row">
                        <span className='text-red-weight'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                            </svg>
                        </span>
                        <span className="text-red-weight">{row.percent ? parseFloat(row.percent).toFixed(4) + '%' : ''}</span>
                    </a>
                }
            },
            width: 210,
            // width: 150
        },
        // {
        //     name: <span className='font-weight-bold fs-16'>Created</span>,
        //     cell: row => row.createdAt,
        //     sortable: true,
        //     selector: 'createdAt',
        //     width: 100
        // },
        {
            name: <span className='font-weight-bold fs-16'>Volume</span>,
            // selector: row => row.volume ? calcUnit(row.volume) : '-',
            cell: row => row.volume ? ' $' + calcUnit(parseInt(row.volume)) : '-',
            sortable: true,
            width: 180,
            // width: 120
        },
        // {
        //     name: <span className='font-weight-bold fs-16'>Swaps</span>,
        //     sortable: true,
        //     selector: 'swaps',
        //     cell: row => row.swaps ? ' $' + calcUnit(parseInt(row.swaps)) : '-',
        //     width: 100
        // },
        {
            name: <span className='font-weight-bold fs-13'>Daily Fees</span>,
            sortable: true,
            cell: row => row.volume ? '$' + (parseFloat(row.volume) / 400).toFixed(2) : '',
            width: 180,
            // width: 100
        },
        {
            name: <span className='font-weight-bold fs-16'>Liquidity</span>,
            sortable: true,
            cell: row => row.liquidity ? '$' + calcUnit(parseInt(row.liquidity)) : '',
            width: 200
            // width: 150
        },
        // {
        //     name: <span className='font-weight-bold fs-16'>T.M.Cap.</span>,
        //     sortable: true,
        //     selector: 'cap',
        //     cell: row => row.cap ? ' $' + calcUnit(parseInt(row.cap)) : '-',
        //     width: 60
        // },
        // {
        //     name: <span className='font-weight-bold fs-16'>Actions</span>,
        //     sortable: true,
        //     cell: row => {
        //         return (
        //             <div>
        //                 <i className="mdi mdi-binoculars fs-20"></i>
        //                 <i className="bx bxs-bar-chart-square fs-20" style={{ marginRight: 5, marginLeft: 5 }}></i>
        //                 <i className="bx bx-star fs-20"></i>
        //             </div>
        //         )
        //     }
        // },
    ];

    return (
        <Page title="Tokens">
            <div className="page-content">
                <div>
                    <PageWrapper>
                        <RowBetween className="mb-4 md:mb-2">
                            <Nav tabs className="flex flex-col sm:flex-row">
                                <NavItem>
                                    <NavLink style={{ cursor: "pointer", padding: 0 }} onClick={() => { handlePairsType(PAIRS_TYPE.pairs) }} >
                                        <Button className={pairsType == PAIRS_TYPE.pairs ? "flex flex-row bg-black" : "flex flex-row bg-dark-grey-blue"} variant="outlined" color="success" style={{minWidth: 100}}>
                                            <i className="mdi mdi-checkbox-multiple-blank-circle align-middle me-1" />  ALL
                                        </Button>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink style={{ cursor: "pointer", padding: 0 }} onClick={() => { handlePairsType(PAIRS_TYPE.gainers) }} >
                                        <Button className={pairsType == PAIRS_TYPE.gainers ? "flex flex-row bg-black" : "flex flex-row bg-dark-grey-blue"} variant="outlined" color="success" style={{minWidth: 100}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                            </svg>  Gainers
                                        </Button>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink style={{ cursor: "pointer", padding: 0 }} onClick={() => { handlePairsType(PAIRS_TYPE.losers) }} >
                                        <Button className={pairsType == PAIRS_TYPE.losers ? "flex flex-row bg-black" : "flex flex-row bg-dark-grey-blue"} variant="outlined" color="success" style={{minWidth: 100}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                                            </svg> Losers
                                        </Button>
                                    </NavLink>
                                </NavItem>
                            </Nav>

                            <div className="flex flex-col sm:flex-row items-end sm:items-center">
                                <FormGroup switch style={{ marginRight: '5px', display: "flex" }}>
                                    <Switch
                                        checked={showLiquidity}
                                        onChange={() => {
                                            setShowLiquidity(!showLiquidity)
                                        }}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <Label check className="text-lg font-medium flex items-center">$500+ Liquidity</Label>
                                </FormGroup>
                                <Nav pills className="badge-bg flex flex-row ml-4 w-fit">
                                    <NavItem className={"flex items-center justify-center w-16 " + timeRangeType == TIME_RANGE_TYPE.day ? "active badge-active-bg" : ""}>
                                        <div style={{ cursor: "pointer" }} className={timeRangeType == TIME_RANGE_TYPE.day ? "active badge-active-bg" : ""} onClick={() => { handleTimeRangeType(TIME_RANGE_TYPE.day) }} >
                                            <span className={timeRangeType == TIME_RANGE_TYPE.day ? "text-white badge p-3" : "text-badge badge p-3"}>24h</span>
                                        </div>
                                    </NavItem>
                                    <NavItem className={"flex items-center justify-center w-16 " + timeRangeType == TIME_RANGE_TYPE.week ? "active badge-active-bg" : ""}>
                                        <div style={{ cursor: "pointer" }} className={timeRangeType == TIME_RANGE_TYPE.week ? "active badge-active-bg" : ""} onClick={() => { handleTimeRangeType(TIME_RANGE_TYPE.week) }} >
                                            <span className={timeRangeType == TIME_RANGE_TYPE.week ? "text-white badge p-3" : "text-badge badge p-3"}>1W</span>
                                        </div>
                                    </NavItem>
                                </Nav>
                            </div>
                        </RowBetween>
                        {/* PAIRS DATA TABLE */}
                        <DataTable
                            customStyles={{
                                headRow: {
                                    style: {
                                        background: "#0b1217",
                                        color: "white"
                                    }
                                },
                                table: {
                                    style: {
                                        background: "#0b1217",
                                        color: "white"
                                    }
                                },
                                rows: {
                                    style: {
                                        background: "#0b1217",
                                        color: "white"
                                    }
                                },
                                pagination: {
                                    style: {
                                        background: "#0b1217",
                                        color: "white"
                                    },
                                    pageButtonsStyle: {
                                        color: "white",
                                        fill: "white"
                                    }
                                },
                                noData: {
                                    style: {
                                        background: "#142028",
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
                            className='panel-shadow'
                        />
                    </PageWrapper>
                </div>
            </div>
        </Page >
    )

}