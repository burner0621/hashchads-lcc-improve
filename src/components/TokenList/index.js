
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import { paramCase } from 'change-case';
import styled from 'styled-components'

import { Box, Flex, Text } from 'rebass'
import TokenLogo from '../TokenLogo'
import Row from '../Row'
import { Link } from '@mui/material';

import { PATH_HASHCHADS } from '../../routes/paths';

import { formattedNum } from '../../utils'
import { useMedia } from 'react-use'
import axios from 'axios'

const PageButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2em;
  margin-bottom: 2em;
`

const Arrow = styled.div`
  color: grey;
  cursor: pointer;
  opacity: ${(props) => (props.faded ? 0.3 : 1)};
  padding: 0 20px;
  user-select: none;
  :hover {
    cursor: pointer;
  }
`

const List = styled(Box)`
  -webkit-overflow-scrolling: touch;
`

const DashGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 100px 1fr 1fr;
  grid-template-areas: 'name liq vol';
  padding: 0 0rem;

  > * {
    justify-content: flex-end;

    &:first-child {
      justify-content: flex-start;
      text-align: left;
      width: 100px;
    }
  }

  @media screen and (min-width: 680px) {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: 180px 1fr 1fr 1fr;
    grid-template-areas: 'name symbol liq vol ';

    > * {
      justify-content: flex-end;
      width: 100%;

      &:first-child {
        justify-content: flex-start;
      }
    }
  }
@media screen and (min-width: 1080px) {
    display: grid;
    grid-gap: 0.5em;
    grid-template-columns: 1.5fr 0.6fr 1fr 1fr 1fr 1fr;
    grid-template-areas: 'name symbol liq vol price change';
  }
`

const ListWrapper = styled.div`
  padding: 0 16px;
`

const ClickableText = styled(Text)`
  text-align: end;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
  user-select: none;
  color: #ced4da !important;
  @media screen and (max-width: 640px) {
    font-size: 0.85rem;
  }
`

const DataText = styled(Flex)`
  align-items: center;
  text-align: center;
  color: #ced4da !important;

  & > * {
    font-size: 14px;
  }
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`

const SORT_FIELD = {
    LIQ: 'liquidity',
    VOL: 'dailyVolume',
    VOL_UT: 'totalVolumeUSD',
    SYMBOL: 'symbol',
    NAME: 'name',
    PRICE: 'priceUsd',
    CHANGE: 'dailyPriceChange',
    DAILYCHANGE: 'dailyChanged',
    WEEKLYCHANGE: 'weeklyChanged',
    MONTHLYCHANGE: 'monthlyChanged'
}

