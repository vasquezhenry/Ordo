import { Box, Button, Dialog, DialogContent, DialogTitle, Paper, Typography } from "@mui/material";
import React from "react";
import { API } from "../../../app/api";
import { Category, CreateCategoryDto, CreateItemDto } from "../../../app/types";
import CreateCategory from "./CreateCategory";
import CreateItem from "./CreateItem";
import MenuItemCard from "./MenuItemCard";

interface MenuTableProps {
 menuId: string;
}

export default function MenuTable({menuId}: MenuTableProps) {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [run, setRun] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [itemOpen, setItemOpen] = React.useState("");

  React.useEffect( () => {
    async function fetchData() {
      try {
        const res = await API.Categories.getCategories(menuId); 
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    if(run) {
      fetchData();
      setRun(false);
    }
  }, [run]);
  const handleRun = () => {
    setRun(true)
  }
  const handleSubmit = async(info: CreateCategoryDto) => {
    try {
      await API.Categories.createCategory(menuId, info);
    } catch (error) {
      console.log(error);
    }
    handleClose();
    handleRun();
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  console.log(menuId)
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (id: string) => {
    try {
      API.Categories.deleteCategories(id);
    } catch(error) {
      console.log(error);
    }
    handleRun()
  }
  if (categories === []) {
    return <p>Loading Info...</p>
  }
  return (
    <> 
      <Button onClick={handleClickOpen} variant= "contained" style= {{float: "right" , marginBottom: "10px"}}>
        Add Category
      </Button>
      <Box sx={{ width: '75%', typography: 'body1' }}>
        {categories.map((category) => {
          const handleItemOpen = () => {
            setItemOpen(category.id);
          }
          const handleItemClose = () => {
            setItemOpen("");
          }
          const handleItemSubmit = async(id: string, item: CreateItemDto) => {
            try {
              await API.Items.createItem(id, item);
            } catch(error) {
              console.log(error);
            }
            handleItemClose()
            setRun(true);
          }
        return (
          <>
            <Paper elevation={3} >
              <Button onClick={() => handleDelete(category.id)} style = {{float: "right"}}>
                Delete
              </Button>
              <Button onClick={handleItemOpen} style={{float: "right"}} variant="contained">Add Item</Button>
              <Typography variant="h4" component="div">
                {category.name}
              </Typography>
              {category.description}
              <Box sx={{ width: '75%', typography: 'body1' }}>
                {category.items.map((item) => {
                  return (
                    <MenuItemCard item={item} handleRun={handleRun}/>
                  )
                })}
              </Box>
            </Paper>
            <Dialog
              open={itemOpen !== "" }
              onClose={handleItemClose}
            >
            <DialogTitle id="item-box">
              <DialogContent>
                <CreateItem onSubmit={handleItemSubmit} handleClose={handleItemClose} categoryId={itemOpen}/>
              </DialogContent>
            </DialogTitle>
           </Dialog>
          </>
        )
      })}
      </Box>
      <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Add a Category"}
      </DialogTitle>
        <DialogContent>
          <CreateCategory handleSubmit={handleSubmit} handleClose={handleClose}/>
        </DialogContent>
      </Dialog>
    </>
  )
} 