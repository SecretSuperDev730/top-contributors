import { render, screen } from '@testing-library/react';

import HomePage from "@/pages";

describe('HomePage', () => {
  it('renders a heading', () => {
    render(<HomePage />);

    const heading = screen.getByText(/Top Contributors/);

    expect(heading).toBeInTheDocument();
  });
});
