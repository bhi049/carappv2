import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export default function EditCar({ params, updateCar }) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState(params.data);

  const handleSave = () => {
    fetch(params.data._links.car.href, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car)
    })
      .then(response => {
        if (response.ok) {
          updateCar();
          setOpen(false);
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Edit</Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Car</DialogTitle>
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
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
