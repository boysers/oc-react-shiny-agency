import React from 'react'
import { LinkComponent } from '@/components'
import illustration from '@/assets/illustration.png'
import styled from 'styled-components'
import { colors } from '@/utils/style'

const HomeWrapper = styled.div`
  margin: 80px 0;
`

const StyledHeader = styled.div`
  background-color: ${colors.backgroundLight};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 50px;
  border-radius: 18px;
  height: 500px;

  h1 {
    line-height: 2em;
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

export const Home: React.FC = () => {
  return (
    <HomeWrapper>
      <StyledHeader>
        <div>
          <h1>
            Repérez vos besoins, on s’occupe du reste, avec les meilleurs
            talents
          </h1>
          <LinkComponent to="survey" $isFullLink>
            Faire le test
          </LinkComponent>
        </div>
        <img src={illustration} alt="illustration" />
      </StyledHeader>
    </HomeWrapper>
  )
}
