import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Card } from '@/components'
import { colors, Loader } from '@/utils/style'

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

  p {
    color: ${colors.secondary};
  }
`

const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, 1fr);
`

export const Freelances: React.FC = () => {
  const [freelances, setFreelances] = useState<IFreelance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getFreelances = async () => {
    try {
      const res = await fetch('http://localhost:8000/freelances')
      const { freelancersList } = await res.json()

      setFreelances(freelancersList)
    } catch (err) {
      setError(true)
      if (err instanceof Error) {
        console.error(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFreelances()
  }, [])

  return (
    <FreelancesWrapper>
      <StyledTitle>
        <h1>Trouvez votre prestataire</h1>
        <p>Chez Shiny nous réunissons les meilleurs profils pour vous.</p>
      </StyledTitle>
      {loading ? (
        <Loader />
      ) : error ? (
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
