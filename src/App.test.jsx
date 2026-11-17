import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
test('shows the hero title', async () => { render(<MemoryRouter><App/></MemoryRouter>); expect(await screen.findByText('Building clarity')).toBeInTheDocument() })
test('shows a project detail route', async () => { render(<MemoryRouter initialEntries={['/projects/nxmap']}><App/></MemoryRouter>); expect(await screen.findByRole('heading', { name: 'NXMap' })).toBeInTheDocument() })
test('opens the command console', async () => { render(<MemoryRouter><App/></MemoryRouter>); fireEvent.click(await screen.findByRole('button', { name: 'Open command console' })); expect(screen.getByRole('dialog', { name: 'Portfolio command console' })).toBeInTheDocument() })
