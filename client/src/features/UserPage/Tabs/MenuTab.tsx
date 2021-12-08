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
    async function fetchData() {
      try {
        const res = await API.Categories.getCategories(menuId); 
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
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