import React, { useCallback, useEffect, useState } from "react";
import styled from 'styled-components'
// @mui
import { useTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
import Page from '../../../components/Page';
// sections

import Trending from "../../../components/Trending"
import TitleMark from "../../../components/TitleMark";
import AssetCap from "../../../components/AssetCap";

import axios from 'axios'

Overview.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function Overview() {
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const [gainerTokens, setGainers] = useState([])
  const [loserTokens, setLosers] = useState([])
  const [newTokens, setNewTokens] = useState([])

  const fetchData = useCallback(async () => {
    let response = await axios.get(`${process.env.API_URL}/tokens/get_top_tokens`)
    if (response.status === 200) {
      const data = response.data
      if (data.success) {
        setGainers(data.data.gainers)
        setLosers(data.data.losers)
      }
    }
    response = await axios.get(`${process.env.API_URL}/tokens/get_new_tokens?count=25`)
    if (response.status === 200) {
      const data = response.data
      if (data.success) setNewTokens(data.data)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <Page title="Overview">
      <div className="page-content">
        <Container maxWidth="1980">
          <TitleMark />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Trending data={gainerTokens.slice(0, 6)} title={"Gainer Tokens"} />
            <Trending data={loserTokens.slice(0, 6)} title={"Loser Tokens"} />
            <Trending data={newTokens.slice(0, 6)} title={"Recently Added"} />
          </div>
          <AssetCap />
          <div className="text-center mt-4">
            <a target="_blank" href="https://www.tradingview.com" rel="noreferrer"><img src="/assets/images/tradingview.png" width="200" className="m-auto" /></a>
          </div>
          <div className="text-center text-sm font-bold mt-2" style={{fontStyle: "oblique" }}>
            The charts are provided by TradingView, a platform for traders and investors with versatile research tools and sophisticated data that helps you track coins like <a href="https://www.tradingview.com/symbols/BTCUSD/" style={{ color: '#0a58ca' }}>BTC USD</a> and <a href="https://www.tradingview.com/symbols/HBARUSD/" style={{ color: '#0a58ca' }}>HBAR USD</a> on charts to stay up-to-date on where crypto markets are moving.
          </div>
        </Container>
      </div>
    </Page>
  );
}