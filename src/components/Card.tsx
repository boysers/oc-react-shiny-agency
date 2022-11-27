import React from 'react'
import DefaultPicture from '@/assets/profile.png'
import styled from 'styled-components'
import { colors } from '@/utils/style'

type CardType = { jobTitle: string; name: string; picture: string }

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  background-color: ${colors.backgroundLight};
  border-radius: 30px;
  width: 300px;
  height: 300px;
  transition: 200ms;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px #e2e3e9;
  }

  img {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    margin: auto;
  }

  span:first-child {
    color: #5843e4;
    font-size: 22px;
    font-weight: bold;
  }

  span:last-child {
    text-align: center;
    font-size: 1.4rem;
    padding-bottom: 16px;
  }
`

export const Card: React.FC<CardType> = ({
  jobTitle: label,
  name: title,
  picture = DefaultPicture
}) => {
  return (
    <CardWrapper>
      <span>{label}</span>
      <img src={picture} alt="freelance" />
      <span>{title}</span>
    </CardWrapper>
  )
}
