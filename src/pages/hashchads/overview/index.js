import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    async function fetchData () {
      let response = await axios.get(`${process.env.API_URL}/tokens/get_top_tokens`)
      if (response.status === 200) {
        const data = response.data
        if (data.success) {
          setGainers(data.data.gainers)
          setLosers(data.data.losers)
        }
      }
    }
    fetchData ()
  }, [])

  return (
    <Page title="Overview">
      <div className="page-content">
        <Container maxWidth="1980">
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