import { Button, Card, CardContent, Typography, Paper } from "@mui/material";
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
    <Card sx={{ minWidth: 300, marginTop: 5, marginBottom: 5 }}>
       <CardContent>
         <div style={{marginBottom: 40}}>
          <Button variant="contained" style={{float: 'right'}}>
            Edit
          </Button>
          <Button onClick={handleDelete} style={{float: 'right'}}>
            Delete
          </Button>
        </div>
        <div>
          <div>
            {item.imageUrl !== '' ? (
              <div style={{ marginLeft: 20, float: 'right', height: 200, width: 300}}>
                <img width="300" height="200" src={item.imageUrl} />
              </div>
            ):(
              "No Image"
            )}
          </div>
          <p>
            <Typography variant="h5" component="div">
              {item.name}
            </Typography>
          </p>
          <p>
            <Typography variant="body1" component="div">
              {item.description}
            </Typography>
          </p>
          <p>
            <Typography style={{float: 'left', marginTop: '5'}} variant="body1" component="div">
              {"$"+item.price}
            </Typography>
          </p>
       </div>
       </CardContent>
    </Card>
  )
} 
