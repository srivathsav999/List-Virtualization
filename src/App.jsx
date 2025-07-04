import React, { useMemo, useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Switch,
  Typography,
  IconButton,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MuiVirtualTable from './components/VirtualizationTable.jsx';
import ShadCN from './components/ShadCN';
import './App.css';

function App() {
  const [mode, setMode] = useState('light');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://fakerapi.it/api/v1/users?_quantity=100')
      .then(res => res.json())
      .then(data => setUsers(data.data))
      .catch(err => console.error(err));
  }, []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
    },
    typography: {
      h4: {
        fontWeight: 600,
        color: '#1976d2',
      },
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: '#1976d2',
            color: '#ffffff',
            fontWeight: 600,
          },
        },
      },
    },
  }), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Virtualized User Table
          </Typography>
          <Switch checked={mode === 'dark'} onChange={toggleTheme} />
          <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 2 }}>
            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </div>
        <div>
        <ShadCN users={users} />
        </div>
        <MuiVirtualTable />
      </Container>
    </ThemeProvider>
  );
}

export default App;
