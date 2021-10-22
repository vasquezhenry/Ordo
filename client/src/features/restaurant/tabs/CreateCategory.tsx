import { Box, Modal, TextField, Typography, Button } from "@mui/material";
import React from "react";
import { API } from "../../../app/api";
import { CreateCategoryDto } from "../../../app/types";

interface CreateCategoryProps {
  menuId: string;
  visible: boolean
  onCancel: () => void;
  getCategories: () => void;
}

export default function CreateCategory({onCancel, menuId, getCategories, visible}: CreateCategoryProps) {

  const [categoryInfo, setCategoryInfo] = React.useState<CreateCategoryDto>({
    name: '',
    description: ''
  })

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInfo = categoryInfo;
    if(event.target.id === "name") {
      newInfo.name = event.target.value;
    } else {
      newInfo.description = event.target.value
    }
    setCategoryInfo(newInfo);
  }
  const handleSubmit = async() => {
    try {
      await API.Categories.createCategory(menuId, categoryInfo);
      getCategories();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      open={visible}
    >
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5" align='left'>
          Create Category
        </Typography>
        <p>
          <TextField
            required
            id="name"
            label="Category Name"
            onChange={handleCategoryChange}
          />
        </p>
        <p>
          <TextField
            required
            multiline
            id="discription"
            label="Category Discription"
          />
        </p>
        <Button onClick={onCancel} style={{float: "right", marginRight: "5px"}}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          style={{float: "right", marginLeft: "5px"}}
          disabled={categoryInfo!.name && categoryInfo!.description !== '' ? true : false}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  )
}