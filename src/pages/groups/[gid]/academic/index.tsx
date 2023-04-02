import { Curriculum, CurriculumSyllabus } from '@types';
import CircularProgress from 'components/CircularProgress';
import HeaderRowTable from 'components/HeaderRowTable';
import { withGroupDetailLayout } from 'layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useGroupAcademicQuery, useGroupAcademicSyllabusQuery, useGroupDetailQuery } from 'queries';
import React, { useMemo } from 'react';
import { capitalizeAndOmitUnderscore } from 'utils';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import { useWindowValue } from 'hooks';
import { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import Link from 'next/link';
import Table from 'components/Table';
import Typography from '@mui/material/Typography';
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
function AcademicPage() {
  const router = useRouter();
  const { gid } = router.query as { gid: string };
  const groupDetailQuery = useGroupDetailQuery(gid, { enabled: false });
  const groupAcademicQuery = useGroupAcademicQuery(gid);
  const screenWidth = useWindowValue({ path: 'screen.width', initialValue: 1200 });
  const groupAcademicSyllabusQuery = useGroupAcademicSyllabusQuery(
    `${groupAcademicQuery.data?.id}`,
  );
  if (groupAcademicQuery.isLoading) return <CircularProgress />;

  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <div>
      <Head>
        <title>Academic | Group | FUniverse</title>
      </Head>
      <Box sx={{ width: `calc(${screenWidth}px / 2)`, mx: 'auto' }}>
        <Typography variant="h4" color="initial" sx={{ my: 3, textDecoration: 'underline' }}>
          Information
        </Typography>
        <HeaderRowTable data={transformAcademic(groupAcademicQuery.data as Curriculum)} />

        <Typography variant="h4" color="initial" sx={{ mt: 5, textDecoration: 'underline' }}>
          Plan
        </Typography>
        <Table
          columns={columns as any}
          //@ts-ignore
          data={groupAcademicSyllabusQuery.data}
          // onEditEntity={onEditCurriculumSyllabus}
          // onDeleteEntity={onDeleteCurriculumSyllabus}
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
      </Box>
    </div>
  );
}

export default withGroupDetailLayout(AcademicPage);
