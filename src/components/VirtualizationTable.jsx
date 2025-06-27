import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import { TableVirtuoso } from 'react-virtuoso';

export default function MuiVirtualTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakerapi.it/api/v1/users?_quantity=200')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then((data) => {
        setUsers(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

  return (
    <Paper sx={{ maxWidth: 1000, mx: 'auto', mt: 4, p: 2, borderRadius: 2 }}>
      <Typography variant="h6" align="center" gutterBottom>User List </Typography>
      <TableContainer sx={{ height: 500 }}>
        <TableVirtuoso
          data={users}
          components={{
            Scroller: TableContainer,
            Table: (props) => <Table {...props} sx={{ minWidth: 650 }} />,
            TableHead: TableHead,
            TableRow: TableRow,
            TableBody: TableBody,
          }}
          fixedHeaderContent={() => (
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Website</strong></TableCell>
            </TableRow>
          )}
          itemContent={(index, user) => (
            <>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.firstname} {user.lastname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.website}</TableCell>
            </>
          )}
        />
      </TableContainer>
    </Paper>
  );
}
