import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Header from '../Header';

describe('header', () => {
  test('sidenav closed', () => {
    const handleDarkModeToggleMock = jest.fn();
    const handleSideNavOpenMock = jest.fn();

    render(
      <Header
        handleDarkModeToggle={handleDarkModeToggleMock}
        handleSideNavOpen={handleSideNavOpenMock}
        sideNavOpen={false}
      />
    );
    expect(screen.getByTestId('header-menu-button')).toBeVisible();
    expect(screen.getByTestId('header-theme-toggle'));
  });

  test('sidenav open', () => {
    const handleDarkModeToggleMock = jest.fn();
    const handleSideNavOpenMock = jest.fn();

    render(
      <Header
        handleDarkModeToggle={handleDarkModeToggleMock}
        handleSideNavOpen={handleSideNavOpenMock}
        sideNavOpen={true}
      />
    );
    expect(screen.getByTestId('header-menu-button')).not.toBeVisible();
    expect(screen.getByTestId('header-theme-toggle'));
  });

  test('menu button clicked', () => {
    const handleDarkModeToggleMock = jest.fn();
    const handleSideNavOpenMock = jest.fn();
    render(
      <Header
        handleDarkModeToggle={handleDarkModeToggleMock}
        handleSideNavOpen={handleSideNavOpenMock}
        sideNavOpen={false}
      />
    );
    const menuButton = screen.getByTestId('header-menu-button');
    fireEvent.click(menuButton);
    expect(handleSideNavOpenMock).toHaveBeenCalled();
  });

  test('theme toggle clicked', () => {
    const handleDarkModeToggleMock = jest.fn();
    const handleSideNavOpenMock = jest.fn();
    render(
      <Header
        handleDarkModeToggle={handleDarkModeToggleMock}
        handleSideNavOpen={handleSideNavOpenMock}
        sideNavOpen={false}
      />
    );
    const themeToggle = screen.getByTestId('header-theme-toggle');
    act(() => {
      screen.getByRole('checkbox').click();
    });
    fireEvent.change(themeToggle, { target: { checked: true } });
    expect(handleDarkModeToggleMock).toHaveBeenCalled();
  });
});
