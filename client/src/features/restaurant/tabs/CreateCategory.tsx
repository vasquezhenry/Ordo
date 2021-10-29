import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { CreateCategoryDto } from "../../../app/types";

interface CreateCategoryProps {
  handleSubmit: (info: CreateCategoryDto) => void;
  handleClose: () => void;
}

export default function CreateCategory({ handleSubmit, handleClose }: CreateCategoryProps) {

  const [categoryInfo, setCategoryInfo] = React.useState<CreateCategoryDto>({
    name: '',
    description: ''
  })

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInfo = categoryInfo;
    if(event.target.id === "name") {
      newInfo.name = event.target.value;
    } else if (event.target.id === "discription") {
      newInfo.description = event.target.value
    }
    setCategoryInfo(newInfo);
  }

  return (
    <>
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
            onChange={handleCategoryChange}
          />
        </p>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => handleSubmit(categoryInfo)} variant="contained" autoFocus>Submit</Button>
      </Box>
    </>
  )
}