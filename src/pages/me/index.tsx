import { useUserMeQuery } from 'queries';
import React, { startTransition, useState } from 'react';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import UserInfo from 'components/UserInfo';
import { User } from '@types';
import Head from 'next/head';
import Timetable from 'components/Timetable';
import dynamic from 'next/dynamic';
enum UserTabs {
  Profile,
  Timetable,
}
const DynamicTimetable = dynamic(() => import('components/Timetable'), { ssr: false });
const userTabs = Object.keys(UserTabs)
  //@ts-ignore
  .filter((uT) => isNaN(uT))
  .map((label) => ({ label }));
function UserMePage() {
  const userMeQuery = useUserMeQuery();
  const [tabIndex, setTabIndex] = useState(UserTabs.Profile);
  function handleTabChange(event: unknown, value: number) {
    startTransition(() => {
      setTabIndex(value);
    });
  }
  if (userMeQuery.isLoading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Skeleton variant="rounded" width={806} height={500} />
      </Box>
    );

  return (
    <>
      <Head>
        <title>User | FUniverse</title>
      </Head>
      <Box sx={{ px: 2 }}>
        <Tabs onChange={handleTabChange} value={tabIndex}>
          {userTabs.map(({ label }) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
        {tabIndex === UserTabs.Profile && <UserInfo data={userMeQuery.data as User} />}
        {tabIndex === UserTabs.Timetable && (
          <Box sx={{ height: 'calc(100vh - 170px)', overflowY: 'auto', mt: 2 }}>
            <DynamicTimetable />
          </Box>
        )}
      </Box>
    </>
  );
}

export default UserMePage;
