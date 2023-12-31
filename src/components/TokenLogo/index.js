import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Inline = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
`

const Image = styled.img`
  min-width: ${({ size }) => size};
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

export default function TokenLogo({ path, diligence=true, logoType="logo", header = false, size = '24px', ...rest }) {
    const [error, setError] = useState(false)

    useEffect(() => {
        setError(false)
    }, [path])

    const path1 = `https://saucerswap.finance${path}`
    if (logoType === "warning" && diligence === false) {
      return (
        <Inline>
           <span {...rest} alt={''} style={{ fontSize: size }} role="img" aria-label="face"><img src={`/assets/noimage.png`} width={24}/></span>
        </Inline>
      )
    }
    if (logoType === "warning") return;

    if (error) {
      return (
        <Inline>
          <span {...rest} alt={''} style={{ fontSize: size }} role="img" aria-label="face">🤔</span>
        </Inline>
      )
    }

    return (
        <Inline>
            <Image
                {...rest}
                alt={''}
                src={path?path1:''}
                size={size}
                onError={(event) => {
                    setError(true)
                    event.preventDefault()
                }}
                className='mx-1'
            />
        </Inline>
    )
}
