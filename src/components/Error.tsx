import React from 'react'
import image404 from '@/assets/404.svg'
import styled from 'styled-components'
import { colors } from '@/utils/style'
import { useThemeContext } from '@/context'

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  padding: 24px 0;
  border-radius: 18px;

  h1,
  p {
    font-weight: 300;
  }

  h1 {
    color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  }

  img {
    width: 600px;
    margin: 50px 0;
  }

  p {
    font-size: 1.5rem;
    color: ${({ theme }) => (theme === 'light' ? colors.secondary : '#ffffff')};
  }
`

export const Error: React.FC = () => {
  const { theme } = useThemeContext()

  return (
    <ErrorWrapper theme={theme}>
      <h1>Oups...</h1>
      <img src={image404} alt="404" />
      <p>Il semblerait qu’il y ait un problème</p>
    </ErrorWrapper>
  )
}
