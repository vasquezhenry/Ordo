import React from 'react';
import axios from 'axios'
import { Restaurant, Menu, Category } from '../../../app/types';
import { API } from "../../../app/api";

interface MenuProps {
    menuId: string;
  }

export default function MenuTab({menuId}: MenuProps){

  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect( () => {
    axios.get(`https://api.ordo.worthless.app/menus/${menuId}/categories`)
        .then((response) => {
        setCategories(response.data);
      })
    });
    
    
    return(
        <div key = "category">
          {categories.map((c) => (
              <div>
                <h1> {c.name}</h1>
                {c.items.map((i) => (
                  <h5>{i.name}</h5>
                ))}
              </div>
            ))}

        </div>
    );

}