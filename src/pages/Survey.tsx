import React, { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { colors, Loader } from '@/utils/style'
import { Theme, useSurveyContext, useThemeContext } from '@/contexts'
import { useFetch } from '@/hooks'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    color: ${({ theme }) => (theme === Theme.LIGHT ? '#000' : '#fff')};
  }
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
  color: ${({ theme }) => (theme === Theme.LIGHT ? '#000000' : '#ffffff')};
`

const QuestionContent = styled.span`
  margin: 30px;
  color: ${({ theme }) => (theme === Theme.LIGHT ? '#000000' : '#ffffff')};
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & button {
    color: ${({ theme }) => (theme === Theme.LIGHT ? '#000000' : '#ffffff')};
    background-color: transparent;
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

const ReplyBox = styled.button<{ isSelected: boolean }>`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme === Theme.LIGHT ? colors.backgroundLight : colors.backgroundDark};
  color: ${({ theme }) => (theme === Theme.LIGHT ? '#000000' : '#ffffff')};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const Survey: React.FC = () => {
  const { questionNumber } = useParams()
  const navigate = useNavigate()

  const questionNumberInt = parseInt(questionNumber || '1', 10)

  const { data, isError, isLoading } = useFetch<{
    surveyData: Record<string, string>
  }>('http://localhost:8000/survey')

  const questions = useMemo(() => data?.surveyData || {}, [data?.surveyData])

  const { theme } = useThemeContext()
  const { saveAnswers, answers } = useSurveyContext()

  const handleClickLink = (param: number) => navigate(`/survey/${param}`)

  const saveReply = (response: boolean) => {
    saveAnswers({ [questionNumberInt]: response })
  }

  useEffect(() => {
    if (Number.isNaN(questionNumberInt)) navigate(`/404`)
  }, [navigate, questionNumberInt])

  useEffect(() => {
    if (!isLoading && !isError && !questions[questionNumberInt])
      navigate(`/404`)
  }, [isError, isLoading, navigate, questionNumberInt, questions])

  return (
    <SurveyContainer theme={theme}>
      <QuestionTitle theme={theme}>Question {questionNumberInt}</QuestionTitle>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p>Il semblerait qu’il y ait un problème</p>
      ) : (
        <>
          <QuestionContent theme={theme}>
            {questions[questionNumberInt]}
          </QuestionContent>
          <ReplyWrapper>
            <ReplyBox
              onClick={() => saveReply(true)}
              isSelected={answers[questionNumberInt] === true}
              theme={theme}
            >
              Oui
            </ReplyBox>
            <ReplyBox
              onClick={() => saveReply(false)}
              isSelected={answers[questionNumberInt] === false}
              theme={theme}
            >
              Non
            </ReplyBox>
          </ReplyWrapper>
          <LinkWrapper className="links" theme={theme}>
            {questionNumberInt > 1 && (
              <button onClick={() => handleClickLink(questionNumberInt - 1)}>
                Précédente
              </button>
            )}
            {questions[questionNumberInt + 1] ? (
              <button
                onClick={() => handleClickLink(questionNumberInt + 1)}
                disabled={answers[questionNumberInt] === undefined && true}
              >
                Suivante
              </button>
            ) : (
              <button
                onClick={() => navigate('/results')}
                disabled={answers[questionNumberInt] === undefined && true}
              >
                Résultats
              </button>
            )}
          </LinkWrapper>
        </>
      )}
    </SurveyContainer>
  )
}
