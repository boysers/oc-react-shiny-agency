import React from 'react'
import styled from 'styled-components'
import empty from '@/assets/empty.svg'
import { Theme, useSurveyContext, useThemeContext } from '@/contexts'
import { useFetch } from '@/hooks'
import { colors, Loader, StyledLink } from '@/utils/style'

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 90px;
  padding: 30px;
  border-radius: 18px;
  background-color: ${({ theme }) =>
    theme === Theme.LIGHT ? colors.backgroundLight : colors.backgroundDark};
`

const ResultsTitle = styled.h2`
  color: ${({ theme }) => (theme === Theme.LIGHT ? '#000000' : '#ffffff')};
  font-weight: bold;
  font-size: 28px;
  max-width: 60%;
  text-align: center;
  & > span {
    padding-left: 10px;
  }
`

const DescriptionWrapper = styled.div`
  padding: 60px;

  p {
    color: ${({ theme }) => (theme === Theme.LIGHT ? '#000000' : '#ffffff')};
  }
`

const JobTitle = styled.span`
  color: ${({ theme }) =>
    theme === Theme.LIGHT ? colors.primary : colors.backgroundLight};
  text-transform: capitalize;
`

const JobDescription = styled.div`
  font-size: 18px;
  & > p {
    color: ${({ theme }) =>
      theme === Theme.LIGHT ? colors.secondary : '#ffffff'};
    margin-block-start: 5px;
  }
  & > span {
    font-size: 20px;
  }
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
`

const StyledError = styled.p`
  text-align: center;
  margin: 30px 0;
  color: ${({ theme }) => (theme === Theme.DARK ? '#fff' : '#000')};
  font-size: 1.2em;
`

export const formatQueryParams = (answers: Record<string, boolean>): string => {
  const answerNumbers = Object.keys(answers)

  return answerNumbers.reduce((previousParams, answerNumber, index) => {
    const isFirstAnswer = index === 0
    const separator = isFirstAnswer ? '' : '&'
    return `${previousParams}${separator}a${answerNumber}=${answers[answerNumber]}`
  }, '')
}

export function formatJobList(
  title: string,
  listLength: number,
  index: number
): string {
  if (index === listLength - 1) {
    return title
  }
  return `${title},`
}

export const Results: React.FC = () => {
  const { answers } = useSurveyContext()
  const { theme } = useThemeContext()

  const queryParams = formatQueryParams(answers)

  const { data, isError, isLoading } = useFetch<{
    resultsData: { title: string; description: string }[]
  }>(`http://localhost:8000/results/?${queryParams}`)

  const resultsData = data?.resultsData || []

  if (isError) {
    return <StyledError theme={theme}>Il y a un problème</StyledError>
  }

  return isLoading ? (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  ) : (
    <ResultsContainer theme={theme}>
      <ResultsTitle theme={theme}>
        {resultsData.length < 1 ? (
          <>Dommage...</>
        ) : (
          <>
            Les compétences dont vous avez besoin :
            {resultsData.map((result, index) => (
              <JobTitle
                key={`result-title-${index}-${result.title}`}
                theme={theme}
              >
                {formatJobList(result.title, resultsData.length, index)}
              </JobTitle>
            ))}
          </>
        )}
      </ResultsTitle>
      {resultsData.length < 1 ? null : (
        <StyledLink $isFullLink to="/freelances">
          Découvrez nos profils
        </StyledLink>
      )}
      <DescriptionWrapper theme={theme}>
        {resultsData.length < 1 ? (
          <>
            <img src={empty} alt="empty" />
            <p>Il semblerait que vous n’ayez besoin d’aucune compétence</p>
          </>
        ) : (
          resultsData.map((result, index) => (
            <JobDescription
              theme={theme}
              key={`result-detail-${index}-${result.title}`}
            >
              <JobTitle theme={theme}>{result.title}</JobTitle>
              <p>{result.description}</p>
            </JobDescription>
          ))
        )}
      </DescriptionWrapper>
    </ResultsContainer>
  )
}
