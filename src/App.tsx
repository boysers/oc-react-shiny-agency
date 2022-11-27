import React from 'react'
import { Outlet } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { Header } from '@/components'

const GlobalStyle = createGlobalStyle`
    div {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }
`

const MainWrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto;
`

export const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <MainWrapper>
        <Outlet />
      </MainWrapper>
    </>
  )
}
