import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logoDark from '@/assets/logo_dark.png'
import logoLight from '@/assets/logo_light.png'
import { LinkComponent } from './LinkComponent'
import { Theme, useThemeContext } from '@/context'

const HeaderWrapper = styled.div`
  height: 100px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;

  a {
    margin: 0 10px;
  }
`

const Logo = styled.img`
  height: 75px;
  &:hover {
    cursor: pointer;
  }
`

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const { theme } = useThemeContext()

  return (
    <HeaderWrapper>
      <Logo
        src={theme === Theme.DARK ? logoLight : logoDark}
        alt="title"
        onClick={() => navigate('/')}
      />
      <div>
        <LinkComponent to="/">Accueil</LinkComponent>
        <LinkComponent to="freelances">Profils</LinkComponent>
        <LinkComponent to="survey" $isFullLink>
          Faire le test
        </LinkComponent>
      </div>
    </HeaderWrapper>
  )
}
