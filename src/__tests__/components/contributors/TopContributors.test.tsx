import {render, screen} from '@testing-library/react';

import {wait} from "@/lib/helper";

import TopContributors from "@/components/contributors/TopContributors";

import {contributor} from "@/__tests__/mock/data.mock";
import GithubService from "@/services/github.service";

describe('TopContributors', () => {
  it('renders a contributor cards with infinitive scroll bar', async () => {
    jest.spyOn(GithubService, 'listRepositoryContributors').mockImplementation(async (owner, repo, query) => {
      if (query.page === 1) {
        return new Array(24).fill(contributor);
      }
      if (query.page === 2) {
        return new Array(10).fill(contributor);
      }
      return [];
    });

    render(<TopContributors />);

    const loading = screen.getByText(/Loading/);
    expect(loading).toBeInTheDocument();

    await wait();

    window.scrollTo({ top: document.body.scrollHeight });

    await wait();

    window.scrollTo({ top: document.body.scrollHeight });

    await wait(1000);

    const cards = screen.getAllByTestId('contributor-card');
    expect(cards.length).toBe(34);
  });
});
