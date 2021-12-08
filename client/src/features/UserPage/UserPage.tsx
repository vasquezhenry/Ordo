import React, { useEffect, useState } from 'react';
import { Restaurant } from '../../app/types';
import { AppBar, Box, Button, Card, IconButton, TextField, Toolbar, Typography } from "@mui/material"
import RestaurantInfo from './RestaurantInfo';
import { Link } from 'react-router-dom'
import axios from 'axios'
import MenuIcon from '@mui/icons-material/Menu';

interface SearchProps {
  restaurants: Restaurant[];
  handleChange: (query:string) => void;
}

export default function Results(){
  const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);

  const handleChange = (searchQuery:string) => {
    axios.get(`https://api.ordo.worthless.app/restaurants?search=${searchQuery}`)
    .then((response) => {
      setRestaurants(response.data);
      })};

  const [restaurant, setRestaurant] = React.useState<Restaurant>({
    id: '',
    name: '',
    type: '',
    ownerId: '',
    description: '',
    menuId: '',
    addresses: []
  });

  const handleBackButton = () => {
    setRestaurant( 
      {
        id: '',
    name: '',
    type: '',
    ownerId: '',
    description: '',
    menuId: '',
    addresses: []
      }
    );
  }
  const handleViewClick = (r: Restaurant) => {
    setRestaurant(r);
  }

  
  return(
    <>
   <div key="restaurant"> 
      {restaurant?.id === '' ? (
        <div key="restuarants">
          <Box sx={{ height:'50%' }} style={{textAlign: "center"}}>
          <h1> Search Here For A Menu</h1>
        </Box>
        <br/>
        <Box style={{textAlign: "center"}}>
          <TextField  sx={{ width: '75%' }} label="Type in name of restaurant" onChange={(event) => handleChange(event.target.value)}/>
        </Box>  
          {restaurants.map((r) => (
            <Box sx={{ border: 1 , margin: '10px'}}>
            <Card sx={{ border: 1 , margin: '10px'}}>
              <Button variant="contained" style={{float: 'right'}} onClick={() => handleViewClick(r)}>View</Button>
              <h1>{r.name}</h1>
              <h6>{r.type}</h6>
              <h6>{r.description}</h6>
              <h6>{r.addresses[0].address1}</h6>
            </Card>
          </Box>
          ))}
      <Button component={Link} to="/login"> Login/Sign Up </Button>
        </div>
        )
        :
      (
      <>
        <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Button color="inherit" component={Link} to="/login">Login</Button>
            </Toolbar>
          </AppBar>
        <RestaurantInfo restInfo={restaurant} handleBackButton={handleBackButton}/>
        </>)
          }
    </div>
    </>
    )


}