import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
test('shows the hero title', async () => { render(<MemoryRouter><App/></MemoryRouter>); expect(await screen.findByText('Building clarity')).toBeInTheDocument() })
test('shows a project detail route', async () => { render(<MemoryRouter initialEntries={['/projects/nxmap']}><App/></MemoryRouter>); expect(await screen.findByRole('heading', { name: 'NXMap' })).toBeInTheDocument() })
test('opens the command console', async () => { render(<MemoryRouter><App/></MemoryRouter>); fireEvent.click(await screen.findByRole('button', { name: 'Open command console' })); expect(screen.getByRole('dialog', { name: 'Portfolio command console' })).toBeInTheDocument() })
test('shows the about focus in the command console', async () => { render(<MemoryRouter><App/></MemoryRouter>); fireEvent.click(await screen.findByRole('button', { name: 'Open command console' })); fireEvent.change(screen.getByPlaceholderText('type a command'), { target: { value: 'about' } }); fireEvent.submit(screen.getByRole('textbox')); expect(screen.getByText(/Focus: Building data-rich product systems/)).toBeInTheDocument() })
