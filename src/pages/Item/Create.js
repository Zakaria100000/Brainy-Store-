import React, { useState } from 'react';

import {
  Container,
  Grid,
  TextField,
  FormControl,
  Button,
  Typography,
  Snackbar,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { createItem } from '../../api/item';  



export default function CreateItem() {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [reference, setReference] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const clearTextBox = () => {
    setName('');
    setPhoto('');
    setReference('');
    setDescription('');
    setPrice();
  };

  const handleSubmit = () => {
    const item = {
      name,
      photo,
      reference,
      description,
      price,
    };
    console.log(price);
    clearTextBox();

    createItem(item)
      .then((res) => {
        console.log(res);
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'photo':
        setPhoto(value);
        break;
      case 'reference':
        setReference(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'price':
        setPrice(value);
        break;
      default:
        break;
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

 
  return (
    <Container sx={{ width: '50%' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Create Item
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="name"
              placeholder="Enter your item's name"
              variant="outlined"
              name="name"
              value={name}
              onChange={handleInputChange}
              type="name"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Photo"
              placeholder="Pic of your swag item"
              variant="outlined"
              name="photo"
              value={photo}
              onChange={handleInputChange}
              type="photo"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Item's Reference"
              placeholder="your item's reference"
              variant="outlined"
              name="reference"
              value={reference}
              onChange={handleInputChange}
              type="reference"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Description"
              placeholder="A short description of your item"
              variant="outlined"
              name="description"
              value={description}
              onChange={handleInputChange}
              type="description"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Price"
              variant="Your item's price"
              name="price"
              value={price}
              onChange={handleInputChange}
              type="price"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleSubmit}
            style={{ marginTop: 16 }}
          >
            Add Item
          </Button>
        </Grid>

        <Snackbar
          open={openSnackbar}
          onClose={handleSnackbarClose}
          message={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle sx={{ mr: 1 }} />
              <span>Item Added Successfully</span>
            </div>
          }
          autoHideDuration={2000}
        />
      </Grid>
    </Container>
  );
}
