import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';


const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  height: "100%",
  overflowX: 'auto',
  boxShadow: 'none'
  //   marginTop: theme.spacing(4),
  //   padding: theme.spacing(2),
  //   borderRadius: '8px',
}));

const StyledTableHead = styled(TableRow)(({ theme }) => ({
  //   color: 'white',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   '&:nth-of-type(even)': {
  //   },
  //   '&:last-child td, &:last-child th': {
  //     border: 0,
  //   },
}));

// Reusable Table Component
const CustomTable = ({ headers, rows }) => {
  return (
    <StyledTableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <StyledTableHead>
            {headers.map((header) => (
              <TableCell key={header.id} align="left">
                {header.label}
              </TableCell>
            ))}
          </StyledTableHead>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              {headers.map((header) => (
                <TableCell key={header.id} align="left">
                  {row[header.id]}
                </TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default CustomTable;