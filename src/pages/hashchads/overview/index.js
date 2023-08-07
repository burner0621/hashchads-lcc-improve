import React, { useEffect, useState } from "react";
import { useMedia } from 'react-use'
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

import { useAllTokensInSaucerswap } from '../../../hooks/useGlobalContext'

import Panel from '../../../components/Panel'
import GlobalChart from '../../../components/GlobalChart'
import Trending from "../../../components/Trending"
import TitleMark from "../../../components/TitleMark";
import AssetCap from "../../../components/AssetCap";

const GridRowMobile = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  column-gap: 6px;
  align-items: start;
  justify-content: space-between;
`

const GridRow = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  column-gap: 6px;
  align-items: start;
  justify-content: space-between;
`
// ----------------------------------------------------------------------

Overview.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function Overview() {
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const [gainerTokens, setGainers] = useState([])
  const [loserTokens, setLosers] = useState([])
  console.log ("&&&&&&&&&&&&&&&&&")

  const allTokens = useAllTokensInSaucerswap()

  const below600 = useMedia('(max-width: 600px)')

  useEffect(() => {
    function fetchTopTokenData() {
      let tmpCur = [], tmpLoser = []

      let gainers = [], losers = [];
      for (let token of allTokens) {
        if (token.priceChangeUSD >= 0) {
          gainers.push(token);
        } else {
          losers.push(token);
        }
      }

      gainers = gainers.sort((a, b) => {
        if (a.priceChangeUSD < b.priceChangeUSD) {
          return 1;
        } else if (a.priceChangeUSD > b.priceChangeUSD) {
          return -1;
        }
        return 0;
      });

      losers = losers.sort((a, b) => {
        if (a.priceChangeUSD < b.priceChangeUSD) {
          return -1;
        } else if (a.priceChangeUSD > b.priceChangeUSD) {
          return 1;
        }
        return 0;
      });

      for (let token of gainers) {
        let tmp = {}
        tmp.id = token.id
        tmp.price = token.priceUsd.toFixed(6) || 0.0
        tmp.img = `https://saucerswap.finance${token.icon}`
        tmp.iconPath = token.icon
        tmp.change = token.priceChangeUSD.toFixed(6)
        tmp.coinName = token.name
        if (Number(token.priceChangeUSD) > 0) {
          tmp.iconClass = "success"
          tmp.icon = "mdi mdi-trending-up"
        } else {
          tmp.iconClass = "danger"
          tmp.icon = "mdi mdi-trending-down"
        }
        tmpCur.push(tmp)
      }

      for (let token of losers) {
        let tmp = {}
        tmp.id = token.id
        tmp.price = token.priceUsd.toFixed(6) || 0.0
        tmp.img = `https://saucerswap.finance${token.icon}`
        tmp.iconPath = token.icon
        tmp.change = token.priceChangeUSD.toFixed(6)
        tmp.coinName = token.name
        if (Number(token.priceChangeUSD) > 0) {
          tmp.iconClass = "success"
          tmp.icon = "mdi mdi-trending-up"
        } else {
          tmp.iconClass = "danger"
          tmp.icon = "mdi mdi-trending-down"
        }
        tmpLoser.push(tmp)
      }
      if (tmpCur.length > 0) setGainers(tmpCur)
      if (tmpLoser.length > 0) setLosers(tmpLoser)
    }
    if (allTokens && allTokens.length > 0) fetchTopTokenData()
  }, [allTokens])

  return (
    <Page title="Overview">
      <div className="page-content">
        <Container maxWidth="1980">
          {/* <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <div className="h-100">
                <GlobalStats />
              </div>
            </Grid>
          </Grid> */}
          {/* {below600 && ( // mobile card
            <GridRowMobile>
              <Panel className="panel-shadow bg-dark-grey-blue h-full min-h-[300px] max-h-[500px]" >
                <div className="animate-x-slide absolute top-0 left-1 h-1 rounded bg-dark-pink blur-xxs" />
                <div className="animate-y-slide absolute top-0.5 left-0 w-1 rounded bg-dark-green blur-xxs" />
                <div className="animate-y-slide absolute right-0 bottom-0.5 w-1 rounded bg-dark-green blur-xxs" />
                <div className="animate-x-slide absolute bottom-0 right-0.5 h-1 rounded bg-dark-pink blur-xxs" />
                <GlobalChart display="liquidity" id="liquidity" />
              </Panel>
              <br />
              <Panel className="panel-shadow bg-dark-grey-blue h-full min-h-[300px] max-h-[500px]">
                <div className="animate-x-slide absolute top-0 left-1 h-1 rounded bg-dark-pink blur-xxs" />
                <div className="animate-y-slide absolute top-0.5 left-0 w-1 rounded bg-dark-green blur-xxs" />
                <div className="animate-y-slide absolute right-0 bottom-0.5 w-1 rounded bg-dark-green blur-xxs" />
                <div className="animate-x-slide absolute bottom-0 right-0.5 h-1 rounded bg-dark-pink blur-xxs" />
                <GlobalChart display="volume" id="volume" />
              </Panel>
            </GridRowMobile>
          )}
          {!below600 && (
            <GridRow>
              <Panel className="panel-shadow bg-dark-grey-blue h-full min-h-[300px] max-h-[500px]" >
                <div className="animate-x-slide absolute top-0 left-1 h-1 rounded bg-dark-pink blur-xxs" />
                <div className="animate-y-slide absolute top-0.5 left-0 w-1 rounded bg-dark-green blur-xxs" />
                <div className="animate-y-slide absolute right-0 bottom-0.5 w-1 rounded bg-dark-green blur-xxs" />
                <div className="animate-x-slide absolute bottom-0 right-0.5 h-1 rounded bg-dark-pink blur-xxs" />
                <GlobalChart display="liquidity" id="liquidity" />
              </Panel>
              <Panel className="panel-shadow bg-dark-grey-blue h-full min-h-[300px] max-h-[500px]">
                <div className="animate-x-slide absolute top-0 left-1 h-1 rounded bg-dark-pink blur-xxs" />
                <div className="animate-y-slide absolute top-0.5 left-0 w-1 rounded bg-dark-green blur-xxs" />
                <div className="animate-y-slide absolute right-0 bottom-0.5 w-1 rounded bg-dark-green blur-xxs" />
                <div className="animate-x-slide absolute bottom-0 right-0.5 h-1 rounded bg-dark-pink blur-xxs" />
                <GlobalChart display="volume" id="volume" />
              </Panel>
            </GridRow>
          )} */}
          <TitleMark />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Trending data={gainerTokens} title={"Gainer Tokens"} />
            <Trending data={loserTokens} title={"Loser Tokens"} />
          </div>
          <AssetCap />
        </Container>
      </div>
    </Page>
  );
}