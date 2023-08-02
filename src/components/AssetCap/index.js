import React, { useEffect, useState, useMemo } from "react";
import TopTokenList from '../TokenList'
import Panel from '../Panel'
import { useAllTokensInSaucerswap  } from "../../hooks/useGlobalContext";
const AssetCap = () => {
    const [listType, setListType] = useState (0) // 0: tokens, 1: pairs
    const [dtype, setDtype] = useState (0) // 0: top, 1: gainer, 2: loser, 3: recently

    const allTokens = useAllTokensInSaucerswap ()

    return (
        <>
            <div className="flex flex-row justify-between mt-6">
                <div className="flex flex-row gap-0 bg-dark-grey-blue rounded">
                    <div className={ listType === 0 ?
                        "px-3 py-2 w-17.5 text-sm flex flex-row w-fit justify-center items-center cursor-pointer hover:bg-gray-weight rounded bg-darker-grey-blue border border-main-red":
                        "px-3 py-2 w-17.5 text-sm flex flex-row w-fit justify-center items-center cursor-pointer hover:bg-gray-weight rounded"}
                        onClick={() => setListType(0)}
                    >
                        Tokens
                    </div>
                    <div className={ listType === 1 ?
                        "px-3 py-2 w-17.5 text-sm flex flex-row w-fit justify-center items-center cursor-pointer hover:bg-gray-weight rounded bg-darker-grey-blue border border-main-red":
                        "px-3 py-2 w-17.5 text-sm flex flex-row w-fit justify-center items-center cursor-pointer hover:bg-gray-weight rounded"}
                        onClick={() => setListType(1)}
                    >
                        Pairs
                    </div>
                </div>
                <div className="flex flex-row gap-0 bg-dark-grey-blue rounded">
                    <div className={dtype === 0?
                        "px-3 py-2 text-sm flex flex-row w-fit justify-center items-center cursor-pointer hover:bg-gray-weight rounded bg-darker-grey-blue border border-main-red":
                        "px-3 py-2 text-sm flex flex-row w-fit justify-center items-center cursor-pointer hover:bg-gray-weight rounded"}
                        onClick={() => setDtype(0)}
                    >
                        <svg strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path id="Icon_ionic-ios-trophy" dataName="Icon ionic-ios-trophy" d="M17.466,5.762H15.153v-.7a.562.562,0,0,0-.561-.561H6.74a.562.562,0,0,0-.561.561v.7H3.866a.492.492,0,0,0-.491.491h0a5.562,5.562,0,0,0,.792,3.169,2.854,2.854,0,0,0,1.973,1.413.288.288,0,0,1,.217.172,3.81,3.81,0,0,0,1.791,1.83,6.759,6.759,0,0,0,1.812.757.281.281,0,0,1,.217.273V16.7a.281.281,0,0,1-.28.28H7.6a.5.5,0,0,0-.5.466.491.491,0,0,0,.491.515H13.74a.5.5,0,0,0,.5-.466.491.491,0,0,0-.491-.515H11.441a.281.281,0,0,1-.28-.28V13.87a.281.281,0,0,1,.217-.273,6.924,6.924,0,0,0,1.812-.757,3.81,3.81,0,0,0,1.791-1.83.281.281,0,0,1,.217-.172,2.854,2.854,0,0,0,1.973-1.413,5.641,5.641,0,0,0,.785-3.172h0A.492.492,0,0,0,17.466,5.762ZM6.179,9.639a.141.141,0,0,1-.189.133A2.042,2.042,0,0,1,4.917,8.759a3.691,3.691,0,0,1-.529-1.711.281.281,0,0,1,.28-.3H5.9a.281.281,0,0,1,.28.28Zm10.235-.88a2.042,2.042,0,0,1-1.073,1.013.141.141,0,0,1-.189-.133V7.024a.281.281,0,0,1,.28-.28h1.23a.281.281,0,0,1,.28.3A3.734,3.734,0,0,1,16.415,8.759Z" />
                        </svg>&nbsp;
                        Top 25
                    </div>
                    <div className={dtype === 1?
                        "px-3 py-2 text-sm flex flex-row w-fit justify-center items-center cursor-pointer hover:bg-gray-weight rounded bg-darker-grey-blue border border-main-red":
                        "px-3 py-2 text-sm flex flex-row w-fit justify-center items-center cursor-pointer hover:bg-gray-weight rounded"}
                        onClick={() => setDtype(1)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z" clipRule="evenodd" />
                        </svg>&nbsp;
                        Top Gainers
                    </div>
                    <div className={dtype === 2?
                        "px-3 py-2 text-sm flex flex-row w-fit justify-center items-center cursor-pointer hover:bg-gray-weight rounded bg-darker-grey-blue border border-main-red":
                        "px-3 py-2 text-sm flex flex-row w-fit justify-center items-center cursor-pointer hover:bg-gray-weight rounded"}
                        onClick={() => setDtype(2)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M3.97 3.97a.75.75 0 011.06 0l13.72 13.72V8.25a.75.75 0 011.5 0V19.5a.75.75 0 01-.75.75H8.25a.75.75 0 010-1.5h9.44L3.97 5.03a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>&nbsp;
                        Top Losers
                    </div>
                    <div className={dtype === 3?
                        "px-3 py-2 text-sm flex flex-row w-fit justify-center items-center cursor-pointer hover:bg-gray-weight rounded bg-darker-grey-blue border border-main-red":
                        "px-3 py-2 text-sm flex flex-row w-fit justify-center items-center cursor-pointer hover:bg-gray-weight rounded"}
                        onClick={() => setDtype(3)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>&nbsp;
                        Recently Added
                    </div>
                </div>
            </div>
            <div>
                <Panel className="panel-shadow hsla-bg" style={{ marginTop: '6px', padding: '1.125rem 0 ', border: 'none' }}>
                    <TopTokenList tokens={allTokens}/>
                </Panel>
            </div>
        </>
    )
}

export default AssetCap