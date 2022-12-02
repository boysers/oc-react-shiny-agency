import { rest } from 'msw'
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@/utils/test'
import { Freelances } from './Freelances'
import { server } from '@/mocks/server'

describe('The freelances component', () => {
  it('should display freelancers names', async () => {
    render(<Freelances />)
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
    await waitFor(() => {
      expect(screen.getByText('Harry Potter')).toBeTruthy()
      expect(screen.getByText('Hermione Granger')).toBeTruthy()
    })
  })

  it('should display error content', async () => {
    server.use(
      rest.get('http://localhost:8000/freelances', (_req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({ errorMessage: "Oups il y a eu une erreur dans l'API" })
        )
      })
    )
    render(<Freelances />)
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
    expect(screen.getByTestId('error')).toMatchInlineSnapshot(`
      <p
        data-testid="error"
      >
        Oups il y a eu une erreur dans l'API
      </p>
    `)
  })
})
