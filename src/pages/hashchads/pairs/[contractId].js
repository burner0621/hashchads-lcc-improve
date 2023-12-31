import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router"
import styled from 'styled-components'
import { Col, Container, Row, Card, CardBody, CardHeader, Button } from "reactstrap";
// import PairChart from '../../components/PairChart'

import Layout from '../../../layouts';

import CountUp from "react-countup";
import { useMedia } from 'react-use'
import { Text } from 'rebass'
// import { useColor } from '../../hooks'
import { RowBetween, RowFixed, AutoRow } from '../../../components/Row'
import Link, { BasicLink } from '../../../components/Link'
import Page from '../../../components/Page';

import DoubleTokenLogo from "../../../components/DoubleLogo";
import TokenLogo from "../../../components/TokenLogo";
import PairChart from "../../../components/PairChart";
import DropdownSelect from '../../../components/DropdownSelect'
import { timeframeOptions } from '../../../constants'
import { OptionButton } from "../../../components/ButtonStyled";
import axios from 'axios'

const DashboardWrapper = styled.div`
  width: 100%;
`
const ContentWrapper = styled.div`
  display: grid;
  justify-content: start;
  align-items: start;
  grid-template-columns: 1fr;
  grid-gap: 24px;
  max-width: 1980px;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  @media screen and (max-width: 1440px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`
const WarningGrouping = styled.div`
  opacity: ${({ disabled }) => disabled && '0.4'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
`

const OptionsRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px;
`

const CHART_VIEW = {
    VOLUME: 'Volume',
    LIQUIDITY: 'Liquidity',
    RATE0: 'RATE0',
    RATE1: 'RATE1',
}

PairPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function PairPage() {
    const router = useRouter();
    const contractId = router.query.contractId.replace(/-/g, '.')
    // const [pairData, setPairData] = useState({});
    const [totalLiquidityUsd, setTotalLiquidityUsd] = useState(0)
    const [totalLiquidityHbar, setTotalLiquidityHbar] = useState(0)
    const [dailyUsd, setDailyUsd] = useState(0)
    const [dailyHbar, setDailyHbar] = useState(0)
    const [weeklyUsd, setWeeklyUsd] = useState(0)
    const [weeklyHbar, setWeeklyHbar] = useState(0)
    const [tokenAReserve, setTokenAReserve] = useState(0)
    const [tokenBReserve, setTokenBReserve] = useState(0)
    const [symbolA, setSymbolA] = useState('')
    const [symbolB, setSymbolB] = useState('')
    const [iconA, setIconA] = useState()
    const [iconB, setIconB] = useState()
    const [lpReward, setLpReward] = useState(0)
    const [tokenIdA, setTokenIdA] = useState('')
    const [tokenIdB, setTokenIdB] = useState('')
    const [_pairData, setPairData] = useState({})
    const [dailyVolumes, setDailyVolumes] = useState([])
    const [weeklyVolumes, setWeeklyVolumes] = useState([])
    const [weeklyData, setWeeklyData] = useState([])
    const [hbarPrice, setHbarPrice] = useState(0)

    const getPairData = useCallback(async () => {
        let res = await axios.get(`${process.env.API_URL}/pools/get_pool_by_id?poolId=${contractId}`)
        if (res.status === 200) {
            const _pair = res.data
            res = await axios.get(`${process.env.API_URL}/pools/get_conversion_rates?poolId=${contractId}&interval=DAY`)
            if (res.status === 200) {
                let jsonData = res.data
                for (let key of Object.keys(_pair)) {
                    jsonData[key] = _pair[key]
                }
                setPairData (jsonData)
            }
        }
    }, [contractId])

    useEffect (() => {
        getPairData ()
    }, [getPairData])

    useEffect(() => {
        axios.get(`${process.env.API_URL}/tokens/get_hbar_price`).then((res) => {
            setHbarPrice(res.data.data)
        })
        axios.get(`${process.env.API_URL}/pools/get_weekly_volumes`).then((res) => {
            setWeeklyVolumes(res.data)
            setWeeklyData(res.data)
        })
        axios.get(`${process.env.API_URL}/pools/get_daily_volumes`).then((res) => {
            setDailyVolumes(res.data)
        })
    }, [])

    const [showCopyText, setShowCopyText] = useState(false)

    const [chartFilter, setChartFilter] = useState(CHART_VIEW.LIQUIDITY)

    const [timeWindow, setTimeWindow] = useState(timeframeOptions.WEEK)

    useEffect(() => {
        if (Object.keys(_pairData).length) {
            setTotalLiquidityUsd(_pairData.liquidityUsd)
            setTotalLiquidityHbar(_pairData.liquidity / 100000000)
            setTokenAReserve(_pairData.tokenReserveA / Math.pow(10, _pairData.tokenA.decimals))
            setTokenBReserve(_pairData.tokenReserveB / Math.pow(10, _pairData.tokenB.decimals))
            setIconA(_pairData.tokenA.icon)
            setIconB(_pairData.tokenB.icon)
            setSymbolA(_pairData.tokenA.symbol)
            setSymbolB(_pairData.tokenB.symbol)
            setTokenIdA(_pairData.tokenA.id)
            setTokenIdB(_pairData.tokenB.id)
        }
    }, [_pairData])

    useEffect(() => {
        if (dailyVolumes && Object.keys(dailyVolumes).length && Object.keys(_pairData).length) {
            setDailyHbar(dailyVolumes[_pairData.poolId])
            setDailyUsd(dailyVolumes[_pairData.poolId] * hbarPrice)
            setLpReward(dailyVolumes[_pairData.poolId] * hbarPrice * 365 / 4 / _pairData.liquidityUsd)
        }
    }, [dailyVolumes, _pairData, hbarPrice])

    useEffect(() => {
        if (weeklyVolumes && Object.keys(weeklyVolumes).length && Object.keys(_pairData).length) {
            setWeeklyHbar(weeklyVolumes[_pairData.poolId])
            setWeeklyUsd(weeklyVolumes[_pairData.poolId] * hbarPrice)
        }
    }, [weeklyVolumes, _pairData, hbarPrice])

    const below1080 = useMedia('(max-width: 1080px)')
    const below600 = useMedia('(max-width: 600px)')

    const handleCopyAddress = (e) => {

        document.execCommand('copy');
    }

    const name = symbolA + ' / ' + symbolB;
    const symbol = symbolA + ' / ' + symbolB;

    const calcUnit = (value) => {
        if (value < 1000) return value;
        else if (value < 1000000) return value / 1000 + 'K';
        else if (value < 1000000000) return value / 1000000 + 'M';
        else return value / 1000000000 + 'B'
    }

    return (
        <Page title={`Pair Page: ${contractId}`}>
            {
                _pairData &&
                <div className="page-content" style={{ marginBottom: '20px' }}>
                    <div>
                        <ContentWrapper>
                            <div className="d-flex flex-column new-bg br-10" style={{ padding: '15px' }}>
                                <RowBetween style={{ flexWrap: 'wrap', alingItems: 'start' }}>
                                    <AutoRow align="flex-end" style={{ width: 'fit-content' }}>
                                        <div style={{ fontWeight: 400, fontSize: 14, color: 'white' }}>
                                            {/* <BasicLink to="/pairs">{'Pairs '}</BasicLink>/ <BasicLink href={"https://hashscan.io/mainnet/contract/" + pairData.contractId}>{symbol}<span style={{color: "green"}}>{"(" + pairData.contractId + ")"}</span></BasicLink> */}
                                        </div>
                                        <Link
                                            style={{ width: 'fit-content' }}
                                            color={'red'}
                                            external
                                            href={'https://hashscan.io/mainnet/contract/' + contractId}
                                        >
                                            <Text style={{ marginLeft: '.15rem' }} fontSize={'14px'} fontWeight={400}>
                                                {symbol}<span style={{ color: "green" }}>{"(" + contractId + ")"}</span>
                                            </Text>
                                        </Link>
                                    </AutoRow>
                                </RowBetween>
                                <WarningGrouping disabled={false}>
                                    <DashboardWrapper style={{ marginTop: below1080 ? '0' : '1rem' }}>
                                        <RowBetween
                                            style={{
                                                flexWrap: 'wrap',
                                                // marginBottom: '2rem',
                                                alignItems: 'flex-start',
                                            }}
                                        >
                                            <RowFixed style={{ flexWrap: 'wrap' }}>
                                                <RowFixed style={{ alignItems: 'baseline' }}>
                                                    <   DoubleTokenLogo a0={iconA} a1={iconB} margin={true} style={{ width: 20 }} />
                                                    {/* <TokenLogo path={iconPath} size="32px" style={{ alignSelf: 'center' }} /> */}
                                                    <div fontSize={below1080 ? '1.5rem' : '2rem'} fontWeight={500} style={{ margin: '0 1rem' }}>
                                                        <RowFixed gap="6px">
                                                            <div style={{ marginRight: '6px', fontSize: 32, color: 'white' }} >{name}</div>{' '}
                                                            <span style={{ fontSize: 32 }} className="text-badge">{symbol ? `(${symbol})` : ''}</span>
                                                        </RowFixed>
                                                    </div>
                                                    {/* {!below1080 && (
                                                    <>
                                                        <div fontSize={'1.5rem'} fontWeight={500} style={{ marginRight: '1rem' }}>
                                                            {`$` + priceUSD}
                                                        </div>
                                                        <span style={{ color: priceChangeColor }}>{priceChange}</span>
                                                    </>
                                                )} */}
                                                </RowFixed>
                                            </RowFixed>
                                        </RowBetween>
                                        <AutoRow align="flex-end" style={{ width: 'fit-content' }}>
                                            <Link
                                                style={{ width: 'fit-content' }}
                                                color={'grey'}
                                                external
                                            >
                                                <Text style={{ marginLeft: '.15rem' }} className="text-badge" fontSize={'14px'} fontWeight={400}>
                                                    <span className="fc-white">Token:</span>&nbsp;&nbsp;{_pairData?.tokenA?.id}
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="fc-white">Pair:</span>&nbsp;&nbsp;{_pairData?.tokenB?.id}
                                                </Text>
                                            </Link>
                                        </AutoRow>
                                    </DashboardWrapper>
                                </WarningGrouping>
                            </div>

                            <Row>
                                <Col xl={4} sm={12} >
                                    <h5 className="text-badge">Pool Information</h5>
                                    <Card className="card-animate new-bg br-10">
                                        <CardBody>
                                            <div className="d-flex flex-column">
                                                <Row className="d-flex justify-between" >
                                                    <span className="w-auto fc-white fw-450">Pair Name:</span>

                                                    <span className="counter-value w-auto text-badge" style={{ textOverflow: "ellipsis" }}>
                                                        {symbol}
                                                    </span>
                                                </Row>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <Row className="d-flex justify-between" >
                                                    <span className="w-auto fc-white fw-450">{symbolA} Address:</span>
                                                    <span className="counter-value w-auto text-badge" style={{ textOverflow: "ellipsis" }}>
                                                        {tokenIdA}<i className="mdi mdi-content-copy" />
                                                    </span>
                                                </Row>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <Row className="d-flex justify-between" >
                                                    <span className="w-auto fc-white fw-450">{symbolB} Address:</span>

                                                    <span className="counter-value w-auto text-badge" style={{ textOverflow: "ellipsis" }}>
                                                        {tokenIdB}<i className="mdi mdi-content-copy" />
                                                    </span>
                                                </Row>
                                            </div>
                                            <Link
                                                style={{ width: 'fit-content', display: "flex", justifyContent: "center" }}
                                                color={'green'}
                                                external
                                                href={'https://hashscan.io/mainnet/contract/' + contractId}
                                            >
                                                <Text className="text-green" style={{ marginLeft: '.15rem' }} fontSize={'20px'} fontWeight={400}>
                                                    View on Hashscan<i className="mdi mdi-arrow-top-right-thin" />
                                                </Text>
                                            </Link>
                                        </CardBody>
                                    </Card>
                                    <h5 className="text-badge">Pooled Tokens</h5>
                                    <Card className="card-animate mb-3 new-bg br-10" style={{ marginBottom: '0px !important' }}>
                                        <CardBody>
                                            <div className="d-flex">
                                                <div className="flex-grow-1 w-full">
                                                    <h6 className="mb-0 d-flex flex-column justify-around">
                                                        <span className="counter-value d-flex items-center mb-2" style={{ textOverflow: "ellipsis" }}>
                                                            <TokenLogo path={iconA} size="32px" style={{ alignSelf: 'center', marginRight: 5 }} />
                                                            <CountUp className="fc-white fw-450 fs-20 ml-15" start={0} end={tokenAReserve} duration={3} decimals={2} />
                                                            <span className="fc-white fw-450 fs-16" style={{ alignSelf: 'center', marginLeft: 8 }}>{' ' + symbolA}</span>
                                                        </span>
                                                        <span className="counter-value d-flex items-center" style={{ textOverflow: "ellipsis" }}>
                                                            <TokenLogo path={iconB} size="32px" style={{ alignSelf: 'center', marginRight: 5 }} />
                                                            <CountUp className="fc-white fw-450 fs-20 ml-15" start={0} end={tokenBReserve} duration={3} decimals={2} />
                                                            <span className="fc-white fw-450 fs-16" style={{ alignSelf: 'center', marginLeft: 8 }}>{' ' + symbolB}</span>
                                                        </span>
                                                    </h6>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <Card className="card-animate mb-0 new-bg br-10">
                                        <CardBody>
                                            <div className="d-flex flex-column">
                                                <Row className="d-flex justify-between" >
                                                    <span className="w-auto fc-white fw-450">TVL:</span>

                                                    <span className="counter-value w-auto fc-white" style={{ textOverflow: "ellipsis" }}>
                                                        $
                                                        <CountUp className="fc-white" start={0} end={totalLiquidityUsd} duration={1} decimals={2} />
                                                        (<CountUp className="fc-white" start={0} end={totalLiquidityHbar} duration={1} decimals={2} /> HBAR)
                                                    </span>
                                                </Row>
                                                <Row className="d-flex justify-between">
                                                    <span className="w-auto fc-white fw-450">24hr Volume:</span>
                                                    <span className="counter-value w-auto fc-white">
                                                        $
                                                        <CountUp className="fc-white" start={0} end={dailyUsd} duration={1} decimals={2} />
                                                        (<CountUp className="fc-white" start={0} end={dailyHbar} duration={1} decimals={2} /> HBAR)
                                                    </span>
                                                </Row>
                                                <Row className="d-flex justify-between">
                                                    <span className="w-auto fc-white fw-450">7D Volume:</span>
                                                    <span className="counter-value w-auto fc-white">
                                                        $
                                                        <CountUp className="fc-white" start={0} end={weeklyUsd} duration={1} decimals={2} />
                                                        (<CountUp className="fc-white" start={0} end={weeklyHbar} duration={1} decimals={2} /> HBAR)
                                                    </span>
                                                </Row>
                                                <Row className="d-flex justify-between">
                                                    <span className="w-auto fc-white fw-450">Fees (24hrs):</span>
                                                    <span className="counter-value w-auto fc-white">
                                                        $
                                                        <CountUp className="fc-white" start={0} end={dailyUsd / 400} duration={1} decimals={4} />
                                                        (<CountUp className="fc-white" start={0} end={dailyHbar / 400} duration={1} decimals={4} /> HBAR)
                                                    </span>
                                                </Row>
                                                <Row className="d-flex justify-between">
                                                    <span className="w-auto fc-white fw-450">LP Reward APR:</span>
                                                    <span className="counter-value w-auto fc-white">
                                                        {(dailyUsd * 365 / (4 * totalLiquidityUsd)).toFixed(4) + '%'}
                                                        {/* <CountUp start={0} end={weeklyUsd} duration={1} decimals={2} />
                                                        (<CountUp start={0} end={weeklyHbar} duration={1} decimals={2} /> HBAR) */}
                                                    </span>
                                                </Row>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col xl={8} sm={12}>
                                    {
                                        <div className="d-flex flex-column new-bg br-10" style={{ padding: '15px' }}>
                                            {below600 ? (
                                                <RowBetween mb={40}>
                                                    <DropdownSelect options={CHART_VIEW} active={chartFilter} setActive={setChartFilter} color={'#ff007a'} />
                                                    <DropdownSelect options={timeframeOptions} active={timeWindow} setActive={setTimeWindow} color={'#ff007a'} />
                                                </RowBetween>
                                            ) : (
                                                <OptionsRow>
                                                    <AutoRow gap="6px" style={{ flexWrap: 'nowrap' }}>
                                                        <OptionButton
                                                            active={chartFilter === CHART_VIEW.LIQUIDITY}
                                                            onClick={() => {
                                                                setTimeWindow(timeframeOptions.WEEK)
                                                                setChartFilter(CHART_VIEW.LIQUIDITY)
                                                            }}
                                                            style={chartFilter === CHART_VIEW.LIQUIDITY ? { background: "green" } : {}}
                                                        >
                                                            Liquidity
                                                        </OptionButton>
                                                        <OptionButton
                                                            active={chartFilter === CHART_VIEW.VOLUME}
                                                            onClick={() => {
                                                                setTimeWindow(timeframeOptions.WEEK)
                                                                setChartFilter(CHART_VIEW.VOLUME)
                                                            }}
                                                            style={chartFilter === CHART_VIEW.VOLUME ? { background: "green" } : {}}
                                                        >
                                                            Volume
                                                        </OptionButton>
                                                        <OptionButton
                                                            active={chartFilter === CHART_VIEW.RATE0}
                                                            onClick={() => {
                                                                setTimeWindow(timeframeOptions.WEEK)
                                                                setChartFilter(CHART_VIEW.RATE0)
                                                            }}
                                                            style={chartFilter === CHART_VIEW.RATE0 ? { background: "green" } : {}}
                                                        >
                                                            {_pairData.tokenA ? (_pairData?.tokenB?.symbol.length > 6 ? _pairData?.tokenB?.symbol.slice(0, 5) + '...' : _pairData?.tokenB?.symbol) + '/' + (_pairData?.tokenA?.symbol.length > 6 ? _pairData?.tokenA?.symbol.slice(0, 5) + '...' : _pairData?.tokenA?.symbol) : '-'}
                                                        </OptionButton>
                                                        <OptionButton
                                                            active={chartFilter === CHART_VIEW.RATE1}
                                                            onClick={() => {
                                                                setTimeWindow(timeframeOptions.WEEK)
                                                                setChartFilter(CHART_VIEW.RATE1)
                                                            }}
                                                            style={chartFilter === CHART_VIEW.RATE1 ? { background: "green" } : {}}
                                                        >
                                                            {_pairData.tokenB ? (_pairData?.tokenA?.symbol.length > 6 ? _pairData?.tokenA?.symbol.slice(0, 5) + '...' : _pairData?.tokenA?.symbol) + '/' + (_pairData?.tokenB?.symbol.length > 6 ? _pairData?.tokenB?.symbol.slice(0, 5) + '...' : _pairData?.tokenB?.symbol) : '-'}
                                                        </OptionButton>
                                                    </AutoRow>
                                                    <AutoRow justify="flex-end" gap="6px">
                                                        <OptionButton
                                                            active={timeWindow === timeframeOptions.WEEK}
                                                            onClick={() => setTimeWindow(timeframeOptions.WEEK)}
                                                            style={timeWindow === timeframeOptions.WEEK ? { background: "green" } : {}}
                                                        >
                                                            1W
                                                        </OptionButton>
                                                        <OptionButton
                                                            active={timeWindow === timeframeOptions.MONTH}
                                                            onClick={() => setTimeWindow(timeframeOptions.MONTH)}
                                                            style={timeWindow === timeframeOptions.MONTH ? { background: "green" } : {}}
                                                        >
                                                            1M
                                                        </OptionButton>
                                                        <OptionButton
                                                            active={timeWindow === timeframeOptions.ALL_TIME}
                                                            onClick={() => setTimeWindow(timeframeOptions.ALL_TIME)}
                                                            style={timeWindow === timeframeOptions.ALL_TIME ? { background: "green" } : {}}
                                                        >
                                                            All
                                                        </OptionButton>
                                                    </AutoRow>
                                                </OptionsRow>
                                            )}
                                            {Object.keys(_pairData).length && Object.keys(weeklyData).length && hbarPrice &&
                                                <PairChart
                                                    address={contractId}
                                                    poolId={_pairData.poolId}
                                                    pairData={_pairData}
                                                    color={'#ff007a'}
                                                    base0={tokenAReserve / tokenBReserve}
                                                    base1={tokenBReserve / tokenAReserve}
                                                    chartFilter={chartFilter}
                                                    timeWindow={timeWindow}
                                                />
                                            }
                                        </div>
                                    }
                                </Col>
                            </Row>
                        </ContentWrapper>
                    </div>
                </div>
            }
        </Page>
    )
}