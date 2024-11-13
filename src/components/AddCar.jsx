import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export default function AddCar({ saveCar, setDialogOpen }) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({ brand: '', model: '', color: '', fuel: '', modelYear: '', price: '' });

  const handleSave = () => {
    fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
    })
      .then(response => {
        if (response.ok) {
          saveCar();
          setOpen(false);
          setDialogOpen(false); // Ensure inert is removed when dialog is closed
          setCar({ brand: '', model: '', color: '', fuel: '', modelYear: '', price: '' });
        }
      })
      .catch(err => console.error(err));
  };

  const handleOpen = () => {
    setOpen(true);
    setDialogOpen(true); // Set inert on main content
  };

  const handleClose = () => {
    setOpen(false);
    setDialogOpen(false); // Remove inert when dialog is closed
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Car
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add a New Car</DialogTitle>
        <DialogContent>
          <TextField
            label="Brand"
            value={car.brand}
            onChange={e => setCar({ ...car, brand: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Model"
            value={car.model}
            onChange={e => setCar({ ...car, model: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Color"
            value={car.color}
            onChange={e => setCar({ ...car, color: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Fuel"
            value={car.fuel}
            onChange={e => setCar({ ...car, fuel: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Model Year"
            value={car.modelYear}
            onChange={e => setCar({ ...car, modelYear: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Price"
            value={car.price}
            onChange={e => setCar({ ...car, price: e.target.value })}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary">Save</Button>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
