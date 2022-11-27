import { colors } from '@/utils/style'
import React from 'react'
import { Link, To } from 'react-router-dom'
import styled from 'styled-components'

type StyledLinkProps = { $isFullLink?: boolean }

type LinkComponentProps = React.PropsWithChildren<{ to: To } & StyledLinkProps>

const StyledLink = styled(Link)<StyledLinkProps>`
  padding: 15px;
  color: #8186a0;
  text-decoration: none;
  font-size: 18px;
  ${(props) =>
    props.$isFullLink &&
    `color: white; border-radius: 30px; background-color: ${colors.primary};`}
`

export const LinkComponent: React.FC<LinkComponentProps> = ({
  to,
  $isFullLink,
  children
}) => {
  return (
    <StyledLink to={to} $isFullLink={$isFullLink}>
      {children}
    </StyledLink>
  )
}
