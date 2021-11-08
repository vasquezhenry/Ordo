import React, { MouseEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, Box, Card, TextField } from "@mui/material"
import { Restaurant } from "../../app/types"
import axios from 'axios'
import { API } from "../../app/api"

function HomePage() {
    
  const handleSubmit = () => {
    alert("You have clicked submit");
  }

  return(
    <div className="App">
      <Box sx={{ height:'50%' }} style={{textAlign: "center"}}>
        <h2> Search Here For A Menu</h2>
      </Box>
      <br/>
      <Box style={{textAlign: "center"}}>  
        <form className="searchForm" onSubmit={handleSubmit}> 
          <TextField sx={{ width: '75%' }} label="Type in name of restaurant"/>
            <Button type="submit" variant="contained"> Search </Button>
        </form>
      </Box>
      <Button component={Link} to="/login" style={{float: "right"}}> Login/Sign Up </Button>
    </div>
  );
}


export default HomePage;
