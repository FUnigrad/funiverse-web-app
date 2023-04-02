import { withGroupDetailLayout } from 'layout';
import React from 'react';
import pdfImage from 'assets/images/file-pdf_32.png';
import Image from 'next/image';
import Head from 'next/head';
function MediaPage() {
  return (
    <div>
      <Head>
        <title>Media | Group | FUniverse</title>
      </Head>
      MediaPage
      <Image src={pdfImage} alt="pdf" style={{ width: 32, height: 32 }} />
    </div>
  );
}

export default withGroupDetailLayout(MediaPage);
