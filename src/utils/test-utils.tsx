import React from 'react'
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom'
import { render } from '@testing-library/react'
import { SurveyProvider, ThemeProvider } from '@/contexts'

const customRender = (ui: React.ReactElement, options?: MemoryRouterProps) => {
  function Wrapper({ children }: { children: React.ReactElement }) {
    return (
      <MemoryRouter {...options}>
        <ThemeProvider>
          <SurveyProvider>{children}</SurveyProvider>
        </ThemeProvider>
      </MemoryRouter>
    )
  }
  render(ui, { wrapper: Wrapper })
}

export { customRender as render }
