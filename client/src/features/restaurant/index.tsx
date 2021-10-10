import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { API } from '../../app/api';
import { useAppSelector } from '../../app/hooks';
import { Restaurant } from '../../app/types';
import NewRestaurant from './NewRestaurant';

export default function MyRestaurantPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const currentUser = useAppSelector((s) => s.auth.user);
  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    try {
      const { data } = await API.Restaurants.getRestaurants(currentUser!.uid);
      setRestaurants(data);
    } catch (error) {
      console.log(error);
    }
  }

  //This user has no restaurants
  if (restaurants.length === 0) return <NewRestaurant />;
  return (
    <div>
      My Restaurant
      {restaurants.map((r) => (
        <Card>
          <h1>{r.name}</h1>
          <h6>{r.type}</h6>
          <h6>{r.description}</h6>
          <h6>{r.addresses[0].address1}</h6>
        </Card>
      ))}
    </div>
  );
}
