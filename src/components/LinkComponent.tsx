import { Theme, useThemeContext } from '@/contexts'
import { colors } from '@/utils/style'
import React from 'react'
import { Link, To } from 'react-router-dom'
import styled from 'styled-components'

type StyledLinkProps = { $isFullLink?: boolean }

type LinkComponentProps = React.PropsWithChildren<{ to: To } & StyledLinkProps>

const StyledLink = styled(Link)<StyledLinkProps>`
  padding: 15px;
  color: ${({ theme }) => (theme === Theme.LIGHT ? '#8186a0' : '#fff')};
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
  const { theme } = useThemeContext()

  return (
    <StyledLink to={to} $isFullLink={$isFullLink} theme={theme}>
      {children}
    </StyledLink>
  )
}
