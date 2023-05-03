import Link from "next/link";
import { useRouter } from 'next/router';
import * as React from 'react';

import Seo from '@/components/common/Seo';
import UserRepositories from "@/components/contributors/UserRepositories";
import Layout from '@/components/layout/Layout';

export default function UserRepositoriesPage() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <Layout>
      <Seo />

      <main>
        <section className="min-h-screen bg-gray-f7 p-8">
          <div className="flex items-center text-gray text-lg">
            <Link className="hover:text-black" href="/">Contributors</Link>
            <span className="px-1">/</span>
            <h6 className="text-dark">{username}</h6>
          </div>

          <hr className="border-gray-c4 mt-3 mb-7" />

          {username && (
            <UserRepositories username={username as string} />
          )}
        </section>
      </main>
    </Layout>
  );
}
