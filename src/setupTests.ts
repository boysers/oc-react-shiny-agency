import matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'
import fetch from 'cross-fetch'
import { server } from './mocks/server'

expect.extend(matchers)

global.fetch = fetch

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