const TopTokenList = ({ tokens = [], itemMax = 25, useTracked = false, show = 1 }) => {
    const { push } = useRouter();
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)

    const [sortDirection, setSortDirection] = useState(1)
    const [sortedColumn, setSortedColumn] = useState(SORT_FIELD.VOL)
    const [filteredList, setFilteredList] = useState([])
    const [hbarPrice, setHbarPrice] = useState(0)

    const below1080 = useMedia('(max-width: 1080px)')
    const below680 = useMedia('(max-width: 680px)')
    const below600 = useMedia('(max-width: 600px)')

    useEffect(() => {
        async function fetchHbarPrice() {
            let response = await axios.get(`${process.env.API_URL}/tokens/get_hbar_price`)
            if (response.status === 200) {
                const data = response.data
                setHbarPrice(data.data)
            }
        }
        fetchHbarPrice()
    }, [])

    useEffect(() => {
        if (tokens && itemMax) {
            let extraPages = 1
            if (tokens.length % itemMax === 0) {
                extraPages = 0
            }
            setMaxPage(Math.floor(tokens.length / itemMax) + extraPages)
        }
    }, [tokens, itemMax])

    useEffect(() => {
        async function fetchData() {
            let response = await axios.get(`${process.env.API_URL}/tokens/get_tokens_stats_data?sortedColumn=${sortedColumn}&sortDirection=${sortDirection}&pageNum=${page}&pageCount=${itemMax}`)
            if (response.status === 200) {
                const data = response.data
                if (data.success) {
                    setFilteredList(data.data)
                }
            }
        }
        fetchData()

    }, [itemMax, page, sortDirection, sortedColumn])

    const redirectTokenPage = (tokenId) => {
        push(PATH_HASHCHADS.tokens.view(paramCase(tokenId)));
    };

    // const filteredList = useMemo(() => {
    //     return (
    //         filterData &&
    //         filterData
    //             .sort((a, b) => {
    //                 if (sortedColumn === SORT_FIELD.SYMBOL || sortedColumn === SORT_FIELD.NAME) {
    //                     return a[sortedColumn] > b[sortedColumn] ? (sortDirection ? -1 : 1) * 1 : (sortDirection ? -1 : 1) * -1
    //                 }
    //                 if (isNaN(a[sortedColumn]) === false && isNaN(b[sortedColumn]) === false)
    //                     return parseFloat(a[sortedColumn]) > parseFloat(b[sortedColumn])
    //                         ? (sortDirection ? -1 : 1) * 1
    //                         : (sortDirection ? -1 : 1) * -1
    //                 else if (isNaN(a[sortedColumn]) && isNaN(b[sortedColumn]) === false)
    //                     return sortDirection ? 1 : -1
    //                 else if (isNaN(a[sortedColumn]) === false && isNaN(b[sortedColumn]))
    //                     return sortDirection ? -1 : 1
    //                 else
    //                     return 0
    //             })
    //             .slice(itemMax * (page - 1), page * itemMax)
    //     )
    // }, [filterData, itemMax, page, sortDirection, sortedColumn])

    const ListItem = ({ item, index }) => {
        return (
            <DashGrid style={{ height: '48px', display: "flex", paddingRight: 4, color: "#ced4da", cursor: 'pointer' }} focus="true">
                <DataText area="name" fontWeight="500" style={{ minWidth: 140 }}>
                    <Row>
                        {!below680 &&
                            <div style={{ marginRight: '1rem', width: '10px' }}>{index}</div>
                        }
                        <TokenLogo path={item.icon} />
                        <Link style={{ marginLeft: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 140, display: 'flex' }} onClick={() => redirectTokenPage(item.id)}>
                            {below680 ? item.symbol : item.name}
                            <TokenLogo diligence={item.dueDiligenceComplete} logoType={"warning"} />
                        </Link>
                    </Row>
                </DataText>
                {/* {!below680 && ( */}
                <DataText area="price" color="text" fontWeight="500" style={{ justifyContent: 'flex-end', minWidth: 60 }}>
                    {formattedNum(item.priceUsd, true)}
                </DataText>
                <DataText area="24H" color="text" fontWeight="500" style={{ minWidth: 40, paddingRight: 4 }}>
                    {
                        Number(item.dailyPriceChange) >= 0 &&
                        <span className='text-green-weight'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </span>
                    }
                    {
                        Number(item.dailyPriceChange) < 0 &&
                        <span className='text-red-weight'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                            </svg>
                        </span>
                    }
                    {
                        Number(item.dailyPriceChange) >= 0 &&
                        <span className='text-green-weight'>
                            {Math.abs(Number(item.dailyPriceChange).toFixed(2)) + "%"}
                        </span>
                    }
                    {
                        Number(item.dailyPriceChange) < 0 &&
                        <span className='text-red-weight'>
                            {Math.abs(Number(item.dailyPriceChange).toFixed(2)) + "%"}
                        </span>
                    }
                </DataText>
                <DataText area="7D" color="text" fontWeight="500" style={{ minWidth: 40, paddingRight: 4 }}>
                    {
                        item.weeklyChanged >= 0 &&
                        <span className='text-green-weight'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </span>
                    }
                    {
                        item.weeklyChanged < 0 &&
                        <span className='text-red-weight'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                            </svg>
                        </span>
                    }
                    {
                        item.weeklyChanged >= 0 &&
                        <span className='text-green-weight'>
                            {Math.abs(item.weeklyChanged.toFixed(2)) + "%"}
                        </span>
                    }
                    {
                        item.weeklyChanged < 0 &&
                        <span className='text-red-weight'>
                            {Math.abs(item.weeklyChanged.toFixed(2)) + "%"}
                        </span>
                    }
                </DataText>
                <DataText area="30D" color="text" fontWeight="500" style={{ minWidth: 40, paddingRight: 4 }}>
                    {
                        item.monthlyChanged >= 0 &&
                        <span className='text-green-weight'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </span>
                    }
                    {
                        item.monthlyChanged < 0 &&
                        <span className='text-red-weight'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                            </svg>
                        </span>
                    }
                    {
                        item.monthlyChanged >= 0 &&
                        <span className='text-green-weight'>
                            {Math.abs(item.monthlyChanged.toFixed(2)) + "%"}
                        </span>
                    }
                    {
                        item.monthlyChanged < 0 &&
                        <span className='text-red-weight'>
                            {Math.abs(item.monthlyChanged.toFixed(2)) + "%"}
                        </span>
                    }
                </DataText>
                {/* )} */}
                <DataText area="liq" color="text" fontWeight="500" style={{ minWidth: 120 }}>{formattedNum(item.liquidity, true)}</DataText>
                <DataText area="vol" color="text" fontWeight="500" style={{ minWidth: 110 }}>{formattedNum(item.dailyVolume * hbarPrice, true)}</DataText>
                {/* {!below1080 &&  */}
                <DataText area="priceChart" color="text" fontWeight="500" style={{ minWidth: 110, paddingRight: 4 }}>
                    <svg viewBox="0 0 500 100" className="chart">
                        <polyline
                            fill="none"
                            stroke={Number(item.dailyPriceChange) >= 0 ? "#20eb7a" : "#ff422b"}
                            strokeWidth="13"
                            points={item.priceChart} />
                    </svg>
                </DataText>
                {/* } */}
            </DashGrid>
        )
    }

    return (
        <ListWrapper>
            <div style={{ overflowX: "auto" }}>
                <DashGrid center="true" style={{ height: 'fit-content', padding: '0 8px 1rem 8px', display: "flex" }}>
                    <Flex alignItems="center" justifyContent="flexStart" style={{ minWidth: 120 }}>
                        <ClickableText
                            color="text"
                            area="name"
                            fontWeight="500"
                            onClick={(e) => {
                                setSortedColumn(SORT_FIELD.SYMBOL)
                                setSortDirection(sortedColumn !== SORT_FIELD.SYMBOL ? true : !sortDirection)
                            }}
                        >
                            {'Name'} {sortedColumn === SORT_FIELD.SYMBOL ? (!sortDirection ? '↑' : '↓') : ''}
                        </ClickableText>
                    </Flex>
                    <Flex alignItems="center" style={{ minWidth: 60 }}>
                        <ClickableText
                            area="price"
                            onClick={(e) => {
                                setSortedColumn(SORT_FIELD.PRICE)
                                setSortDirection(sortedColumn !== SORT_FIELD.PRICE ? true : !sortDirection)
                            }}
                        >
                            Price {sortedColumn === SORT_FIELD.PRICE ? (!sortDirection ? '↑' : '↓') : ''}
                        </ClickableText>
                    </Flex>
                    <Flex alignItems="center" style={{ minWidth: 70 }}>
                        <ClickableText
                            area="24H"
                            onClick={(e) => {
                                setSortedColumn(SORT_FIELD.DAILYCHANGE)
                                setSortDirection(sortedColumn !== SORT_FIELD.DAILYCHANGE ? true : !sortDirection)
                            }}
                        >
                            24H {sortedColumn === SORT_FIELD.DAILYCHANGE ? (!sortDirection ? '↑' : '↓') : ''}
                        </ClickableText>
                    </Flex>
                    <Flex alignItems="center" style={{ minWidth: 70 }}>
                        <ClickableText
                            area="7D"
                            onClick={(e) => {
                                setSortedColumn(SORT_FIELD.WEEKLYCHANGE)
                                setSortDirection(sortedColumn !== SORT_FIELD.WEEKLYCHANGE ? true : !sortDirection)
                            }}
                        >
                            7D {sortedColumn === SORT_FIELD.WEEKLYCHANGE ? (!sortDirection ? '↑' : '↓') : ''}
                        </ClickableText>
                    </Flex>
                    <Flex alignItems="center" style={{ minWidth: 70 }}>
                        <ClickableText
                            area="30D"
                            onClick={(e) => {
                                setSortedColumn(SORT_FIELD.MONTHLYCHANGE)
                                setSortDirection(sortedColumn !== SORT_FIELD.MONTHLYCHANGE ? true : !sortDirection)
                            }}
                        >
                            30D {sortedColumn === SORT_FIELD.MONTHLYCHANGE ? (!sortDirection ? '↑' : '↓') : ''}
                        </ClickableText>
                    </Flex>
                    <Flex alignItems="center" style={{ minWidth: 110 }}>
                        <ClickableText
                            area="liq"
                            onClick={(e) => {
                                setSortedColumn(SORT_FIELD.LIQ)
                                setSortDirection(sortedColumn !== SORT_FIELD.LIQ ? true : !sortDirection)
                            }}
                        >
                            Liquidity {sortedColumn === SORT_FIELD.LIQ ? (!sortDirection ? '↑' : '↓') : ''}
                        </ClickableText>
                    </Flex>
                    <Flex alignItems="center" style={{ minWidth: 90 }}>
                        <ClickableText
                            area="vol"
                            onClick={() => {
                                setSortedColumn(useTracked ? SORT_FIELD.VOL_UT : SORT_FIELD.VOL)
                                setSortDirection(
                                    sortedColumn !== (useTracked ? SORT_FIELD.VOL_UT : SORT_FIELD.VOL) ? true : !sortDirection
                                )
                            }}
                        >
                            Volume (24hrs)
                            {sortedColumn === (useTracked ? SORT_FIELD.VOL_UT : SORT_FIELD.VOL) ? (!sortDirection ? '↑' : '↓') : ''}
                        </ClickableText>
                    </Flex>
                    <Flex alignItems="center" style={{ minWidth: 70 }}>
                        Last 7 Days
                    </Flex>
                </DashGrid>
                <List p={0}>
                    {filteredList &&
                        filteredList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <ListItem key={index} index={(page - 1) * itemMax + index + 1} item={item} />
                                    {/* <Divider /> */}
                                </div>
                            )
                        })}
                </List>
            </div>
            {
                show === 1 &&
                <PageButtons>
                    <div onClick={() => setPage(page === 1 ? page : page - 1)}>
                        <Arrow faded={page === 1 ? "true" : "false"}>←</Arrow>
                    </div>
                    <div>{'Page ' + page + ' of ' + maxPage}</div>
                    <div onClick={() => setPage(page === maxPage ? page : page + 1)}>
                        <Arrow faded={page === maxPage ? "true" : "false"}>→</Arrow>
                    </div>
                </PageButtons>
            }
        </ListWrapper>
    )
}

export default TopTokenList