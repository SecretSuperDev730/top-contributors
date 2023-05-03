import * as React from 'react';

import Seo from '@/components/common/Seo';
import TopContributors from "@/components/contributors/TopContributors";
import Layout from '@/components/layout/Layout';

export default function HomePage() {
  return (
    <Layout>
      <Seo />

      <main>
        <section className="min-h-screen bg-gray-f7 p-8">
          <h6>Top Contributors</h6>

          <hr className="border-gray-c4 mt-3 mb-7" />

          <TopContributors />
        </section>
      </main>
    </Layout>
  );
}
