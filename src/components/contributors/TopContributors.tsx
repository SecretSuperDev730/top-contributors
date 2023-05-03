import {CanceledError} from "axios";
import {useCallback, useEffect, useRef, useState} from "react";

import ContributorCard from "@/components/contributors/ContributorCard";

import GithubService from "@/services/github.service";

import Contributor from "@/types/interfaces/contributor";

const PER_PAGE = 24;

const TopContributors = () => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [needMore, setNeedMore] = useState(false);
  const [page, setPage] = useState(1);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const loadingSubscription = useRef<AbortController>();

  const shouldLoadMore = useCallback(() => {
    const scrollY = window.scrollY;
    const scrollHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    return (scrollY + windowHeight) >= scrollHeight;
  }, []);

  const loadMoreContributors = useCallback((page: number) => {
    if (loadingSubscription.current) {
      loadingSubscription.current.abort();
    }

    setLoading(true);
    loadingSubscription.current = new AbortController();
    GithubService.listRepositoryContributors(
      'angular',
      'angular',
      { page, per_page: PER_PAGE },
      { signal: loadingSubscription.current.signal },
    ).then((data) => {
      setContributors((prev) => [...prev, ...data]);
      setPage(page + 1);
      setHasMore(data.length >= PER_PAGE);
      setLoading(false);
    }).catch((e) => {
      if (!(e instanceof CanceledError)) {
        setHasMore(false);
        setLoading(false);
      }
    });
  }, []);

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
      loadMoreContributors(page);
    }
  });

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-7">
        {contributors.map((item, i) => (
          <ContributorCard key={i} contributor={item} />
        ))}
      </div>

      {loading && (
        <div className="text-2xl text-gray text-center mt-4">Loading...</div>
      )}

      {!loading && !hasMore && !contributors.length && (
        <div className="text-2xl text-gray text-center">No results found</div>
      )}
    </div>
  );
};

export default TopContributors;
