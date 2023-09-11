import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState
} from 'react'

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light'
}

type ThemeContextDefaultValue = {
  theme: Theme
  toggleSwitchTheme: () => void
}

export const ThemeContext = createContext<ThemeContextDefaultValue | null>(null)

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState(Theme.DARK)

  const toggleSwitchTheme = () => {
    setTheme((prev) => (prev !== Theme.DARK ? Theme.DARK : Theme.LIGHT))
  }

  const value: ThemeContextDefaultValue = useMemo(
    () => ({ theme, toggleSwitchTheme }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext)

  if (!themeContext)
    throw new Error('useThemeContext was used outside of its Provider')

  return themeContext
}
