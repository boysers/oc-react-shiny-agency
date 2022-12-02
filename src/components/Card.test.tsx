import { fireEvent, screen } from '@testing-library/react'
import { Card } from './Card'
import { render } from '@/utils/test-utils'

describe('The card component', () => {
  it('should render image and name', () => {
    render(
      <Card
        jobTitle="Développeur frontend"
        name="John Doe"
        picture="http://localhost:8000/images/5.jpeg"
      />
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
    render(<Card jobTitle="Développeur frontend" name="John Doe" />)
    fireEvent.click(screen.getByTestId('card'))
    expect(screen.getByTestId('name').textContent).toBe('⭐️ John Doe ⭐️')
  })
})
