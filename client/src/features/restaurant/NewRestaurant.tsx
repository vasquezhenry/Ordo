import { Button, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { API } from '../../app/api';
import { useAppSelector } from '../../app/hooks';
import { RestaurantAddressDto } from '../../app/types';

interface Props {
  onSubmit: () => void;
  getRestaurants: () => void
}
interface Input {
  type: string;
  description: string;
  name: string;
  addresses: RestaurantAddressDto;
}

export default function NewRestaurant(props: Props) {
  const { handleSubmit, register } = useForm<Input>();
  const user = useAppSelector((s) => s.auth.user);

  const onSubmit = async (data: Input) => {
    try {
      await API.Restaurants.createRestaurant(user!.uid, { ...data, addresses: [data.addresses], ownerId: user!.uid });
      toast('Restaurant Created!');
      props.getRestaurants();
    } catch (error) {
      console.log(error);
      return toast('Something went wrong');
    }
  };

  return (
    <>
      <h1>Looks like you don't have a restaurant. Create one here!</h1>
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
  );
}
