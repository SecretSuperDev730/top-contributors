import {render, screen} from '@testing-library/react';

import {wait} from "@/lib/helper";

import UserRepositories from "@/components/contributors/UserRepositories";

import {contributor, repository} from "@/__tests__/mock/data.mock";
import GithubService from "@/services/github.service";


describe('UserRepositories', () => {
  it('renders a repositories table with infinitive scroll bar', async () => {
    jest.spyOn(GithubService, 'listUserRepositories').mockImplementation(async (username, query) => {
      if (query.page === 1) {
        return new Array(25).fill(repository);
      }
      if (query.page === 2) {
        return new Array(13).fill(repository);
      }
      return [];
    });

    render(<UserRepositories username={contributor.login} />);

    const loading = screen.getByText(/Loading/);
    expect(loading).toBeInTheDocument();

    await wait();

    window.scrollTo({ top: document.body.scrollHeight });

    await wait();

    window.scrollTo({ top: document.body.scrollHeight });

    await wait(1000);

    const rows = screen.getAllByTestId('repository-row');
    expect(rows.length).toBe(38);
  });
});
