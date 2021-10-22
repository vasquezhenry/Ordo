import { Box, TextField, Typography, Button } from "@mui/material";
import React from "react";
import { API } from "../../../app/api";
import { Restaurant } from "../../../app/types";

interface SettingsProps {
  pageInfo: Restaurant;
}

export default function SettingsTab(props: SettingsProps) {

  const [settings, setSettings] = React.useState<Restaurant>(props.pageInfo);

  const onSettingsSubmit = async() => {
    await API.Restaurants.updateRestaurant(props.pageInfo.id, settings);
  }

  const handleSettingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSettings = settings;
    if(event.target.id === "name") {
      newSettings.name = event.target.value;
    } else if (event.target.id === "address1") {
      newSettings.addresses[0].address1 = event.target.value;
    } else if (event.target.id === "address2") {
      newSettings.addresses[0].address2 = event.target.value;
    } else if (event.target.id === "address3") {
      newSettings.addresses[0].address3 = event.target.value;
    } else if (event.target.id === "address4") {
      newSettings.addresses[0].address4 = event.target.value;
    } else if (event.target.id === "city") {
      newSettings.addresses[0].city = event.target.value;
    } else if (event.target.id === "state") {
      newSettings.addresses[0].state = event.target.value;
    } else if (event.target.id === "zip") {
      newSettings.addresses[0].postalCode = event.target.value;
    } else if (event.target.id === "phone") {
      newSettings.addresses[0].phoneNumber = event.target.value;
    }
    setSettings(newSettings);
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
    <div>
        <Typography variant="h5" align='left' >
          Set Restaurant Name:
        </Typography>
        <p>
          <TextField
            required
            id="name"
            label="Restaurant Name"
            defaultValue={props.pageInfo.name}
            onChange={handleSettingsChange}
          />
        </p>
        <Typography variant="h5" align='left' >
          Set Address:
        </Typography>
        <p>
          <TextField
            id="address1"
            required
            label="Address"
            defaultValue={props.pageInfo.addresses[0].address1}
          />
        </p>
        <p>
          <TextField
            id="address2"
            label="Address 2"
            defaultValue={(props.pageInfo.addresses[0].address2) ? (props.pageInfo.addresses[0].address2) : ('')}
          />
        </p>
        <p>
          <TextField
            id="address3"
            label="Address 3"
            defaultValue={(props.pageInfo.addresses[0].address3) ? (props.pageInfo.addresses[0].address3) : ('')}
          />
        </p>
        <p>
          <TextField
            id="address4"
            label="Address 4"
            defaultValue={(props.pageInfo.addresses[0].address4) ? (props.pageInfo.addresses[0].address4) : ('')}

          />
        </p>
        <p>
          <TextField
            id="city"
            label="City"
            defaultValue={props.pageInfo.addresses[0].city}
          />
        </p>
        <p>
          <TextField
            id="state"
            label="State"
            defaultValue={props.pageInfo.addresses[0].state}
          />
        </p>
        <p>
          <TextField
            id="zip"
            label="Zip Code"
            defaultValue={props.pageInfo.addresses[0].postalCode}
          />
        </p>
        <Typography variant="h5" align='left' >
          Set Phone Number
        </Typography>
        <p>
          <TextField
            id="phone"
            label="Phone Number"
            defaultValue={props.pageInfo.addresses[0].phoneNumber}
          />
        </p>
      </div>
      <Button variant='contained' style={{float: "left"}} onClick={onSettingsSubmit} >
        Submit Edit
      </Button>
    </Box>
  )
} 