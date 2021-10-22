import { Button, Card } from '@mui/material';
import React from 'react';
import { Restaurant } from '../../app/types';
import RestaurantMainPage from './RestaurantMainPage';

interface RestaurantPorps {
  restaurants: Restaurant[];
}

export default function Restaurants({restaurants}: RestaurantPorps) {
  const [visible, setVisible] = React.useState(true);
  const [restaurant, setRestaurant] = React.useState<NonNullable<Restaurant>>();
  const handleBackButton = () => {
    setVisible(!visible);
  }
  const handleViewClick = (r: Restaurant) => {
    setRestaurant(r);
    setVisible(false)
  }
  return(
    <div>
      { visible ? (
        <>
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
        </>
      ) : (
        restaurant !== undefined ? (<RestaurantMainPage pageInfo={restaurant} handleBackButton={handleBackButton} />) : (<> Error </>)
      )}
    </div>
  )
}