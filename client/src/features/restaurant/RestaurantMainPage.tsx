import { Box, Button, Typography, Tab, Tabs, Skeleton } from "@mui/material";
import React from "react";
import SettingsTab from "./tabs/SettingsTab";
import MenuTable from "./tabs/MainTable";
import { Category, Restaurant } from "../../app/types";
import { API } from "../../app/api";


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
  const [run, setRun] = React.useState(true);
  const [complete, setComplete] = React.useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [rest, setRest] = React.useState<Restaurant>({
    id: '',
    name: '',
    type: '',
    ownerId: '',
    description: '',
    menuId: '',
    addresses: []
  });
  const handleChange = ( eventHandler: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    let current: Restaurant | undefined;
    async function fetchRestaurant() {
      try {
        const { data } = await API.Restaurants.getRestaurants(pageInfo!.ownerId);
        current = data.find((el) => el.menuId === pageInfo!.menuId);
      } catch (error) {
        console.log(error);
      }
      setRest(current!);
      try{
        const { data } = await API.Categories.getCategories(pageInfo!.menuId);
        setCategories(data);
        setComplete(true);
      } catch (error) {
        console.log(error);
      }
    }
    if(run) {
      fetchRestaurant();
      setRun(false);  
    }
  },[run]);
  async function getRestaurant() {
    setComplete(false);
    setRun(true);
  }
  return (
    <> 
      <Typography variant="h2" align='center' >
        {rest.name}
      </Typography>
      <Button variant='contained' style={ { float: 'right', marginLeft: '5px' } } onClick={() => {
          handleBackButton();
          setComplete(false);
        }
      }>
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
          {complete ? (
            <MenuTable menuId={rest.menuId || ''} cat={categories}/>
          ) : (
            <>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
        {complete ? (
          <SettingsTab onUpdate={() => getRestaurant()} pageInfo={rest} />
          ) : (
            <>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </>
        )}
        </TabPanel>
    </Box>
    </>
  )
} 