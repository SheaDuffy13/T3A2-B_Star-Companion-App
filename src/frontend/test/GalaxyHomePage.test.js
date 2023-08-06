import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GalaxyHomePage } from '../src/pages/GalaxyHomePage';

describe('GalaxyHomePage', () => {
  test('renders the title', () => {
    render(<GalaxyHomePage />);
    expect(screen.getByText('Star Systems')).toBeInTheDocument();
  });

  test('renders the list of star systems', async () => {
    render(<GalaxyHomePage />);
    expect(await screen.findByText('Alpha Centauri')).toBeInTheDocument();
    expect(await screen.findByText('Proxima Centauri')).toBeInTheDocument();
  });

  test('navigates to the star system page when clicking on a star system', async () => {
    render(<GalaxyHomePage />);
    userEvent.click(await screen.findByText('Alpha Centauri'));
    expect(await screen.findByText('Planets in Alpha Centauri')).toBeInTheDocument();
  });
});
