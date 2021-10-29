import { Button, Card } from '@mui/material';
import React from 'react';
import { Restaurant } from '../../app/types';
import RestaurantMainPage from './RestaurantMainPage';

interface RestaurantPorps {
  restaurants: Restaurant[];
}

export default function Restaurants({restaurants}: RestaurantPorps) {
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
    setRestaurant({
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
  return(
    <div key="restuarant">
    {restaurant?.id === '' ? (
        <div key="restuarants">
          My Restaurant
          {restaurants.map((r) => (
            <Card>
              <Button variant="contained" style={{float: 'right'}} onClick={() => handleViewClick(r)}>View</Button>
              <h1>{r.name}</h1>
              <h6>{r.type}</h6>
              <h6>{r.description}</h6>
              <h6>{r.addresses[0].address1}</h6>
            </Card>
          ))}
        </div>
        )
        :
       (<RestaurantMainPage pageInfo={restaurant} handleBackButton={handleBackButton}/>)
    }
    </div>
  )
}