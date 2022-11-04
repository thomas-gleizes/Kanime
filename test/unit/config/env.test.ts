import { expect } from '@jest/globals'

describe('Api animes', () => {
  it('should create private env', () => {
    expect(process.env.NODE_ENV).toBe('test')

    expect(process.env.DATABASE_URL).toBeDefined()
    expect(process.env.SECRET_TOKEN).toBeDefined()
    expect(process.env.SECRET_SEED).toBeDefined()
  })

  it('should create public env', () => {
    expect(process.env.NEXT_PUBLIC_ENV).toBe('test')

    expect(process.env.NEXT_PUBLIC_APP_NAME).toBeDefined()
  })
})
