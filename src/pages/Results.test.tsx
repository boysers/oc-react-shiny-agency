import { server } from '@/mocks/server'
import { render, screen, waitForElementToBeRemoved } from '@/utils/test'
import { rest } from 'msw'
import { formatJobList, formatQueryParams, Results } from './Results'

const resultsMockedData = [
  {
    title: 'seo',
    description: "Le SEO est en charge du référencement web d'une page"
  }
]

describe('The formatJobList function', () => {
  it('should add a comma to a word', () => {
    const expectedState = 'item2,'
    expect(formatJobList('item2', 3, 1)).toEqual(expectedState)
  })
  it('should not add a comma to the last element of the list', () => {
    const expectedState = 'item3'
    expect(formatJobList('item3', 3, 2)).toEqual(expectedState)
  })
})

describe('The formatQueryParams function', () => {
  it('should format query in param', () => {
    const expectedState = 'a1=false'
    expect(formatQueryParams({ 1: false })).toEqual(expectedState)
  })
  it('should format query in param with &', () => {
    const expectedState = 'a1=false&a2=true'
    expect(formatQueryParams({ 1: false, 2: true })).toEqual(expectedState)
  })
})

describe('The results component', () => {
  it('should query param api', async () => {
    render(<Results />)

    server.use(
      rest.get(`http://localhost:8000/results`, (_req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ resultsData: resultsMockedData })
        )
      })
    )

    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

    expect(screen.getAllByTestId('job-title')[0].textContent).toBe('seo')
    expect(screen.getByText(resultsMockedData[0].description)).toBeTruthy()

    expect(
      screen.getByTestId('button-profils').textContent
    ).toMatchInlineSnapshot('"Découvrez nos profils"')
  })
})
