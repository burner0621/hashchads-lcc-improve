import { useRouter } from 'next/router';
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { Search as SearchIcon, X } from 'react-feather'
import styled from 'styled-components'
import { paramCase } from 'change-case';
import { useMedia } from 'react-use'

import Row, { RowFixed } from '../Row'

// import FormattedName from '../FormattedName'
import TokenLogo from '../TokenLogo'
import DoubleTokenLogo from '../DoubleLogo'

import { PATH_HASHCHADS } from '../../routes/paths';
import axios from 'axios'

const Container = styled.div`
  height: 36px;
  z-index: 30;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`
const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  padding: 6px 10px;
  border-radius: 12px;
  border-bottom-right-radius: ${({ open }) => (open === "true" ? '0px' : '12px')};
  border-bottom-left-radius: ${({ open }) => (open === "true" ? '0px' : '12px')};
  z-index: 9999;
  width: 100%;
  box-sizing: border-box;
  box-shadow: ${({ open, small }) =>
        open !== "true" && small !== "true"
            ? '0px 24px 32px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04) '
            : 'none'};
  @media screen and (max-width: 500px) {
    box-shadow: ${({ open }) =>
        open === "false"
            ? '0px 24px 32px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04) '
            : 'none'};
  }
`
const Input = styled.input`
  position: relative;
  display: flex;
  align-items: center;
  white-space: nowrap;
  background: none;
  border: none;
  outline: none;
  width: 100%;
  font-size: ${({ large }) => (large === "true"  ? '16px' : '12px')};

  ::placeholder {
    font-size: 16px;
  }

  @media screen and (max-width: 640px) {
    ::placeholder {
      font-size: 14px;
    }
    font-size: 14px;
  }
  @media screen and (max-width: 480px) {
    ::placeholder {
      font-size: 12px;
    }
    font-size: 12px;
  }
`

const SearchIconLarge = styled(SearchIcon)`
  height: 20px;
  width: 20px;
  margin-right: 0.5rem;
  position: absolute;
  right: 10px;
  pointer-events: none;
`

const CloseIcon = styled(X)`
  height: 20px;
  width: 20px;
  margin-right: 0.5rem;
  position: absolute;
  right: 10px;
  :hover {
    cursor: pointer;
  }
`

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 9999;
  width: 100%;
  top: 50px;
  max-height: 540px;
  overflow: auto;
  right: 0;
  padding-bottom: 20px;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.04);
  display: ${({ hide }) => hide === "true" && 'none'};
`

const MenuItem = styled(Row)`
  padding: 1rem;
  font-size: 0.85rem;
  & > * {
    margin-right: 6px;
  }
  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.bg2};
  }
`

const Heading = styled(Row)`
  padding: 1rem;
  display: ${({ hide = false }) => hide && 'none'};
`

const Gray = styled.span`
  color: #888d9b;
`

const Blue = styled.span`
  color: #2172e5;
  :hover {
    cursor: pointer;
  }
`

