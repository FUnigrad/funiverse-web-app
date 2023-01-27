import { Box } from '@mui/material';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Funiverse</title>
        <meta name="description" content="Funiverse" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>Group Post</Box>
      <Box sx={{ height: 500 }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur repudiandae ea neque
        omnis sequi eligendi veniam minima tempore magni, sapiente molestias officiis blanditiis sit
        laboriosam vel consectetur quos itaque ex.
      </Box>
      <Box sx={{ height: 500 }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur repudiandae ea neque
        omnis sequi eligendi veniam minima tempore magni, sapiente molestias officiis blanditiis sit
        laboriosam vel consectetur quos itaque ex.
      </Box>
    </>
  );
}
