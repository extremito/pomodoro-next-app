import { act, render, RenderOptions, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactElement } from 'react'
import NavigationBar from '../NavigationBar'

describe('Navigation Bar component', () => {

  const renderComponent = () => ({
    user: userEvent.setup(), ...render(<NavigationBar />)
  })
  test('should render bar', () => {
    renderComponent()
    expect(screen.getByTestId('nav-title')).toHaveTextContent('Pomodoro timer')
  })

  test('should click on hamburguer button', async () => {
    const { user } = renderComponent()
    await act(async () => {
      await user.click(screen.getByRole('button'))
    })
    expect(screen.getByTestId('navigation-bar')).toBeInTheDocument()
  })
})