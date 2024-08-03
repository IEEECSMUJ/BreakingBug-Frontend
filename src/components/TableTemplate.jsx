import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, TablePagination, styled, tableCellClasses } from '@mui/material';
import Button from '@mui/material/Button'; // Use MUI Button as a placeholder

const TableTemplate = ({ columns, rows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  return (
    <>
      <TableContainer>
        <Table aria-label="sticky table">
          <StyledTableRow>
            {columns.map((column) => (
              <StyledTableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label} {/* Add column header content */}
              </StyledTableCell>
            ))}
            <StyledTableCell align="center">
              Actions
            </StyledTableCell>
          </StyledTableRow>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.Id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <StyledTableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </StyledTableCell>
                    );
                  })}
                  <StyledTableCell align="center">
                    <Button variant="contained" color="primary">Action</Button> {/* Placeholder button */}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length} // Fixed rows count
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)} // Fixed setPage call
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10)); // Fixed parseInt call
          setPage(0);
        }}
      />
    </>
  );
};

export default TableTemplate;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
