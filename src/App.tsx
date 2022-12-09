import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { Header, Footer } from './components'
import { ThemeProvider, SurveyProvider } from './contexts'
import { GlobalStyle } from './utils/style'

const MainWrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto;
`

export const App: React.FC = () => {
  return (
    <>
      <ThemeProvider>
        <SurveyProvider>
          <GlobalStyle />
          <Header />
          <MainWrapper>
            <Outlet />
          </MainWrapper>
          <Footer />
        </SurveyProvider>
      </ThemeProvider>
    </>
  )
}
