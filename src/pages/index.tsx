import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import PostCard from '../components/PostCard';
const DynamicPostCard = dynamic(() => import('../components/PostCard'), {
  ssr: false,
});
export default function HomePage() {
  return (
    <>
      <Head>
        <title>Funiverse</title>
        <meta name="description" content="Funiverse" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynamicPostCard />
      <DynamicPostCard />
      <DynamicPostCard />
      <DynamicPostCard />
    </>
  );
}