export const Search = ({ small = false, display }) => {
    const { push } = useRouter();

    const [showMenu, toggleMenu] = useState(false)
    const [value, setValue] = useState('')
    const [, toggleShadow] = useState(false)
    const [, toggleBottomShadow] = useState(false)
    const [searchedPairs, setSearchedPairs] = useState([])
    const [searchedTokens, setSearchedTokens] = useState([])
    const [tokensShown, setTokensShown] = useState(3)
    const [pairsShown, setPairsShown] = useState(3)

    const [allTokens, setAllTokens] = useState([])
    const [allPairs, setAllPairs] = useState([])
    const [uniquePairs, setUniquePairs] = useState ([])
    const [uniqueTokens, setUniqueTokens] = useState ([])

    const below700 = useMedia('(max-width: 700px)')
    const below470 = useMedia('(max-width: 470px)')
    const below410 = useMedia('(max-width: 410px)')
    const below300 = useMedia('(max-width: 300px)')

    const fetchData = useCallback(async () => {
        let response = await axios.get(`${process.env.API_URL}/tokens/simple_all`)
        if (response.status === 200) {
            let jsonData = await response.data;
            setAllTokens(jsonData)
        }
        response = await axios.get(`${process.env.API_URL}/pools/all`)
        if (response.status === 200) {
            let jsonData = await response.data
            setAllPairs(jsonData)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    useEffect(() => {
        if (value !== '') {
            toggleMenu(true)
        } else {
            toggleMenu(false)
        }
    }, [value])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    let tmpUniquePairs = []
    let pairsFound = {}
    useEffect(() => {
        allPairs &&
            allPairs.map((pair) => {
                if (!pairsFound[pair.id]) {
                    pairsFound[pair.id] = true
                    tmpUniquePairs.push(pair)
                }
                return true
            })

        setUniquePairs (tmpUniquePairs)
    }, [allPairs])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    let tmpUniqueTokens = []
    let found = {}

    useEffect(() => {
        allTokens &&
            allTokens.map((token) => {
                if (!found[token.id]) {
                    found[token.id] = true
                    tmpUniqueTokens.push(token)
                }
                return true
            })
        setUniqueTokens (tmpUniqueTokens)
    }, [allTokens])


    // add the searched tokens to the list if not found yet
    useEffect(() => {
        let tmpAllTokens = allTokens.concat(
            searchedTokens.filter((searchedToken) => {
                let included = false
                allTokens.map((token) => {
                    if (token.id === searchedToken.id) {
                        included = true
                    }
                    return true
                })
                return !included
            })
        )
        setAllTokens(tmpAllTokens)
    }, [searchedTokens])


    const filteredPairList = useMemo(() => {
        return uniquePairs
            ? uniquePairs
                .filter((pair) => {
                    if (value && value.includes(' ')) {
                        const pairA = value.split(' ')[0]?.toUpperCase()
                        const pairB = value.split(' ')[1]?.toUpperCase()
                        return (
                            (pair.tokenA?.symbol.includes(pairA) || pair.tokenA?.symbol.includes(pairB)) &&
                            (pair.tokenB?.symbol.includes(pairA) || pair.tokenB?.symbol.includes(pairB))
                        )
                    }
                    if (value && value.includes('-')) {
                        const pairA = value.split('-')[0]?.toUpperCase()
                        const pairB = value.split('-')[1]?.toUpperCase()
                        return (
                            (pair.tokenA.symbol?.includes(pairA) || pair.tokenA?.symbol.includes(pairB)) &&
                            (pair.tokenB.symbol?.includes(pairA) || pair.tokenB?.symbol.includes(pairB))
                        )
                    }
                    const regexMatches = Object.keys(pair).map((field) => {
                        const isAddress = value?.slice(0, 2) === '0x'
                        if (field === 'id' && isAddress) {
                            return pair[field]?.match(new RegExp(escapeRegExp(value), 'i'))
                        }
                        if (field === 'tokenA') {
                            return (
                                pair[field]?.symbol?.match(new RegExp(escapeRegExp(value), 'i')) ||
                                pair[field]?.name.match(new RegExp(escapeRegExp(value), 'i'))
                            )
                        }
                        if (field === 'tokenB') {
                            return (
                                pair[field]?.symbol?.match(new RegExp(escapeRegExp(value), 'i')) ||
                                pair[field]?.name.match(new RegExp(escapeRegExp(value), 'i'))
                            )
                        }
                        return false
                    })
                    return regexMatches.some((m) => m)
                })
            : []
    }, [uniquePairs, value])

    const filteredTokenList = useMemo(() => {
        return uniqueTokens
            ? uniqueTokens
                .filter((token) => {
                    const regexMatches = Object.keys(token).map((tokenEntryKey) => {
                        const isAddress = value.slice(0, 4) === '0.0.'
                        if (tokenEntryKey === 'id' && isAddress) {
                            return token[tokenEntryKey].match(new RegExp(escapeRegExp(value), 'i'))
                        }
                        if (tokenEntryKey === 'symbol' && !isAddress) {
                            return token[tokenEntryKey].match(new RegExp(escapeRegExp(value), 'i'))
                        }
                        if (tokenEntryKey === 'name' && !isAddress) {
                            return token[tokenEntryKey].match(new RegExp(escapeRegExp(value), 'i'))
                        }
                        return false
                    })
                    return regexMatches.some((m) => m)
                })
            : []
    }, [uniqueTokens, value])

    useEffect(() => {
        if (Object.keys(filteredPairList).length > 2) {
            toggleBottomShadow(true)
        } else {
            toggleBottomShadow(false)
        }
    }, [filteredPairList])

    useEffect(() => {
        if (Object.keys(filteredTokenList).length > 2) {
            toggleShadow(true)
        } else {
            toggleShadow(false)
        }
    }, [filteredTokenList])

    useEffect(() => {
        let tmpAllPairs = allPairs.concat(
            searchedPairs.filter((searchedPair) => {
                let included = false
                allPairs.map((pair) => {
                    if (pair.id === searchedPair.id) {
                        included = true
                    }
                    return true
                })
                return !included
            })
        )
        setAllPairs(tmpAllPairs)
    }, [searchedPairs])

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
    }

    function onDismiss() {
        setPairsShown(3)
        setTokensShown(3)
        toggleMenu(false)
        setValue('')
    }

    // refs to detect clicks outside modal
    const wrapperRef = useRef()
    const menuRef = useRef()

    const handleClick = (e) => {
        if (
            !(menuRef.current && menuRef.current.contains(e.target)) &&
            !(wrapperRef.current && wrapperRef.current.contains(e.target))
        ) {
            setPairsShown(3)
            setTokensShown(3)
            toggleMenu(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    })

    const redirectPairPage = (contractId) => {
        push(PATH_HASHCHADS.pairs.view(paramCase(contractId)));
    };

    const redirectTokenPage = (tokenId) => {
        push(PATH_HASHCHADS.tokens.view(paramCase(tokenId)));
    };

    return (
        <Container small={small.toString()} className='max-w-[150px] sm:max-w-[360px]'>
            <Wrapper open={showMenu} shadow="true" small={small.toString()} className="justify-start sm:justify-end min-w-[150px] sm:min-w-[300px]" style={{ border: "solid 1px #ff007a" }}>
                <Input
                    large={(!small).toString()}
                    type={'text'}
                    ref={wrapperRef}
                    placeholder={
                        small
                            ? ''
                            : below300
                                ? 'Search...'
                                : below470
                                    ? 'Search ...'
                                    : below700
                                        ? 'Search pairs and tokens...'
                                        : 'Search pairs and tokens...'
                    }
                    value={value}
                    style={{ color: "white" }}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    onFocus={() => {
                        if (!showMenu) {
                            toggleMenu(true)
                        }
                    }}
                />
                {!showMenu ? <SearchIconLarge /> : <CloseIcon onClick={() => { toggleMenu(false); }} />}
            </Wrapper>
            <Menu hide={(!showMenu).toString()} ref={menuRef} style={{ zIndex: "300", background: "#0b1217", minWidth:300 }} className='absolute'>
                {
                    (display === "all" || display === "token") &&
                    <>
                        <Heading>
                            <Gray>Tokens</Gray>
                        </Heading>
                        <div>
                            {Object.keys(filteredTokenList).length === 0 && (
                                <MenuItem>
                                    {/* <TYPE.body>No results</TYPE.body> */}
                                    No results
                                </MenuItem>
                            )}

                            {filteredTokenList.slice(0, tokensShown).map((token) => {
                                // update displayed names
                                return (
                                    <a key={token.id} onClick={() => {onDismiss(); redirectTokenPage(token.id)}}>
                                        <MenuItem>
                                            <RowFixed>
                                                <TokenLogo path={token.icon} style={{ marginRight: '10px' }} />
                                                {/* <FormattedName text={token.name} maxCharacters={20} style={{ marginRight: '6px' }} />
                                        (<FormattedName text={token.symbol} maxCharacters={6} />) */}
                                                <div style={{ marginLeft: '10px' }}>
                                                    {token.name + "    (" + token.symbol + ")"}
                                                </div>
                                            </RowFixed>
                                        </MenuItem>
                                    </a>
                                )
                            })}

                            <Heading
                                hide={(!(Object.keys(filteredTokenList).length > 3 && Object.keys(filteredTokenList).length >= tokensShown)).toString()}
                            >
                                <Blue
                                    onClick={() => {
                                        setTokensShown(tokensShown + 5)
                                    }}
                                >
                                    See more...
                                </Blue>
                            </Heading>
                        </div>
                    </>
                }
                {
                    (display === "all" || display === "pair") &&
                    <>
                        <Heading>
                            <Gray>Pairs</Gray>
                        </Heading>
                        <div>
                            {filteredPairList && Object.keys(filteredPairList).length === 0 && (
                                <MenuItem>
                                    <div>No results</div>
                                </MenuItem>
                            )}
                            {filteredPairList &&
                                filteredPairList.slice(0, pairsShown).map((pair, index) => {
                                    //format incorrect names
                                    // updateNameData(pair)
                                    return (
                                        <a key={pair.contractId} onClick={() => {onDismiss();redirectPairPage(pair.contractId)}}>
                                            <MenuItem>
                                                <DoubleTokenLogo id={index} a0={pair?.tokenA?.icon} a1={pair?.tokenB?.icon} margin="true" />
                                                <div style={{ marginLeft: '10px' }}>
                                                    {pair.tokenA.symbol + '-' + pair.tokenB.symbol} Pair
                                                </div>
                                            </MenuItem>
                                        </a>
                                    )
                                })}
                            <Heading
                                hide={(!(Object.keys(filteredPairList).length > 3 && Object.keys(filteredPairList).length >= pairsShown)).toString()}
                            >
                                <Blue
                                    onClick={() => {
                                        setPairsShown(pairsShown + 5)
                                    }}
                                >
                                    See more...
                                </Blue>
                            </Heading>
                        </div>
                    </>
                }
            </Menu>
        </Container>
    )
}

export default Search