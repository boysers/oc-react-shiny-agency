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
`

const StyledTitle = styled.div`
  text-align: center;
  color: ${({ theme }) => (theme === Theme.LIGHT ? '#000000' : '#ffffff')};
  margin: 20px 0;

  h1,
  p {
    margin: 40px 0;
  }

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
  const {
    data,
    isError: error,
    isLoading
  } = useFetch<{
    freelancersList: IFreelance[]
  }>('http://localhost:8000/freelances')

  const freelances = data?.freelancersList || []

  const { theme } = useThemeContext()

  // if (error) return <p>Il semblerait qu’il y ait un problème</p>

  if (error) return <p data-testid="error">{error}</p>

  return (
    <FreelancesWrapper>
      <StyledTitle theme={theme}>
        <p>Chez Shiny nous réunissons les meilleurs profils pour vous.</p>
        <h1>Trouvez votre prestataire</h1>
      </StyledTitle>
      {isLoading ? (
        <Loader data-testid="loader" />
      ) : (
        <CardsContainer>
          {freelances.map((profile) => (
            <Card
              {...profile}
              jobTitle={profile.job}
              key={`${profile.id}-${profile.name}`}
            />
          ))}
        </CardsContainer>
      )}
    </FreelancesWrapper>
  )
}
