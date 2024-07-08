import { ReactElement } from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HamburguerButton from "../HamburguerButton"

describe('Hamburguer button component', () => {

  const renderComponent = (component: ReactElement) => ({
    user: userEvent.setup(),
    ...render(component)
  })

  test('should render', () => {
    renderComponent(<HamburguerButton />)
    expect(screen.getByTestId('head-hamburguer-button')).toBeInTheDocument()
  })

  test('should click on the button', async () => {
    const { user, container } = renderComponent(<HamburguerButton />)
    await act(async () => {
      await user.click(screen.getByTestId('head-hamburguer-button'))
    })
    const breadLine = container.querySelector('[data-testid="head-hamburguer-button"]>div')
    expect(breadLine).toHaveClass('rotate-45')
  })
})