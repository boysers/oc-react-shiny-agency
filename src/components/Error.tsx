import React from 'react'
import image404 from '@/assets/404.svg'
import styled from 'styled-components'
import { colors } from '@/utils/style'

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  background-color: ${colors.backgroundLight};
  padding: 24px 0;
  border-radius: 18px;

  img {
    width: 600px;
    margin: 50px 0;
  }

  p {
    font-size: 1.6rem;
  }
`

export const Error: React.FC = () => {
  return (
    <ErrorWrapper>
      <h1>Oups...</h1>
      <img src={image404} alt="404" />
      <p>Il semblerait qu’il y ait un problème</p>
    </ErrorWrapper>
  )
}
