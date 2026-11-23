import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

test('highlights the hero experience value', async () => { render(<MemoryRouter><App/></MemoryRouter>); expect(await screen.findByText('4+', {}, { timeout: 5000 })).toHaveClass('hero-years') })
test('shows all recruiter-relevant sections on the single home page', async () => { render(<MemoryRouter><App/></MemoryRouter>); expect(await screen.findByText('NXStart')).toBeInTheDocument(); expect(screen.getByText('Technology University Mandalay')).toBeInTheDocument(); expect(screen.getByText('Frontend systems')).toBeInTheDocument(); expect(screen.getByText(/Have a meaningful/)).toBeInTheDocument() })
test('opens and closes project details in a modal', async () => { render(<MemoryRouter><App/></MemoryRouter>); fireEvent.click((await screen.findAllByRole('button', { name: 'View Details' }))[1]); expect(screen.getByRole('dialog', { name: /NXMap/i })).toBeInTheDocument(); expect(screen.getByText(/Excel Import\/Export features/)).toBeInTheDocument(); fireEvent.click(screen.getByRole('button', { name: 'Close project details' })); expect(screen.queryByRole('dialog', { name: /NXMap/i })).not.toBeInTheDocument() })
test('redirects old page URLs to the single portfolio page', async () => { render(<MemoryRouter initialEntries={['/projects/nxmap']}><App/></MemoryRouter>); expect(await screen.findByText('Building clarity')).toBeInTheDocument() })
test('opens the command console', async () => { render(<MemoryRouter><App/></MemoryRouter>); fireEvent.click(await screen.findByRole('button', { name: 'Toggle command console' })); expect(screen.getByRole('dialog', { name: 'Portfolio command console' })).toBeInTheDocument() })
