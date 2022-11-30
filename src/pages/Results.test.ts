import { formatJobList, formatQueryParams } from './Results'

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
