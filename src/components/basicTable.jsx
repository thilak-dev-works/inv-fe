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
  boxShadow: 'none',
}));

const StyledTableHead = styled(TableRow)(({ theme }) => ({}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

const InventorySummary = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch('https://inv-be.vercel.app/v1/inventory/summary')
      .then(response => response.json())
      .then(data => {
        // Format data to match the table structure
        const formattedData = data.map(item => ({
          category: item.category,
          quantityInHand: item.stockTotal,
          quantityToBeReceived: item.StockToBeReceivedTotal
        }));
        setData(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const headers = [
    { id: 'category', label: 'Category' },
    { id: 'quantityInHand', label: 'Quantity in hand' },
    { id: 'quantityToBeReceived', label: 'Quantity to be received' }
  ];

  return (
    <StyledTableContainer component={Paper}>
      <Table aria-label="inventory summary table">
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
          {data.map((row, index) => (
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

export default InventorySummary;