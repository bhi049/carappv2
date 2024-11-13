import { AppBar, Typography, Container } from '@mui/material';
import CarList from './components/CarList';

function App() {
  return (
    <>
      <AppBar position="static" style={{ marginBottom: '20px', padding: '10px' }}>
        <Typography variant="h6" align="center">
          Car Shop
        </Typography>
      </AppBar>

      <Container maxWidth="lg" style={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Car Inventory
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Manage your car inventory: add, edit, or delete cars.
        </Typography>

        <CarList />
      </Container>
    </>
  );
}

export default App;
