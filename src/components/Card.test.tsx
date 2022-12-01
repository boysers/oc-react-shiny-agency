import { ThemeProvider } from '@/contexts'
import { fireEvent, render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('The card component', () => {
  it('should render image and name', () => {
    render(
      <ThemeProvider>
        <Card
          jobTitle="Développeur frontend"
          name="John Doe"
          picture="http://localhost:8000/images/5.jpeg"
        />
      </ThemeProvider>
    )
    expect(screen.getByRole('img')).toContain({
      src: 'http://localhost:8000/images/5.jpeg'
    })
    const cardTitle = screen.getByTestId('name')
    expect(cardTitle.textContent).toBe('John Doe')
    fireEvent.click(screen.getByTestId('card'))
    expect(cardTitle.textContent).toBe('⭐️ John Doe ⭐️')
  })

  it('should add ⭐️ on the name', () => {
    render(
      <ThemeProvider>
        <Card jobTitle="Développeur frontend" name="John Doe" />
      </ThemeProvider>
    )
    fireEvent.click(screen.getByTestId('card'))
    expect(screen.getByTestId('name').textContent).toBe('⭐️ John Doe ⭐️')
  })
})
