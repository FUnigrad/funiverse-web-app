import { useUserMeQuery } from 'queries';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
enum UserTabs {
  Profile,
  Timetable,
}
const userTabs = Object.keys(UserTabs)
  //@ts-ignore
  .filter((uT) => isNaN(uT))
  .map((label) => ({ label }));
function UserMePage() {
  const userMeQuery = useUserMeQuery();
  const [tabIndex, setTabIndex] = useState(UserTabs.Profile);
  return (
    <Box sx={{ px: 2 }}>
      <Tabs onChange={(_, value) => setTabIndex(value)} value={tabIndex}>
        {userTabs.map(({ label }) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
    </Box>
  );
}

export default UserMePage;
