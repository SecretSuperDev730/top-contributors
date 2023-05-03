import { render, screen } from '@testing-library/react';

import UserRepositoriesPage from "@/pages/contributors/[username]";

describe('UserRepositoriesPage', () => {
  it('renders a heading', () => {
    render(<UserRepositoriesPage />);

    const heading = screen.getByText(/Contributors/);

    expect(heading).toBeInTheDocument();
  });
});
