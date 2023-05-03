import { render, screen } from '@testing-library/react';

import ContributorCard from "@/components/contributors/ContributorCard";

import {contributor} from "@/__tests__/mock/data.mock";

describe('ContributorCard', () => {
  it('renders a contributor card', () => {
    render(<ContributorCard contributor={contributor} />);

    const image = screen.getByTestId('image');
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toBe(contributor.avatar_url);

    const username = screen.getByTestId('username');
    expect(username).toBeInTheDocument();
    expect(username.textContent).toBe(contributor.login);

    const contributions = screen.getByTestId('contributions');
    expect(contributions).toBeInTheDocument();
    expect(contributions.textContent).toBe(`${contributor.contributions} commits`);

    const viewRepositoriesButton = screen.getByTestId('view-repositories-button');
    expect(viewRepositoriesButton).toBeInTheDocument();
    expect(viewRepositoriesButton.getAttribute('href')).toBe(`/contributors/${contributor.login}`);
  });
});
