import { Button, Table, TableBody, TableContainer, Typography } from "@mui/material";
import React from "react";
import { API } from "../../../app/api";
import { Category } from "../../../app/types";
import CreateMenuPage from "./CreateMenuPage";
//import MenuItemCard from "./MenuItemCard";

interface MenuTableProps {
 menuData: Category[];
 menuId: string;
}

export default function MenuTable({menuData, menuId}: MenuTableProps) {

  const [createPageVisible, setCreatePageVisible] = React.useState(false);
  const [categories, setCategories] = React.useState(menuData);

  const getMenuCategories = async() => {
    try {
      const { data } = await API.Categories.getCategories(menuId);
      setCategories(data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    setCreatePageVisible(false);
  }

  return (
    <>
    {!createPageVisible ? (
      <>
      <Button variant='contained' style={{float: 'right'}} onClick={() => setCreatePageVisible(true)} >
        Create Menu
      </Button>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableBody>
            {categories.map(async (category) => {
              // const { data } = await API.Items.getItems(category.id);
              return (
                <div>
                  <Typography variant="h4" component="div">
                    {category.name}
                  </Typography>
                  {category.description}
                  {/* {data.map((item) => {
                    return (
                      <MenuItemCard name={item.name} price={item.price} description={item.description} />
                    )
                  })} */}
                </div>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      </>
    ) : (
      <CreateMenuPage onCancel={handleCancel} menuId={menuId} getMenuCategories={getMenuCategories}/>
    )}
    </>
  )
} 