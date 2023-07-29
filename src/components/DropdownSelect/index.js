import React, { useState } from 'react'
import styled from 'styled-components'

import { ChevronDown as Arrow } from 'react-feather'

const StyledIcon = styled.div`
  color: grey;
`

const Wrapper = styled.div`
  z-index: 20;
  position: relative;
  background-color: ${({ theme }) => theme.panelColor};
  border: 1px solid ${({ open, color }) => (open ? color : 'rgba(0, 0, 0, 0.15);')} 
  width: 100px;
  padding: 4px 10px;
  padding-right: 6px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    cursor: pointer;
  }
`

const Dropdown = styled.div`
  position: absolute;
  top: 34px;
  padding-top: 40px;
  width: calc(100% - 40px);
  background-color: ${({ theme }) => theme.bg1};
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 10px 10px;
  border-radius: 8px;
  width: calc(100% - 20px);
  font-weight: 500;
  font-size: 1rem;
  color: black;
  :hover {
    cursor: pointer;
  }
`

const ArrowStyled = styled(Arrow)`
  height: 20px;
  width: 20px;
  margin-left: 6px;
`

const DropdownSelect = ({ options, active, setActive, color }) => {
  const [showDropdown, toggleDropdown] = useState(false)

  return (
    <Wrapper open={showDropdown} color={color}>
      <div className='justify-between' onClick={() => toggleDropdown(!showDropdown)} justify="center">
        <div>{active}</div>
        <StyledIcon>
          <ArrowStyled />
        </StyledIcon>
      </div>
      {showDropdown && (
        <Dropdown>
          <div className='grid auto-rows-auto gap-y-5 justify-items-center'>
            {Object.keys(options).map((key, index) => {
              let option = options[key]
              return (
                option !== active && (
                  <div
                    className='w-full flex p-0 items-center border rounded-2 justify-center'
                    onClick={() => {
                      toggleDropdown(!showDropdown)
                      setActive(option)
                    }}
                    key={index}
                  >
                    <div fontSize={14}>{option}</div>
                  </div>
                )
              )
            })}
          </div>
        </Dropdown>
      )}
    </Wrapper>
  )
}

export default DropdownSelect
