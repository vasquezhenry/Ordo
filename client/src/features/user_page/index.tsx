import { Box, Button, Typography, Tab } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { signOut } from "../auth/authSlice";
import Settings from "./Settings";
import MenuTable from "./MenuTable";

export default function UserPage(){
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <> 
      <Typography variant="h2" align='center' >
        Restaurant Name
      </Typography>
      <Button variant='contained' style={{float: 'right'}} >
        Create Menu
      </Button>
      <Box sx={{ width: '75%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Main Menu" value="1" />
            <Tab label="Settings" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <MenuTable/>
        </TabPanel>
        <TabPanel value="2">
          <Settings/>
        </TabPanel>
      </TabContext>
    </Box>
    <Button style={{float: 'right'}} onClick={() => {
      dispatch(signOut()).unwrap();
    }} >
      Logout
    </Button>
    </>
  )
}