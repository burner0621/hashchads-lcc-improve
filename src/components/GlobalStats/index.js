import React, { useState } from 'react'
import styled from 'styled-components'
import { useMedia } from 'react-use'
import { formattedNum } from '../../utils'
import { useGlobalDataContext, useHbarAndSaucePrice } from '../../hooks/useGlobalContext'
import { Spinner } from "reactstrap";

import {RowFixed} from '../Row'

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
    const below1295 = useMedia('(max-width: 1295px)')
    const below1180 = useMedia('(max-width: 1180px)')
    const below1024 = useMedia('(max-width: 1024px)')
    const below400 = useMedia('(max-width: 400px)')
    const below600 = useMedia('(max-width: 600px)')
    const below816 = useMedia('(max-width: 816px)')

    const [tvlUsd, setTvlUsd] = useState(0)
    const [tvlHbar, setTvlHbar] = useState(0)
    const [dailyVolHbar, setDailyVolHbar] = useState(0)

    const [state]= useGlobalDataContext()
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
    const formattedTodayFees = todayVolumeUSD ? formattedNum(todayVolumeUSD/400, true) : undefined

    // useHbarAndSaucePrice()
    return (
        <Header id="globalStats">
            <div className='justify-between' style={{ padding: below816 ? '0.5rem' : '.5rem' }}>
                {!below600 && (
                    <RowFixed>
                    
                        <Text className='flex flex-row items-center text-grey-light'>{"HBAR Price: "}
                            {
                                formattedHbarPrice === undefined && <Spinner className='px-2' color="light" type="grow" style={{ verticalAlign: 'middle' }} />
                            }
                            {
                                formattedHbarPrice !== undefined && <span className='font-semibold text-white py-0.5 rounded-full border border-white ml-1 px-2' style={{ fontSize: 13 }}>{formattedHbarPrice}</span>
                            }
                        </Text>
                    
                    
                        {/* <Text className='flex flex-row items-center text-grey-light'>{"SAUCE Price: "}
                            {
                                formattedSaucePrice === undefined && <Spinner className='px-2' color="light" type="grow" style={{ verticalAlign: 'middle' }} />
                            }
                            {
                                formattedSaucePrice !== undefined && <span className='font-semibold text-white p-0.5 rounded-full border border-white ml-1 px-2' style={{ fontSize: 13 }}>{formattedSaucePrice}</span>
                            }
                        </Text> */}

                        <Text className='flex flex-row items-center text-grey-light'>{`TVL: `}
                            {
                                (formattedTvlUSD === undefined || formattedTvlHBAR === undefined) && <Spinner className='px-2' color="light" type="grow" style={{ verticalAlign: 'middle' }} />
                            }
                            {
                                formattedTvlUSD !== undefined && formattedTvlHBAR !== undefined && <span className='font-semibold text-white p-0.5 rounded-md border border-white ml-1 px-2' style={{ fontSize: 13 }}>{`${formattedTvlUSD} (${formattedTvlHBAR} ℏ)`}</span>
                            }
                        </Text>

                        <Text className='flex flex-row items-center text-grey-light'>{`24hr Volume: `}
                            {
                                (todayVolumeUSD === undefined || formattedTodayVolume === undefined) && <Spinner className='px-2' color="light" type="grow" style={{ verticalAlign: 'middle' }} />
                            }
                            {
                                todayVolumeUSD !== undefined && formattedTodayVolume !== undefined && <span className='font-semibold text-white p-0.5 rounded-md border border-white ml-1 px-2' style={{ fontSize: 13 }}>{`${formattedNum(todayVolumeUSD * hBarPrice, true)} (${formattedTodayVolume} ℏ)`}</span>
                            }
                        </Text>

                        {/* <Text className='flex flex-row items-center text-grey-light'>{'24hr Fees: '}
                            {
                                (todayVolumeUSD === undefined || formattedTodayFees === undefined) && <Spinner className='px-2' color="light" type="grow" style={{ verticalAlign: 'middle' }} />
                            }
                            {
                                todayVolumeUSD !== undefined && formattedTodayFees !== undefined && <span className='font-semibold text-white p-0.5 rounded-md border border-white ml-1 px-2' style={{ fontSize: 13 }}>{'$' + formattedNum(todayVolumeUSD * hBarPrice / 400)}</span>
                            }
                        </Text> */}
                    </RowFixed>
                )}
                {below600 && (
                <div>
                    <RowFixed>
                        <Text className='fs-6'>{"HBAR Price: "}
                            {
                                formattedHbarPrice === undefined && <Spinner color="light" type="grow" style={{ verticalAlign: 'middle' }} />
                            }
                            {
                                formattedHbarPrice !== undefined && <span className='badge rounded-pill badge-outline-light' style={{ fontSize: 13 }}>{formattedHbarPrice}</span>
                            }
                        </Text>
                        <Text className='fs-6'>{"SAUCE Price: "}
                            {
                                formattedSaucePrice === undefined && <Spinner color="light" type="grow" style={{ verticalAlign: 'middle' }} />
                            }
                            {
                                formattedSaucePrice !== undefined && <span className='badge rounded-pill badge-outline-light' style={{ fontSize: 13 }}>{formattedSaucePrice}</span>
                            }
                        </Text>
                    </RowFixed>
                    <RowFixed>
                        <Text className='fs-6'>{`TVL: `}
                            {
                                (formattedTvlUSD === undefined || formattedTvlHBAR === undefined) && <Spinner color="light" type="grow" style={{ verticalAlign: 'middle' }} />
                            }
                            {
                                formattedTvlUSD !== undefined && formattedTvlHBAR !== undefined && <span className='badge badge-outline-light' style={{ fontSize: 13 }}>{`${formattedTvlUSD} (${formattedTvlHBAR} ℏ)`}</span>
                            }
                        </Text>
                    </RowFixed>
                    <RowFixed>
                        <Text className='fs-6'>{`24hr Volume: `}
                            {
                                (todayVolumeUSD === undefined || formattedTodayVolume === undefined) && <Spinner color="light" type="grow" style={{ verticalAlign: 'middle' }} />
                            }
                            {
                                todayVolumeUSD !== undefined && formattedTodayVolume !== undefined && <span className='badge badge-outline-light' style={{ fontSize: 13 }}>{`${formattedNum(todayVolumeUSD * hBarPrice, true)} (${formattedTodayVolume} ℏ)`}</span>
                            }
                        </Text>
                    </RowFixed>
                    <RowFixed>
                        <Text className='fs-6'>{'24hr Fees: '}
                            {
                                (todayVolumeUSD === undefined || formattedTodayFees === undefined) && <Spinner color="light" type="grow" style={{ verticalAlign: 'middle' }} />
                            }
                            {
                                todayVolumeUSD !== undefined && formattedTodayFees !== undefined && <span className='badge badge-outline-light' style={{ fontSize: 13 }}>{'$' + formattedNum(todayVolumeUSD * hBarPrice / 400)}</span>
                            }
                        </Text>
                    </RowFixed>
                </div>
                )}
            </div>
        </Header>
    )
}
