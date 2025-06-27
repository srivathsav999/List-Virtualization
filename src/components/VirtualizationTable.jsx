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
  Alert,
  Chip,
  Box
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4, mx: 'auto', maxWidth: 600 }}>
        {error}
      </Alert>
    );
  }

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ minWidth: 650, tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        <TableCell sx={{ width: '10%', minWidth: 80 }}>
          <strong>ID</strong>
        </TableCell>
        <TableCell sx={{ width: '25%', minWidth: 200 }}>
          <strong>Name</strong>
        </TableCell>
        <TableCell sx={{ width: '30%', minWidth: 250 }}>
          <strong>Email</strong>
        </TableCell>
        <TableCell sx={{ width: '15%', minWidth: 120 }}>
          <strong>Website</strong>
        </TableCell>
      </TableRow>
    );
  }

  function rowContent(index, user) {
    return (
      <>
        <TableCell sx={{ width: '10%' }}>
          <Chip 
            label={user.id} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        </TableCell>
        <TableCell sx={{ width: '25%' }}>
          <Typography variant="body2" noWrap>
            {user.firstname} {user.lastname}
          </Typography>
        </TableCell>
        <TableCell sx={{ width: '30%' }}>
          <Typography variant="body2" noWrap title={user.email}>
            {user.email}
          </Typography>
        </TableCell>
        <TableCell sx={{ width: '15%' }}>
          <Typography 
            variant="body2" 
            noWrap 
            color="primary"
            sx={{ cursor: 'pointer' }}
            title={user.website}
          >
            {user.website}
          </Typography>
        </TableCell>
      </>
    );
  }

  return (
    <Paper elevation={3} sx={{ width: '100%', borderRadius: 2 }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="h2" gutterBottom>
          User Table with ({users.length} users)
        </Typography>
      </Box>
      
      <TableVirtuoso
        data={users}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
        style={{ height: 600 }}
      />
    </Paper>
  );
}
