import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState
} from 'react'

type Answers = Record<string, boolean>

type DefaultValue = {
  answers: Answers
  saveAnswers: (newAnswers: Answers) => void
}

const SurveyContext = createContext<DefaultValue | null>(null)

export const SurveyProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [answers, setAnswers] = useState<Answers>({})

  const saveAnswers = (newAnswers: Answers) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, ...newAnswers }))
  }

  return (
    <SurveyContext.Provider value={{ answers, saveAnswers }}>
      {children}
    </SurveyContext.Provider>
  )
}

export const useSurveyContext = () => {
  const surveyContext = useContext(SurveyContext)

  if (!surveyContext)
    throw new Error('useSurveyContext was used outside of its Provider')

  return surveyContext
}
