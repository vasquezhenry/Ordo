import { Box, Button, Typography, Tab } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React from "react";
import SettingsTab from "./tabs/SettingsTab";
import MenuTable from "./tabs/MainTable";
import { Category, Restaurant } from "../../app/types";
import { API } from "../../app/api";

interface MainPageProps {
  pageInfo: Restaurant;
  handleBackButton: () => void;
}

export default function UserPage({pageInfo, handleBackButton}: MainPageProps){
  const [value, setValue] = React.useState('1');
  const [catigories, setCatigories] = React.useState<Category[]>([])
  async function getMenuCategories(id: string) {
    try {
      const { data } = await API.Categories.getCategories(id);
      setCatigories(data);
    } catch(error) {
      console.log(error)
    }
  }
  const handleChange = ( eventHandler: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  getMenuCategories(pageInfo.menuId);
  return (
    <> 
      <Typography variant="h2" align='center' >
        {pageInfo.name}
      </Typography>
      <Button variant='contained' style={ { float: 'right', marginLeft: '5px' } } onClick={handleBackButton}>
        Back
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
          <MenuTable menuData={catigories} menuId={pageInfo.menuId}/>
        </TabPanel>
        <TabPanel value="2">
          <SettingsTab pageInfo={pageInfo}/>
        </TabPanel>
      </TabContext>
    </Box>
    </>
  )
} 