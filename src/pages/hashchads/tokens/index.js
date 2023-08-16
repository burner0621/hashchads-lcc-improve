import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import classnames from "classnames";
import { Container, FormGroup, Spinner, ButtonGroup, NavItem, Nav, NavLink, Input, Label } from "reactstrap";

import { RowBetween } from '../../../components/Row'
import Panel from '../../../components/Panel'
import TopTokenList from '../../../components/TokenList'
import { Badge, Button, Switch } from '@mui/material';
import { SwitchProps } from '@mui/material/Switch';

import TokenPage from './[tokenId]'

import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
import Page from '../../../components/Page';

import { TOKEN_TYPE, TOKEN_TYPE_NAME } from "../../../constants";
import axios from 'axios'
export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0px;
  padding-bottom: 80px;

  @media screen and (max-width: 600px) {
    & > * {
      padding: 0px 0px 0px 8px;
    }
  }
`
export const FullWrapper = styled.div`
  display: grid;
  justify-content: start;
  align-items: start;
  grid-template-columns: 1fr;
  grid-gap: 24px;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 16px 0px;

  @media screen and (max-width: 1180px) {
    grid-template-columns: 1fr;
    padding: 8px 1rem;
  }
`

GeneralTokens.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function GeneralTokens() {
    const below600 = useMedia('(max-width: 600px)')
    const below900 = useMedia('(max-width: 900px)')

    const [allTokens, setAllTokens] = useState([])

    const [tokenType, setTokenType] = useState(TOKEN_TYPE.all)
    const [loadingGainer, setLoadingGainer] = useState(false)
    const [loadingLoser, setLoadingLoser] = useState(false)
    const [loadingExport, setLoadingExport] = useState(false)
    const [showLiquidity, setShowLiquidity] = useState(true)

    const theme = useTheme();
    const { tokenAddress } = useParams()

    const { themeStretch } = useSettings();

    const fetchData = useCallback(async () => {
        let response = await axios.get(`${process.env.API_URL}/tokens/simple_all`)
        if (response.status === 200) {
            const data = response.data
            setAllTokens(data)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const formattedTokens = useMemo(() => {
        let rlt = []
        for (let item of allTokens) {
            if (showLiquidity) {
                if (item['liquidity'] >= 500) rlt.push(item)
            } else {
                rlt.push(item)
            }
        }
        return rlt
    }, [allTokens, showLiquidity])

    const [gainerTokens, setGainers] = useState([]);
    const [loserTokens, setLosers] = useState([]);

    const downloadFile = ({ data, fileName, fileType }) => {
        const blob = new Blob([data], { type: fileType })

        const a = document.createElement('a')
        a.download = tokenType === TOKEN_TYPE.all ? 'hashchads-all-tokens.csv'
            : tokenType === TOKEN_TYPE.gainer ? 'hashchads-gainer-tokens.csv'
                : 'hashchads-loser-tokens.csv'
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }

    const exportToCsv = e => {
        setLoadingExport(true)
        e.preventDefault()

        // Headers for each column
        let headers = ['No, Name, Symbol, Liquidity, Volume, Price, PriceChange']
        let tokens = [];
        let no = 1;
        for (let i = 0; i < formattedTokens.length; i++) {

            let tokenData = formattedTokens[i];

            tokens.push({
                no: no,
                name: tokenData.name,
                symbol: tokenData.symbol,
                liquidity: tokenData.liquidity || 0,
                volume: tokenData.oneDayVolumeUSD || 0,
                price: tokenData.priceUsd || 0,
                price_change: tokenData.priceChangeUSD || 0
            });
            no++
        }
        // Convert users data to a csv
        let usersCsv = tokens.reduce((acc, token) => {
            const { no, name, symbol, liquidity, volume, price, price_change } = token
            acc.push([no, name, symbol, liquidity, volume, price, price_change].join(','))
            return acc
        }, [])


        downloadFile({
            data: [...headers, ...usersCsv].join('\n'),
            fileName: 'hashchads.csv',
            fileType: 'text/csv',
        })

        setLoadingExport(false)
    }

    const handleTokenType = (type) => {
        if (type === TOKEN_TYPE.gainer) {
            setLoadingGainer(true)
            if (tokenType === TOKEN_TYPE.loser) {
                setTokenType(TOKEN_TYPE.all)
            } else if (tokenType === TOKEN_TYPE.all) {
                setTokenType(TOKEN_TYPE.loser)
            }
        } else {
            setLoadingLoser(true)
            if (tokenType === TOKEN_TYPE.gainer) {
                setTokenType(TOKEN_TYPE.all)
            } else if (tokenType === TOKEN_TYPE.all) {
                setTokenType(TOKEN_TYPE.gainer)
            }
        }
        setLoadingGainer(false);
        setLoadingLoser(false);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        let gainers = [];
        let losers = [];
        for (let i = 0; i < formattedTokens.length; i++) {
            if (formattedTokens[i].priceChangeUSD >= 0) {
                gainers.push(formattedTokens[i]);
            } else {
                losers.push(formattedTokens[i]);
            }
        }
        if (gainers.length > 0)
            setGainers(gainers);
        if (losers.length > 0)
            setLosers(losers);
    }, [formattedTokens]);

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    if (tokenAddress === undefined)
        return (
            <Page title="Tokens">
                <div className="page-content">
                    <Container fluid>
                        <PageWrapper>
                            <FullWrapper>
                                <RowBetween>
                                    <Nav tabs className="flex flex-row">
                                        <NavItem>
                                            <NavLink className="cursor-pointer p-0 rounded-large" onClick={() => { handleTokenType(TOKEN_TYPE.gainer) }} >
                                                {/* <Badge pill color="success" className="absolute top-0 left-full translate-middle">{gainerTokens.length}
                                                    <span className="visually-hidden">Gainers</span></Badge> */}
                                                <Badge
                                                    color="secondary"
                                                    badgeContent={gainerTokens.length}
                                                    className={tokenType == TOKEN_TYPE.all || tokenType == TOKEN_TYPE.gainer ? "bg-black" : "bg-dark-grey-blue"}
                                                >
                                                    <Button variant="outlined" className="flex flex-row" color="success">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                                        </svg> Gainers
                                                    </Button>
                                                </Badge>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="cursor-pointer p-0 rounded" onClick={() => { handleTokenType(TOKEN_TYPE.loser) }} >
                                                <Badge
                                                    color="error"
                                                    badgeContent={loserTokens.length}
                                                    className={tokenType == TOKEN_TYPE.all || tokenType == TOKEN_TYPE.loser ? "bg-black" : "bg-dark-grey-blue"}
                                                >
                                                    <Button variant="outlined" className="flex flex-row" color="success">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                                                        </svg> Losers
                                                    </Button>
                                                </Badge>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <div className="items-center flex-block">
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
                                        <Button variant="contained" onClick={exportToCsv} className="btn-download btn-animation" size="md" color="warning" style={{ marginLeft: '5px' }} outline>
                                            {
                                                loadingExport &&
                                                <span className="d-flex align-items-center">
                                                    <span className="flex-grow-1 me-2">
                                                        Loading...
                                                    </span>
                                                    <Spinner size="sm" className="flex-shrink-0" role="status"> Loading... </Spinner>
                                                </span>
                                            }
                                            {
                                                !loadingExport && (<>Download CSV</>)
                                            }

                                        </Button>
                                    </div>
                                </RowBetween>
                                {/* TABLE ALL TOKENS */}
                                {(tokenType === TOKEN_TYPE.all) &&
                                    <Panel className="panel-shadow hsla-bg" style={{ marginTop: '6px', padding: '1.125rem 0 ', border: 'none' }}>
                                        <TopTokenList tokens={formattedTokens} />
                                    </Panel>
                                }
                                {/* TEXT GAINERS */}
                                {/* {tokenType == TOKEN_TYPE.all &&
                                    <RowBetween>
                                        <span style={{fontSize: 18, fontWeight: 450}}>Gainers</span>
                                    </RowBetween>
                                } */}
                                {/* TABLE GAINERS */}
                                {(tokenType === TOKEN_TYPE.gainer) &&
                                    <Panel className="panel-shadow hsla-bg" style={{ marginTop: '6px', padding: '1.125rem 0 ', border: 'none' }}>
                                        <TopTokenList tokens={gainerTokens} />
                                    </Panel>
                                }
                                {/* TEXT LOSERS */}
                                {/* {tokenType == TOKEN_TYPE.all &&
                                    <RowBetween>
                                        <span style={{fontSize: 18, fontWeight: 450}}>Losers</span>
                                    </RowBetween>
                                } */}
                                {/* TABLE LOSERS */}
                                {(tokenType === TOKEN_TYPE.loser) &&
                                    <Panel className="panel-shadow hsla-bg" style={{ marginTop: '6px', padding: '1.125rem 0 ', border: 'none' }}>
                                        <TopTokenList tokens={loserTokens} itemMax={15} show={1} />
                                    </Panel>
                                }
                                <div className="text-center">
                                    <a target="_blank" href="https://www.tradingview.com" rel="noreferrer"><img src="/assets/images/tradingview.png" width="200" className="m-auto" /></a>
                                </div>
                                <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 1000, fontStyle: "oblique" }}>
                                    The charts are provided by TradingView, a platform for traders and investors with versatile research tools and sophisticated data that helps you track coins like <a href="https://www.tradingview.com/symbols/BTCUSD/" style={{ color: '#0a58ca' }}>BTC USD</a> and <a href="https://www.tradingview.com/symbols/HBARUSD/" style={{ color: '#0a58ca' }}>HBAR USD</a> on charts to stay up-to-date on where crypto markets are moving.
                                </div>
                            </FullWrapper>
                        </PageWrapper>
                    </Container>
                </div>
            </Page>
        )
    else
        return (
            <TokenPage address={tokenAddress} />
        )
}
