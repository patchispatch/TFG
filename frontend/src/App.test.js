// import { add, total } from './App'

const add = jest.fn()

test('add', () => {
    expect(add(1, 2)).toBe(3)
})