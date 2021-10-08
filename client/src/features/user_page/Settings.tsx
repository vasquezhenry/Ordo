import { Box, TextField, Typography, Button } from "@mui/material";


export default function UserSettings() {
  return(
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <Button variant='contained' style={{float: "right"}} >
      Submit Edit
    </Button>
    <div>

        <Typography variant="h5" align='left' >
          Set Restaurant Name:
        </Typography>
        <p>
          <TextField
            required
            id="name"
            label="Restaurant Name"
            defaultValue="Restaurant Name"
          />
        </p>
        <Typography variant="h5" align='left' >
          Set Address:
        </Typography>
        <p>
          <TextField
            id="address"
            label="Address"
            defaultValue="Henry's House"
          />
          <TextField
            id="city"
            label="City"
            autoComplete="Whatever City"
          />
          <TextField
            id="state"
            label="State"
            defaultValue=" My State"
          />
          <TextField
            id="zip"
            label="Zip Code"
            defaultValue="00000"
          />
        </p>
        <Typography variant="h5" align='left' >
          Set Phone Number
        </Typography>
        <p>
          <TextField
            id="phone"
            label="Phone Number"
            defaultValue="(856)867-5309"
          />
        </p>
      </div>
    </Box>
  )
}