import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
test('shows the hero title', async () => { render(<MemoryRouter><App/></MemoryRouter>); expect(await screen.findByText('Engineering')).toBeInTheDocument() })
test('shows a project detail route', async () => { render(<MemoryRouter initialEntries={['/projects/nxmap']}><App/></MemoryRouter>); expect(await screen.findByRole('heading', { name: 'NXMap' })).toBeInTheDocument() })
