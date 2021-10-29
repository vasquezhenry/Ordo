import { Box, Button, Typography, Tab, Tabs } from "@mui/material";
import React from "react";
import SettingsTab from "./tabs/SettingsTab";
import MenuTable from "./tabs/MainTable";
import { Restaurant } from "../../app/types";


interface MainPageProps {
  pageInfo: Restaurant | undefined;
  handleBackButton: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function UserPage({pageInfo, handleBackButton}: MainPageProps){
  const [value, setValue] = React.useState(0);
  const handleChange = ( eventHandler: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <> 
      <Typography variant="h2" align='center' >
        {pageInfo?.name}
      </Typography>
      <Button variant='contained' style={ { float: 'right', marginLeft: '5px' } } onClick={handleBackButton}>
        Back
      </Button>
      <Box sx={{ width: '75%', typography: 'body1' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Main Menu" {...a11yProps(0)} />
            <Tab label="Settings" {...a11yProps(1)}/>
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <MenuTable menuId={pageInfo?.menuId || ''}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SettingsTab pageInfo={pageInfo}/>
        </TabPanel>
    </Box>
    </>
  )
} 