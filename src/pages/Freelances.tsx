import React from 'react'
import styled from 'styled-components'
import { Card } from '@/components'
import { colors } from '@/utils/style'
import DefaultPicture from '@/assets/profile.png'

const freelanceProfiles = [
  {
    name: 'Jane Doe',
    jobTitle: 'Devops',
    picture: DefaultPicture
  },
  {
    name: 'John Doe',
    jobTitle: 'Developpeur frontend',
    picture: DefaultPicture
  },
  {
    name: 'Jeanne Biche',
    jobTitle: 'Développeuse Fullstack',
    picture: DefaultPicture
  }
]

const FreelancesWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const StyledTitle = styled.div`
  text-align: center;
  margin: 16px;

  p {
    color: ${colors.secondary};
  }
`
const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
`

export const Freelances: React.FC = () => {
  return (
    <FreelancesWrapper>
      <StyledTitle>
        <h1>Trouvez votre prestataire</h1>
        <p>Chez Shiny nous réunissons les meilleurs profils pour vous.</p>
      </StyledTitle>
      <CardsContainer>
        {freelanceProfiles.map((profile, index) => (
          <Card {...profile} key={index} />
        ))}
      </CardsContainer>
    </FreelancesWrapper>
  )
}
