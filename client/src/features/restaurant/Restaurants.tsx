import { Button, Card, Grid, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { API } from '../../app/api';
import { useAppSelector } from '../../app/hooks';
import { Restaurant, RestaurantAddressDto } from '../../app/types';
import RestaurantMainPage from './RestaurantMainPage';

interface RestaurantPorps {
  restaurants: Restaurant[];
  getRestaurants: () => void;
  onSubmit: () => void;
}

interface Input {
  type: string;
  description: string;
  name: string;
  addresses: RestaurantAddressDto;
}

export default function Restaurants(props: RestaurantPorps) {
  const [createNew, setCreateNew] = React.useState(true);
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [deleteRestaurantOption, setdeleteRestaurantOption] = React.useState<Restaurant>({
    id: '',
    name: '',
    type: '',
    ownerId: '',
    description: '',
    menuId: '',
    addresses: []
  });
  const [restaurant, setRestaurant] = React.useState<Restaurant>({
    id: '',
    name: '',
    type: '',
    ownerId: '',
    description: '',
    menuId: '',
    addresses: []
  });
  const { handleSubmit, register } = useForm<Input>();
  const user = useAppSelector((s) => s.auth.user);
  const onSubmit = async (data: Input) => {
    try {
      await API.Restaurants.createRestaurant(user!.uid, { ...data, addresses: [data.addresses], ownerId: user!.uid });
      toast('Restaurant Created!');
      props.getRestaurants();
      setCreateNew(true);
    } catch (error) {
      console.log(error);
      return toast('Something went wrong');
    }
  };
  const handleBackButton = () => {
    props.getRestaurants();
    setRestaurant({
      id: '',
      name: '',
      type: '',
      ownerId: '',
      description: '',
      menuId: '',
      addresses: []
    });
    setdeleteRestaurantOption({
      id: '',
      name: '',
      type: '',
      ownerId: '',
      description: '',
      menuId: '',
      addresses: []
    });
  }
  const handleViewClick = (r: Restaurant) => {
    setRestaurant(r);
  }
  const handleDeleteClick = (r: Restaurant) => {
    setdeleteRestaurantOption(r);
    setDeleteDialog(true);
  }
  const deleteRestaurant = async () => {
    try{
      await API.Restaurants.deleteRestaurant(deleteRestaurantOption.id);
    } catch(err) {
      console.log(err);
    }
    handleDeleteCancel();
    handleBackButton();
    props.getRestaurants();
  }
  const handleDeleteCancel = () => {
    setDeleteDialog(false);
  } 
  return(
    <div key="restuarant">
      {createNew ? (
        <div>
          {restaurant?.id === '' ? (
            <>
              <Button variant="contained" style={{float: "right"}} onClick={() => setCreateNew(false)}  >
              Create Restaurant
              </Button>
              <div key="restuarants">
                <Typography variant="h2" align='left' >
                  My Restaurants
                </Typography>
                {props.restaurants.map((r) => (
                  <Card style={{marginTop: "20px"}}>
                    <Button 
                      variant="contained" 
                      style={{float: 'right'}} 
                      onClick={() => handleViewClick(r)}
                    >
                      View
                    </Button>
                    <Button
                    variant="contained" 
                    style={{float: 'right', marginRight: '5px', marginLeft: '5px'}}
                    onClick={() => handleDeleteClick(r)}
                    >
                      Delete
                    </Button>
                    <h1>{r.name}</h1>
                    <h6>{r.type}</h6>
                    <h6>{r.description}</h6>
                    <h6>{r.addresses[0].address1}</h6>
                  </Card>
                ))}
              </div>
            </>
            )
            :
          (<RestaurantMainPage pageInfo={restaurant} handleBackButton={handleBackButton}/>)
        }
      </div>
      ) : (
        <>
          <Button variant="contained" onClick={() => setCreateNew(true)} style={{float: 'right'}}>
            Back
          </Button>
          <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'center' }}>
            <Grid container>
              <h6>Restaurant Info</h6>
              <Grid item xs={12}>
                <TextField {...register('name')} label="Name" fullWidth placeholder="eg Joe's Best Pizza In Town" />
              </Grid>
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <TextField
                {...register('type')}
                label="Type"
                placeholder="Pizza"
                style={{ width: '47%', marginRight: '20px' }}
              />

              <TextField
                {...register('description')}
                label="Description"
                placeholder="We make the best pizza!"
                style={{ width: '47%' }}
              />
            </Grid>
            <h6>Address Info</h6>
            <Grid item xs={12} style={{ marginBottom: '10px' }}>
              <TextField {...register('addresses.address1')} label="Address 1" fullWidth />
            </Grid>
            <Grid item xs={12} style={{ marginBottom: '10px' }}>
              <TextField {...register('addresses.address2')} label="Address 2" fullWidth />
            </Grid>
            <Grid item xs={12} style={{ marginBottom: '10px' }}>
              <TextField {...register('addresses.address3')} label="Address 3" fullWidth />
            </Grid>
            <Grid item xs={12} style={{ marginBottom: '10px' }}>
              <TextField {...register('addresses.address4')} label="Address 4" fullWidth />
            </Grid>
            <Grid item xs={12} style={{ marginTop: '10px' }}>
              <TextField {...register('addresses.city')} label="City" fullWidth />
            </Grid>
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <TextField {...register('addresses.state')} label="State" />
              <TextField {...register('addresses.country')} label="Country" />
              <TextField {...register('addresses.postalCode')} label="Postal Code" />
            </Grid>
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <TextField {...register('addresses.phoneNumber')} label="Phone Number" fullWidth />
            </Grid>
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <Button type="submit" fullWidth variant={'contained'} onClick={props.onSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </>
      )}
      <Dialog
        open={deleteDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-deletion">
          {`Are you sure you want to delete Restaurant ${deleteRestaurantOption.name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Clicking OK with delete this Restaurant perminatly.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={deleteRestaurant} autoFocus>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}