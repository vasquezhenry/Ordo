import { Box, TextField, Button, Grid } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { API } from "../../../app/api";
import { Restaurant, RestaurantAddressDto } from "../../../app/types";

interface SettingsProps {
  pageInfo: Restaurant | undefined;
}
interface Input {
  type: string;
  description: string;
  name: string;
  addresses: RestaurantAddressDto;
}

export default function SettingsTab(props: SettingsProps) {
  const { handleSubmit, register } = useForm<Input>();
  console.log(props.pageInfo);
  const onSettingsSubmit = async (data: Input) => {
    console.log(data);
    try{
      await API.Restaurants.updateRestaurant(props.pageInfo!.id, {
        ...data, addresses: [data.addresses],
        id: props.pageInfo!.id,
        ownerId: props.pageInfo!.ownerId,
        menuId: props.pageInfo!.menuId
      });
    }  catch (err) {
      console.log(err);
    }
  }

  const onSubmit = () => {
  }

  return(
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <form style={{ textAlign: 'center' }}>
        <Grid container style={{flexDirection: 'column'}}>
          <h3>Restaurant Info</h3>
          <Grid item xs={12}>
            <TextField 
              {...register('name')} 
              label="Name" 
              fullWidth 
              defaultValue={props.pageInfo!.name}
              />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <TextField
              {...register('type')}
              label="Type"
              defaultValue={props.pageInfo!.type}
              style={{ width: '47%', marginRight: '20px' }}
            />

            <TextField
              {...register('description')}
              label="Description"
              defaultValue={props.pageInfo?.description}
              style={{ width: '47%' }}
            />
          </Grid>

          <h3>Address Info</h3>
          <Grid item xs={12} style={{ marginBottom: '10px' }}>
            <TextField 
              {...register('addresses.address1')}  
              label="Address 1"  
              defaultValue={props.pageInfo?.addresses[0].address1}
              fullWidth 
              />
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '10px' }}>
            <TextField 
              {...register('addresses.address2')} 
              label="Address 2" 
              defaultValue={props.pageInfo?.addresses[0].address2}
              fullWidth 
            />
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '10px' }}>
            <TextField 
              {...register('addresses.address3')} 
              label="Address 3" 
              defaultValue={props.pageInfo?.addresses[0].address3}
              fullWidth 
            />
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '10px' }}>
            <TextField 
              {...register('addresses.address4')} 
              label="Address 4" 
              defaultValue={props.pageInfo?.addresses[0].address4}
              fullWidth 
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '10px' }}>
            <TextField 
              {...register('addresses.city')} 
              label="City" 
              defaultValue={props.pageInfo?.addresses[0].city}
              fullWidth 
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <TextField 
              {...register('addresses.state')} 
              defaultValue={props.pageInfo?.addresses[0].state}
              label="State" 
            />
            <TextField 
              {...register('addresses.country')}
              defaultValue={props.pageInfo?.addresses[0].country}
              label="Country" 
            />
            <TextField 
              {...register('addresses.postalCode')}
              defaultValue={props.pageInfo?.addresses[0].postalCode}
              label="Postal Code"
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <TextField 
              {...register('addresses.phoneNumber')} 
              label="Phone Number"
              defaultValue={props.pageInfo?.addresses[0].phoneNumber}
              fullWidth
            />
          </Grid> 
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Button type="submit" fullWidth variant={'contained'} onClick={handleSubmit(onSettingsSubmit)}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
} 