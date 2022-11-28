import React from 'react'
import styled from 'styled-components'
import { Card } from '@/components'
import { colors, Loader } from '@/utils/style'
import { Theme, useThemeContext } from '@/contexts'
import { useFetch } from '@/hooks'

interface IFreelance {
  id: string
  name: string
  job: string
  picture: string
}

const FreelancesWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 30px 0;
`

const StyledTitle = styled.div`
  text-align: center;
  margin: 20px 0;
  color: ${({ theme }) => (theme === Theme.LIGHT ? '#000000' : '#ffffff')};

  p {
    color: ${({ theme }) =>
      theme === Theme.LIGHT ? colors.secondary : '#ffffff'};
  }
`

const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, 1fr);
`

export const Freelances: React.FC = () => {
  const { data, isError, isLoading } = useFetch<{
    freelancersList: IFreelance[]
  }>('http://localhost:8000/freelances')

  const freelances = data?.freelancersList || []

  const { theme } = useThemeContext()

  return (
    <FreelancesWrapper>
      <StyledTitle theme={theme}>
        <h1>Trouvez votre prestataire</h1>
        <p>Chez Shiny nous réunissons les meilleurs profils pour vous.</p>
      </StyledTitle>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p>Il semblerait qu’il y ait un problème</p>
      ) : (
        <CardsContainer>
          {freelances.map((profile) => (
            <Card {...profile} jobTitle={profile.job} key={profile.id} />
          ))}
        </CardsContainer>
      )}
    </FreelancesWrapper>
  )
}
