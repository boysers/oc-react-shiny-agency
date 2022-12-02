import { Theme, useThemeContext } from '@/contexts'
import { colors } from '@/utils/style'
import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
`

const NightModeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => (theme === Theme.LIGHT ? colors.secondary : '#fff')};
`

export const Footer: React.FC = () => {
  const { theme, toggleSwitchTheme } = useThemeContext()

  return (
    <FooterContainer>
      <NightModeButton onClick={() => toggleSwitchTheme()} theme={theme}>
        Changer de mode : {theme === 'light' ? '☀️' : '🌙'}
      </NightModeButton>
    </FooterContainer>
  )
}
