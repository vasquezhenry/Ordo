import { Button, Card, CardContent, Typography } from "@mui/material";

interface MenuItemProps {
  name: string;
  price: string;
  ingredents: string;
}

export default function MenuItemCard({name, price, ingredents}: MenuItemProps){
  return (
    <Card sx={{ minWidth: 300 }}>
       <CardContent>
        <Button style={{float: 'right'}}>
          Edit
        </Button>
        <Button style={{float: 'right'}}>
          Delete
        </Button>
       <Typography variant="h5" component="div">
         {name}
       </Typography>
       <Typography style={{float: 'right'}} variant="body1" component="div">
         {price}
       </Typography>
       <Typography variant="body1" component="div">
         {ingredents}
       </Typography>
       </CardContent>
    </Card>
  )
}