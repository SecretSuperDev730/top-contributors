import {CanceledError} from "axios";
import moment from "moment";
import {FC, useCallback, useEffect, useRef, useState} from "react";
import {FaCheck, FaTimes} from "react-icons/fa";

import GithubService from "@/services/github.service";

import Repository from "@/types/interfaces/repository";

const PER_PAGE = 25;

export interface UserRepositoriesProps {
  username: string;
}

const UserRepositories: FC<UserRepositoriesProps> = ({
  username,
}) => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [needMore, setNeedMore] = useState(false);
  const [page, setPage] = useState(1);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const loadingSubscription = useRef<AbortController>();

  const shouldLoadMore = useCallback(() => {
    const scrollY = window.scrollY;
    const scrollHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    return (scrollY + windowHeight) >= scrollHeight;
  }, []);

  const loadMoreRepositories = useCallback((page: number) => {
    if (loadingSubscription.current) {
      loadingSubscription.current.abort();
    }

    setLoading(true);
    loadingSubscription.current = new AbortController();
    GithubService.listUserRepositories(
      username,
      { page, per_page: PER_PAGE, sort: 'updated', direction: 'desc' },
      { signal: loadingSubscription.current.signal },
    ).then((data) => {
      setRepositories((prev) => [...prev, ...data]);
      setPage(page + 1);
      setHasMore(data.length >= PER_PAGE);
      setLoading(false);
    }).catch((e) => {
      if (!(e instanceof CanceledError)) {
        setHasMore(false);
        setLoading(false);
      }
    });
  }, [username]);

  useEffect(() => {
    const onScroll = () => {
      setNeedMore(shouldLoadMore());
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [shouldLoadMore]);

  useEffect(() => {
    if (!loading && hasMore && (needMore || shouldLoadMore())) {
      loadMoreRepositories(page);
    }
  });

  const columns = [
    { title: 'Name of Repo', field: 'name' },
    {
      title: 'Forked',
      field: 'fork',
      render(row: Repository) {
        if (row.fork) {
          return (
            <FaCheck className="text-lime-600" />
          );
        }
        return <FaTimes className="text-red-500" />;
      }
    },
    { title: 'Stars', field: 'stargazers_count' },
    {
      title: 'Last Updated',
      field: 'updated_at',
      render(row: Repository) {
        return moment(row.updated_at).format('LLL');
      }
    },
  ];

  return (
    <table className="w-full border-separate border-spacing-y-1">
      <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.field} className="text-left text-gray px-4">{column.title}</th>
        ))}
      </tr>
      </thead>
      <tbody>
      {repositories.map((row, i) => (
        <tr key={i} className="bg-white" data-testid="repository-row">
          {columns.map((column) => (
            <td key={column.field} className="px-4 py-2">
              {column.render ? column.render(row) : (row[column.field as keyof Repository] as string)}
            </td>
          ))}
        </tr>
      ))}

      {loading && (
        <tr>
          <td className="text-gray text-center p-4" colSpan={columns.length}>
            Loading...
          </td>
        </tr>
      )}

      {!loading && !hasMore && !repositories.length && (
        <tr className="bg-whtie">
          <td className="text-gray text-center p-4" colSpan={columns.length}>
            No results found
          </td>
        </tr>
      )}
      </tbody>
    </table>
  );
};

export default UserRepositories;
