import { Theme, useThemeContext } from '@/context'
import { createGlobalStyle } from 'styled-components'

const StyledGlobalStyle = createGlobalStyle<{ isDarkMode: boolean }>`
  * {
    font-family: 'Trebuchet MS', Helvetica, sans-serif;
  }

  body {
    background-color: ${({ isDarkMode }) => (isDarkMode ? '#2F2E41' : 'white')};
    margin: 0;  
  }
`

export const GlobalStyle = () => {
  const { theme } = useThemeContext()

  return <StyledGlobalStyle isDarkMode={theme === Theme.DARK} />
}
