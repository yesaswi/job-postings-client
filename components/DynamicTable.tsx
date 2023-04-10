// /components/DynamicTable.tsx
import React, { useState } from 'react';
import { ApiResponse, Job } from '../interfaces/interfaces';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TableSortLabel,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledTable = styled(Table)({
  minWidth: 650,
});

interface DynamicTableProps {
  apiData: ApiResponse;
}

interface SortConfig {
  column: string;
  direction: 'asc' | 'desc';
}

const DynamicTable: React.FC<DynamicTableProps> = ({ apiData }) => {
  const jobs = apiData.jobs || [];
  const columns = jobs.length > 0 ? Object.keys(jobs[0]) : [];
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSort = (column: string) => {
    if (sortConfig && sortConfig.column === column) {
      setSortConfig({
        ...sortConfig,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortConfig({ column, direction: 'asc' });
    }
  };

  const sortedJobs = React.useMemo(() => {
    const filteredJobs = jobs.filter((job) =>
      columns.some((column) => job[column]?.toString().toLowerCase().includes(search.toLowerCase()))
    );

    if (sortConfig) {
      return filteredJobs.sort((a, b) => {
        const aValue = a[sortConfig.column];
        const bValue = b[sortConfig.column];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return 0;
      });
    }

    return filteredJobs;
  }, [jobs, columns, search, sortConfig]);

  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        value={search}
        onChange={handleSearch}
        fullWidth
        style={{ marginBottom: '1rem' }}
      />
      <TableContainer component={Paper}>
        <StyledTable aria-label="dynamic table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>
                  <TableSortLabel
                    active={sortConfig?.column === column}
                    direction={sortConfig?.direction || 'asc'}
                    onClick={() => handleSort(column)}
                  >
                    {column}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedJobs.map((job: Job, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>{job[column]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </>
  )};

export default DynamicTable;
