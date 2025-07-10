import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
import { SessionProvider } from 'next-auth/react'
 
describe('Page', () => {
  it('renders a heading', () => {
    render(
      <SessionProvider>
        <Page />
      </SessionProvider>
    )
 
    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})