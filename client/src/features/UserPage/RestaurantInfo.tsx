import React from 'react'
import { AppBar, Box, Button, Card, IconButton, TextField, Toolbar, Typography } from "@mui/material"
import { Restaurant, Menu } from '../../app/types';
import axios from 'axios'
import MenuTab from './Tabs/MenuTab'


interface RestaurantProps {
  restInfo: Restaurant;
  handleBackButton: () => void;
}

export default function RestaurantInfo({restInfo, handleBackButton}: RestaurantProps){
    return(
      <>
        <div>
          <Typography variant="h1" align='center' >
            {restInfo?.name}
          </Typography>
          <Button variant='contained' style={ { float: 'right', marginLeft: '5px' } } onClick={handleBackButton}>
            Back
          </Button>
        </div>
        <div>
          <Box sx={{ border: 1 , margin: '10px'}}>
            <MenuTab menuId={restInfo.menuId}/>
            </Box>
        </div>
      </>
    )
}