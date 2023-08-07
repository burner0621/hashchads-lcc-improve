import React, { useState } from 'react'
import styled from 'styled-components'
import { useMedia } from 'react-use'
import { formattedNum } from '../../utils'
import { useGlobalDataContext, useHbarAndSaucePrice } from '../../hooks/useGlobalContext'
import { Spinner } from "reactstrap";

import { RowFixed } from '../Row'

import Badge from '@mui/material/Badge';

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

    const [tvlUsd, setTvlUsd] = useState(0)
    const [tvlHbar, setTvlHbar] = useState(0)
    const [dailyVolHbar, setDailyVolHbar] = useState(0)

    const [state] = useGlobalDataContext()
    const totalVolumeUSD = state?.globalData?.totalVolumeUSD;
    const totalVolumeHBAR = state?.globalData?.totalVolumeHBAR;
    const todayVolumeUSD = state?.globalData?.todayVolumeUSD;
    const hBarPrice = state?.hBarPrice;
    const saucePrice = state?.saucePrice;
    // const [hBarPrice, saucePrice] = useHbarAndSaucePrice()

    const formattedHbarPrice = hBarPrice ? formattedNum(hBarPrice, true) : undefined
    const formattedSaucePrice = saucePrice ? formattedNum(saucePrice, true) : undefined
    const formattedTvlUSD = totalVolumeUSD ? formattedNum(totalVolumeUSD, true) : undefined
    const formattedTvlHBAR = totalVolumeHBAR ? formattedNum(totalVolumeHBAR, false) : undefined
    const formattedTodayVolume = todayVolumeUSD ? formattedNum(todayVolumeUSD, false) : undefined
    const formattedTodayFees = todayVolumeUSD ? formattedNum(todayVolumeUSD / 400, true) : undefined

    // useHbarAndSaucePrice()
    return (
        <Header id="globalStats">
            <div className='justify-between' style={{ padding: below816 ? '0.5rem' : '.5rem' }}>
                <RowFixed>

                    <Text className='flex flex-row items-center text-grey-light'>{"HBAR Price: "}
                        {
                            formattedHbarPrice === undefined && <Spinner className='px-2' color="light" type="grow" style={{ verticalAlign: 'middle' }} />
                        }
                        {
                            formattedHbarPrice !== undefined && <span className='font-semibold text-white py-0.5 rounded-full border border-white ml-1 px-2' style={{ fontSize: 13 }}>{formattedHbarPrice}</span>
                        }
                    </Text>

                    <Text className='hidden sm:flex flex-row items-center text-grey-light'>{`TVL: `}
                        {
                            (formattedTvlUSD === undefined || formattedTvlHBAR === undefined) && <Spinner className='px-2' color="light" type="grow" style={{ verticalAlign: 'middle' }} />
                        }
                        {
                            formattedTvlUSD !== undefined && formattedTvlHBAR !== undefined && <span className='font-semibold text-white p-0.5 rounded-md border border-white ml-1 px-2' style={{ fontSize: 13 }}>{`${formattedTvlUSD} (${formattedTvlHBAR} ℏ)`}</span>
                        }
                    </Text>

                    <Text className='flex-row items-center text-grey-light hidden sm:flex'>{`24hr Volume: `}
                        {
                            (todayVolumeUSD === undefined || formattedTodayVolume === undefined) && <Spinner className='px-2' color="light" type="grow" style={{ verticalAlign: 'middle' }} />
                        }
                        {
                            todayVolumeUSD !== undefined && formattedTodayVolume !== undefined && <span className='font-semibold text-white p-0.5 rounded-md border border-white ml-1 px-2' style={{ fontSize: 13 }}>{`${formattedNum(todayVolumeUSD * hBarPrice, true)} (${formattedTodayVolume} ℏ)`}</span>
                        }
                    </Text>
                </RowFixed>
            </div>
        </Header>
    )
}
