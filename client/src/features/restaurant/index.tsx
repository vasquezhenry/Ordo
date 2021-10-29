import React from 'react';
import { API } from '../../app/api';
import { useAppSelector } from '../../app/hooks';
import { Restaurant } from '../../app/types';
import NewRestaurant from './NewRestaurant';
import Restaurants from './Restaurants';


export default function MyRestaurantPage() {
  const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);
  const currentUser = useAppSelector((s) => s.auth.user);
  React.useEffect(() => {
    getRestaurants();
    return () => {
      setRestaurants([]);
    }
  },[]);

  async function getRestaurants() {
    try {
      const { data } = await API.Restaurants.getRestaurants(currentUser!.uid);
      setRestaurants(data);
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = () => {
    getRestaurants();
  }

  //This user has no restaurants
  return (
    <>
      {restaurants.length === 0 ? (<NewRestaurant onSubmit={onSubmit} getRestaurants={getRestaurants}/>) : (<Restaurants restaurants={restaurants}/>)}
    </>
  );
}
