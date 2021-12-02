import { Box, Skeleton } from '@mui/material';
import React from 'react';
import { API } from '../../app/api';
import { useAppSelector } from '../../app/hooks';
import { Restaurant } from '../../app/types';
import NewRestaurant from './NewRestaurant';
import Restaurants from './Restaurants';


export default function MyRestaurantPage() {
  const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);
  const [complete, setComplete] = React.useState(false);
  const [run, setRun] = React.useState(true);
  const currentUser = useAppSelector((s) => s.auth.user);
  React.useEffect(() => {
    async function fetchRestaurants() {
      try {
        const { data } = await API.Restaurants.getRestaurants(currentUser!.uid);
        setRestaurants(data);
      } catch (error) {
        console.log(error);
      }
      setComplete(true);
    }
    if(run) {
      fetchRestaurants();
      setRun(false);  
    } 
  },[run]);

  async function getRestaurants() {
    setRun(true);
  }

  const onSubmit = () => {
    getRestaurants();
  }

  //This user has no restaurants
  return (
    <Box>
      {complete ? (
        <>
          {restaurants.length === 0 ? (
              <NewRestaurant onSubmit={onSubmit} getRestaurants={getRestaurants}/>
            ) : (
              <Restaurants restaurants={restaurants} getRestaurants={getRestaurants} onSubmit={onSubmit}/>
            )
          }
        </>
      ) : (
        <>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </>
      )}
    </Box>
  );
}
