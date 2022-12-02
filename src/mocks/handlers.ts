import { rest } from 'msw'

const freelancersMockedData = [
  {
    name: 'Harry Potter',
    job: 'Magicien frontend',
    picture: ''
  },
  {
    name: 'Hermione Granger',
    job: 'Magicienne fullstack',
    picture: ''
  }
]

export const handlers = [
  rest.get('http://localhost:8000/freelances', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ freelancersList: freelancersMockedData })
    )
  })
]
