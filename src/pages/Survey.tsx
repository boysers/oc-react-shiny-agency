import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { colors, Loader } from '@/utils/style'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`

const QuestionContent = styled.span`
  margin: 30px;
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & button {
    color: black;
    text-decoration: underline;
    border: none;
    &:hover {
      cursor: pointer;
    }
  }
  & button:first-of-type {
    margin-right: 20px;
  }
`

export const Survey: React.FC = () => {
  const { questionNumber } = useParams()
  const navigate = useNavigate()

  const questionNumberInt = parseInt(questionNumber || '1', 10)

  const [questions, setQuestions] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<boolean>(false)

  const handleClickLink = (param: number) => navigate(`/survey/${param}`)

  const getQuestions = async () => {
    try {
      const response = await fetch('http://localhost:8000/survey')
      const { surveyData } = await response.json()

      setQuestions(surveyData)
    } catch (err) {
      setError(true)
      if (err instanceof Error) console.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getQuestions()
  }, [])

  useEffect(() => {
    if (Number.isNaN(questionNumberInt)) navigate(`/404`)
  }, [navigate, questionNumberInt])

  useEffect(() => {
    if (!loading && !error && !questions[questionNumberInt]) navigate(`/404`)
  }, [error, loading, navigate, questionNumberInt, questions])

  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionNumberInt}</QuestionTitle>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>Il semblerait qu’il y ait un problème</p>
      ) : (
        <>
          <QuestionContent>{questions[questionNumberInt]}</QuestionContent>
          <LinkWrapper className="links">
            {questionNumberInt > 1 && (
              <button onClick={() => handleClickLink(questionNumberInt - 1)}>
                Précédente
              </button>
            )}
            {questions[questionNumberInt + 1] ? (
              <button onClick={() => handleClickLink(questionNumberInt + 1)}>
                Suivante
              </button>
            ) : (
              <button onClick={() => navigate('/results')}>Résultats</button>
            )}
          </LinkWrapper>
        </>
      )}
    </SurveyContainer>
  )
}
