import React from 'react'
import { LinkComponent } from '@/components'
import homeIllustration from '@/assets/home-illustration.svg'
import styled from 'styled-components'
import { colors } from '@/utils/style'
import { Theme, useThemeContext } from '@/contexts'

const HomeWrapper = styled.div`
  margin: 30px;
`

const StyledHeader = styled.div`
  background-color: ${({ theme }) =>
    theme === Theme.LIGHT ? colors.backgroundLight : colors.backgroundDark};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 50px;
  border-radius: 18px;
  height: 600px;

  h1 {
    line-height: 2em;
    color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  }

  img {
    height: 100%;
  }

  div:first-child {
    min-width: 350px;
    width: 350px;

    a {
      display: block;
      text-align: center;
    }
  }
`

export function sum(a: number, b: number): number {
  return a + b
}

export const Home: React.FC = () => {
  const { theme } = useThemeContext()

  return (
    <HomeWrapper>
      <StyledHeader theme={theme}>
        <div>
          <h1>
            Repérez vos besoins, on s’occupe du reste, avec les meilleurs
            talents
          </h1>
          <LinkComponent to="survey" $isFullLink>
            Faire le test
          </LinkComponent>
        </div>
        <img src={homeIllustration} alt="illustration" />
      </StyledHeader>
    </HomeWrapper>
  )
}
