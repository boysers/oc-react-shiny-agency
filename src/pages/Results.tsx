import { useSurveyContext } from '@/context'
import React from 'react'

export const Results: React.FC = () => {
  const { answers } = useSurveyContext()

  console.log(answers)

  return (
    <div>
      <h1>Résultats</h1>
    </div>
  )
}
