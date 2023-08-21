import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useMedia } from 'react-use'
import { formattedNum } from '../../utils'
import { Spinner } from "reactstrap";

import { RowFixed } from '../Row'

import axios from 'axios'

const Header = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
`

const Medium = styled.span`
  font-weight: 500;
`

const Text = styled.div`
    font-size: 0.8125rem !important;
    margin: 14px;
`

export default function GlobalStats() {
    const below600 = useMedia('(max-width: 600px)')
    const below816 = useMedia('(max-width: 816px)')

    const [totalVolumeHBAR, setTotalVolumeHBAR] = useState(0)
    const [totalVolumeUSD, setTotalVolumeUSD] = useState(0)
    const [todayVolumeUSD, setTodayVolumeUSD] = useState(0)
    const [hBarPrice, setHBarPrice] = useState(0)

    const formattedHbarPrice = hBarPrice ? formattedNum(hBarPrice, true) : undefined
    const formattedTvlUSD = totalVolumeUSD ? formattedNum(totalVolumeUSD, true) : undefined
    const formattedTvlHBAR = totalVolumeHBAR ? formattedNum(totalVolumeHBAR, false) : undefined
    const formattedTodayVolume = todayVolumeUSD ? formattedNum(todayVolumeUSD, false) : undefined
    useEffect(() => {
        async function fetchData() {
            let response = await axios.get(`${process.env.API_URL}/stats`)
            if (response.status === 200) {
                let jsonData = await response.data;
                try {
                    setTotalVolumeHBAR((Number(jsonData['tvl']) / 100000000).toFixed(4));
                    setTotalVolumeUSD(Number(jsonData['tvlUsd']).toFixed(4));
                } catch (error) {
                    console.log(error)
                }
            }
            response = await axios.get(`${process.env.API_URL}/stats/get_daily_volumes`)
            if (response.status === 200) {
                let jsonData = await response.data;
                setTodayVolumeUSD(Number(jsonData[0]['dailyVolume'] / 100000000).toFixed(4))
            }
            response = await axios.get(`${process.env.API_URL}/tokens/get_hbar_price`)
            if (response.status === 200) {
                let jsonData = await response.data;
                setHBarPrice(Number(jsonData.data).toFixed(4))
            }
        }

        fetchData()
    }, [])

    // useHbarAndSaucePrice()
    return (
        <Header id="globalStats">
            <div className='justify-between' style={{ padding: '0.5rem 0.5rem 0.5rem 0'}}>
                <RowFixed>

                    <Text className='flex flex-row items-center text-grey-light' style={{margin: "14px 14px 14px 0"}}>{"HBAR Price: "}
                        {
                            formattedHbarPrice === undefined && <Spinner className='px-2' color="light" type="grow" style={{ verticalAlign: 'middle' }} />
                        }
                        {
                            formattedHbarPrice !== undefined && <span className='font-semibold text-white py-0.5 rounded-full ml-1 px-2' style={{ fontSize: 13 }}>{formattedHbarPrice}</span>
                        }
                    </Text>

                    <Text className='hidden sm:flex flex-row items-center text-grey-light'>{`TVL: `}
                        {
                            (formattedTvlUSD === undefined || formattedTvlHBAR === undefined) && <Spinner className='px-2' color="light" type="grow" style={{ verticalAlign: 'middle' }} />
                        }
                        {
                            formattedTvlUSD !== undefined && formattedTvlHBAR !== undefined && <span className='font-semibold text-white p-0.5 rounded-md ml-1 px-2' style={{ fontSize: 13 }}>{`${formattedTvlUSD} (${formattedTvlHBAR} ℏ)`}</span>
                        }
                    </Text>

                    <Text className='flex-row items-center text-grey-light hidden sm:flex'>{`24hr Volume: `}
                        {
                            (todayVolumeUSD === undefined || formattedTodayVolume === undefined) && <Spinner className='px-2' color="light" type="grow" style={{ verticalAlign: 'middle' }} />
                        }
                        {
                            todayVolumeUSD !== undefined && formattedTodayVolume !== undefined && <span className='font-semibold text-white p-0.5 rounded-md ml-1 px-2' style={{ fontSize: 13 }}>{`${formattedNum(todayVolumeUSD * hBarPrice, true)} (${formattedTodayVolume} ℏ)`}</span>
                        }
                    </Text>
                </RowFixed>
            </div>
        </Header>
    )
}
