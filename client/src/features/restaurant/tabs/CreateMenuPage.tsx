import { Box, Button, Table, TableBody, TableContainer, TextField, Typography } from "@mui/material";
import React from "react";
import { API } from "../../../app/api";
import { Category } from "../../../app/types";
import CreateCategory from "./CreateCategory";
//import MenuItemCard from "./MenuItemCard";

interface CreateMenuPageProps {
  onCancel: () => void;
  menuId: string;
  getMenuCategories: () => void;
}

export default function CreateMenuPage({onCancel, menuId, getMenuCategories}: CreateMenuPageProps) {
  const [menuCategories, setMenuCategories] = React.useState<Category[]>([]);
  const [createCategoryVisible, setCreateCategoryVisible] = React.useState(false)

  const onCancelModal = () => {
    setCreateCategoryVisible(false);
    onCancel()
  }
  const handleMenuCancel = async() => {
    // await menuCategories.map((category) => {
      
    // })
  }
  const handleSubmit = () => {
    getMenuCategories();
    onCancel();
  }
  const getCategories = async () => {
    try {
      const { data } = await API.Categories.getCategories(menuId);
      setMenuCategories(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <Button onClick={() => setCreateCategoryVisible(true)} >
      Add Category
    </Button>
    <TextField
      required
      id="title"
      label="Menu Title"
      placeholder='Please Enter Menu Title'
    />
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableBody>
          {menuCategories.map((item) => {
            return (
              <>
                <Typography variant="h4" component="div">
                  {item.name}
                </Typography>
                {item.description}
              </>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
    <CreateCategory menuId={menuId} onCancel={onCancelModal} visible={createCategoryVisible} getCategories={getCategories}/>
    <Button onClick={handleMenuCancel}>
      Cancel
    </Button>
    <Button onClick={handleSubmit}>
      Submit
    </Button>
  </Box>
  )
}