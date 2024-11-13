import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Snackbar, Container } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function CarList() {
  const [cars, setCars] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msg, setMsg] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false); // State to control AddCar dialog

  const colDefs = [
    { headerName: 'Brand', field: 'brand', flex: 1, minWidth: 100 },
    { headerName: 'Model', field: 'model', flex: 1, minWidth: 100 },
    { headerName: 'Color', field: 'color', flex: 1, minWidth: 100 },
    { headerName: 'Fuel', field: 'fuel', flex: 1, minWidth: 100 },
    { headerName: 'Model Year', field: 'modelYear', flex: 1, minWidth: 100 },
    { headerName: 'Price', field: 'price', flex: 1, minWidth: 100 },
    {
      headerName: 'Edit',
      cellRenderer: (params) => <EditCar params={params} updateCar={updateCar} />,
      minWidth: 80,
    },
    {
      headerName: 'Delete',
      cellRenderer: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => deleteCar(params)}
        >
          Delete
        </Button>
      ),
      minWidth: 80,
    }
  ];

  // Fetch all cars
  const getCars = () => {
    fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars')
      .then(response => response.json())
      .then(data => setCars(data._embedded.cars))
      .catch(err => console.error(err));
  };

  // Delete a car
  const deleteCar = (params) => {
    fetch(params.data._links.car.href, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          setMsg("Car deleted successfully");
          setOpenSnackbar(true);
          getCars();
        } else {
          setMsg("Failed to delete car");
          setOpenSnackbar(true);
        }
      })
      .catch(err => console.error(err));
  };

  // Update a car (placeholder for EditCar component)
  const updateCar = () => {
    getCars();
  };

  useEffect(() => getCars(), []);

  return (
    <Container style={{ textAlign: 'center', marginTop: '20px' }}>
      {/* Pass setDialogOpen to AddCar to control the inert attribute */}
      <AddCar saveCar={getCars} setDialogOpen={setDialogOpen} />
      <div
        style={{ maxWidth: '900px', margin: '0 auto' }}
        id="main-content"
        {...(dialogOpen ? { inert: 'true' } : {})} // Only add inert when dialogOpen is true
      >
        <div className="ag-theme-material" style={{ width: '100%', height: 400 }}>
          <AgGridReact
            rowData={cars}
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={5}
            paginationPageSizeSelector={[5, 20, 50, 100]} // Option to include 5 in the selector
          />
          <Snackbar
            open={openSnackbar}
            message={msg}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
          />
        </div>
      </div>
    </Container>
  );
}
