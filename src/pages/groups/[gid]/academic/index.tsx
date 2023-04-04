import { Curriculum, CurriculumSyllabus } from '@types';
import CircularProgress from 'components/CircularProgress';
import HeaderRowTable from 'components/HeaderRowTable';
import { withGroupDetailLayout } from 'layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useGroupAcademicQuery, useGroupAcademicSyllabusQuery, useGroupDetailQuery } from 'queries';
import React, { startTransition, useMemo, useState } from 'react';
import { capitalizeAndOmitUnderscore } from 'utils';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import { useWindowValue } from 'hooks';
import { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import Link from 'next/link';
import Table from 'components/Table';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Rows from 'components/Rows';
function transformAcademic(data: Curriculum) {
  const formattedSeason = capitalizeAndOmitUnderscore(data.startedTerm.season.name);
  return {
    code: { label: 'Code', value: data.code },
    name: { label: 'Name', value: data.name },
    term: { label: 'Term', value: `${formattedSeason} ${data.startedTerm.year}` },
    noSemester: { label: 'Semester', value: `${data.noSemester}` },
    currentSemester: { label: 'Current Semester', value: data.currentSemester },
    schoolYear: { label: 'School Year', value: data.schoolYear },
    description: { label: 'Description', value: data.description },
  };
}
const columns: MRT_ColumnDef<CurriculumSyllabus>[] = [
  {
    header: 'Code',
    accessorKey: 'syllabus.code',
  },
  {
    header: 'Name',
    accessorKey: 'syllabus.name',
    Cell: ({ cell, row }) => (
      <MuiLink component={Link} href={`/syllabi/${row.id}`}>
        {cell.getValue<string>()}
      </MuiLink>
    ),
    enableHiding: false,
  },
  {
    header: 'Semester',
    accessorKey: 'semester',
  },
];
enum AcademicTabs {
  Information,
  Plan,
}
const academicTabs = Object.keys(AcademicTabs)
  //@ts-ignore
  .filter((uT) => isNaN(uT))
  .map((label) => ({ label }));
function AcademicPage() {
  const [tabIndex, setTabIndex] = useState(AcademicTabs.Information);
  const router = useRouter();
  const { gid } = router.query as { gid: string };
  const screenWidth = useWindowValue({ path: 'screen.width', initialValue: 1200 });

  const groupDetailQuery = useGroupDetailQuery(gid, { enabled: false });
  const groupAcademicQuery = useGroupAcademicQuery(gid);
  const groupAcademicSyllabusQuery = useGroupAcademicSyllabusQuery(
    `${groupAcademicQuery.data?.id ?? ''}`,
  );
  function handleTabChange(event: unknown, value: number) {
    startTransition(() => {
      setTabIndex(value);
    });
  }
  if (groupDetailQuery.isLoading || groupAcademicQuery.isLoading) return <CircularProgress />;

  return (
    <div>
      <Head>
        <title>Academic | Group | FUniverse</title>
      </Head>
      <Box sx={{ px: 2, mx: 'auto' }}>
        <Box>
          <Tabs onChange={handleTabChange} value={tabIndex}>
            {academicTabs.map(({ label }) => (
              <Tab key={label} label={label} />
            ))}
          </Tabs>
          {tabIndex === AcademicTabs.Information && (
            <Box sx={{ mb: 8, mt: 5 }}>
              <HeaderRowTable data={transformAcademic(groupAcademicQuery.data as Curriculum)} />
            </Box>
          )}
          {tabIndex === AcademicTabs.Plan && (
            <Table
              columns={columns as any}
              //@ts-ignore
              data={groupAcademicSyllabusQuery.data}
              state={{
                isLoading: groupAcademicSyllabusQuery.isLoading,
                showAlertBanner: groupAcademicSyllabusQuery.isError,
                showProgressBars: groupAcademicSyllabusQuery.isFetching,
              }}
              //@ts-ignore
              getRowId={(originalRow: MRT_Row<CurriculumSyllabus>) =>
                (originalRow as any).syllabus?.id ?? originalRow.id
              }
            />
          )}
        </Box>
      </Box>
    </div>
  );
}

export default withGroupDetailLayout(AcademicPage);
