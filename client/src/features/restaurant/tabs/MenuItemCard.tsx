import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { API } from "../../../app/api";
import { Item } from "../../../app/types";

interface MenuItemProps {
 item: Item;
 handleRun: () => void;
}

export default function MenuItemCard({item, handleRun}: MenuItemProps){

  const handleDelete = async() => {
    const running = true;
    try{
      await API.Items.deleteItem(item.id)
    } catch(err) {
      console.log(err);
    }
    handleRun();
  }

  return (
    <Card sx={{ minWidth: 300 }}>
       <CardContent>
        <Button style={{float: 'right'}}>
          Edit
        </Button>
        <Button onClick={handleDelete} style={{float: 'right'}}>
          Delete
        </Button>
       <Typography variant="h5" component="div">
         {item.name}
       </Typography>
       <Typography style={{float: 'right'}} variant="body1" component="div">
         {item.price}
       </Typography>
       <Typography variant="body1" component="div">
         {item.description}
       </Typography>
       </CardContent>
    </Card>
  )
} 
