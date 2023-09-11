import { useThemeContext } from '@/contexts'
import { colors } from '@/utils/style'
import React from 'react'
import styled from 'styled-components'
import { EmailInput } from './EmailInput'

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
`

const NightModeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${colors.secondary};
  padding-top: 30px;
`

export const Footer: React.FC = () => {
  const { theme, toggleSwitchTheme } = useThemeContext()

  return (
    <FooterContainer>
      <EmailInput theme={theme} />
      <NightModeButton onClick={() => toggleSwitchTheme()} theme={theme}>
        Changer de mode : {theme === 'light' ? '☀️' : '🌙'}
      </NightModeButton>
    </FooterContainer>
  )
}
