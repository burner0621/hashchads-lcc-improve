import { useState, useEffect } from 'react'
import fetch from 'cross-fetch'
import {
    getPercentChange,
    formattedNum
} from '../../utils'

const TitleMark = () => {
    const [totalLiquidity, setTotalLiquidity] = useState(0)
    const [liqChange, setLiqChange] = useState(0)

    useEffect(() => {
        async function fetchData() {
            const now_date = new Date()
            try {
                let response = await fetch(`https://api.saucerswap.finance/stats/platformData?field=LIQUIDITY&interval=DAY&from=${now_date / 1000 - 86400 * 3}&to=${now_date / 1000}`)
                if (response.status === 200) {
                    let jsonData = await response.json();
                    const tmpTotalLiq = Number(jsonData[jsonData.length - 1]['valueHbar'])
                    const oneDayTotalLiq = Number(jsonData[jsonData.length - 2]['valueHbar'])

                    const tmpLiqchange = getPercentChange(
                        tmpTotalLiq,
                        oneDayTotalLiq
                    )
                    setTotalLiquidity((tmpTotalLiq / 100000000).toFixed(2))
                    setLiqChange(tmpLiqchange.toFixed(2))
                }
            } catch (e) {
                console.log(e)
            }
        }
        if (totalLiquidity === 0) fetchData()
    }, [])
    return (
        <div className="hidden sm:flex flex-row justify-between">
            <div className="flex flex-col max-w-full sm:max-w-[800px]">
                <span className="text-xl text-white">Today's Hedera Native Asset Market</span>
                <span className="text-sm text-gray-400 flex flex-row">
                    {`The Saucerswap market has ${formattedNum(totalLiquidity, false)} ℏ locked in liquidity, a`}&nbsp;
                    {liqChange > 0 &&
                        <span className='text-green-weight flex flex-col justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </span>
                    }
                    {liqChange <= 0 &&
                        <span className='text-red-weight flex flex-col justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                            </svg>
                        </span>
                    }
                    {`${liqChange}% increase since yesterday`}
                </span>
            </div>
            <div className="hidden sm:grid grid-cols-1 gap-2 bg-dark-grey-blue rounded">
                <div className="px-3 py-2 text-sm flex flex-row w-fit items-center cursor-pointer hover:bg-gray-weight rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                    </svg>
                    Charts
                </div>
            </div>
        </div>
    )
}

export default TitleMark