import React from 'react';
import axios from 'axios'
import { Menu } from '../../../app/types';
import { Box, Card } from '@mui/material'

interface MenuProps {
    restId: string;
  }

export default function MenuTab({restId}: MenuProps){

  const [menu, setMenu] = React.useState<Menu>();

  React.useEffect( () => {
    axios.get(`https://api.ordo.worthless.app/restaurants/${restId}/menus`)
        .then((response) => {
        setMenu(response.data);
      })
    },[]);
    
    return(
        <>
            {menu?.categories === undefined ? ( <a> Loading....</a>) : (
              <>
              {menu?.categories.map((c) => (
                  <div>
                    <Box sx={{ border: 1 , margin: '10px'}}>
                      <Card sx={{ border: 1 , margin: '10px'}}>
                        <h2> {c.name}</h2>
                        {c.items.map((i) => (
                          <>  
                            <h5>{i.name}</h5>
                            <h5>{i.price}</h5>
                            <h5>{i.description}</h5>
                            <img src={i.imageUrl} alt={i.name}></img>
                          </>
                        ))}
                      </Card>
                    </Box>
                  </div>
                ))}
                </>
              )}
        </>
    );
}