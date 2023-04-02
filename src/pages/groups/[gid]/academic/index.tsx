import { withGroupDetailLayout } from 'layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useGroupDetailQuery } from 'queries';
import React from 'react';

function AcademicPage() {
  const router = useRouter();
  const { gid } = router.query as { gid: string };
  const groupDetailQuery = useGroupDetailQuery(gid);

  return (
    <div>
      <Head>
        <title>Academic | Group | FUniverse</title>
      </Head>
      AcademicPage
    </div>
  );
}

export default withGroupDetailLayout(AcademicPage);
