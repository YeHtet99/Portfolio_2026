import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

test('shows the hero title', async () => { render(<MemoryRouter><App/></MemoryRouter>); expect(await screen.findByText('Building clarity')).toBeInTheDocument() })
test('shows all recruiter-relevant sections on the single home page', async () => { render(<MemoryRouter><App/></MemoryRouter>); expect(await screen.findByText('NXStart')).toBeInTheDocument(); expect(screen.getByText('Technology University Mandalay')).toBeInTheDocument(); expect(screen.getByText('Frontend systems')).toBeInTheDocument(); expect(screen.getByText(/Have a meaningful/)).toBeInTheDocument() })
test('changes the inline project brief without navigating away', async () => { render(<MemoryRouter><App/></MemoryRouter>); fireEvent.click(await screen.findByRole('button', { name: /NXMap/i })); expect(screen.getByText(/Excel Import\/Export features/)).toBeInTheDocument() })
test('redirects old page URLs to the single portfolio page', async () => { render(<MemoryRouter initialEntries={['/projects/nxmap']}><App/></MemoryRouter>); expect(await screen.findByText('Building clarity')).toBeInTheDocument() })
test('opens the command console', async () => { render(<MemoryRouter><App/></MemoryRouter>); fireEvent.click(await screen.findByRole('button', { name: 'Toggle command console' })); expect(screen.getByRole('dialog', { name: 'Portfolio command console' })).toBeInTheDocument() })
