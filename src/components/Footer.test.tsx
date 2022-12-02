import { Footer } from './Footer'
import { screen, fireEvent } from '@testing-library/react'
import { render } from '@/utils/test-utils'

describe('Footer', () => {
  it('should render without crash', async () => {
    render(<Footer />)
    const nightModeButton = screen.getByRole('button')
    expect(nightModeButton.textContent).toBe('Changer de mode : 🌙')
    fireEvent.click(nightModeButton)
    expect(nightModeButton.textContent).toBe('Changer de mode : ☀️')
  })
})
