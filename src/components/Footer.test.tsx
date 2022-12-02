import { Footer } from './Footer'
import { render, screen, fireEvent } from '@/utils/test'

describe('Footer', () => {
  it('should render without crash', async () => {
    render(<Footer />)
    const nightModeButton = screen.getByRole('button')
    expect(nightModeButton.textContent).toBe('Changer de mode : 🌙')
    fireEvent.click(nightModeButton)
    expect(nightModeButton.textContent).toBe('Changer de mode : ☀️')
  })
})
