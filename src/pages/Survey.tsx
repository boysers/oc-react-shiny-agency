import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const Survey: React.FC = () => {
  const { questionNumber } = useParams()

  const navigate = useNavigate()

  const questionNumberInt = parseInt(questionNumber || '1', 10)

  const handleClickLink = (param: number) => navigate(`/survey/${param}`)

  useEffect(() => {
    if (Number.isNaN(questionNumberInt)) navigate(`/404`)
    if (questionNumberInt < 1 || questionNumberInt > 10) navigate(`/404`)
  }, [navigate, questionNumber, questionNumberInt])

  return (
    <div>
      <h2>Questionnaire</h2>
      <h3>Question {questionNumberInt}</h3>
      <div className="links">
        {questionNumberInt > 1 && (
          <button onClick={() => handleClickLink(questionNumberInt - 1)}>
            Précédente
          </button>
        )}
        {questionNumberInt < 10 ? (
          <button onClick={() => handleClickLink(questionNumberInt + 1)}>
            Suivante
          </button>
        ) : (
          <button onClick={() => navigate('/results')}>Résultats</button>
        )}
      </div>
    </div>
  )
}
