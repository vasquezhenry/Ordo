import { Box, Button, TextField, Typography } from "@mui/material"
import React from "react"
import { CreateItemDto } from "../../../app/types"

interface CreateItemProps {
  categoryId: string;
  onSubmit: (id: string, item: CreateItemDto) => void;
  handleClose: () => void;
}

export default function CreateItem({categoryId, onSubmit, handleClose}: CreateItemProps){
  const [itemInfo, setItemInfo] = React.useState<CreateItemDto>({
    name: '',
    description: '',
    price: 0
  })

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInfo = itemInfo;
    if(event.target.id === "name") {
      newInfo.name = event.target.value;
    } else if (event.target.id === "discription") {
      newInfo.description = event.target.value
    } else if (event.target.id === "price") {
      const intValue = +event.target.value
      newInfo.price = intValue;
    }
    setItemInfo(newInfo);
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
            label="Item Name"
            onChange={handleCategoryChange}
          />
        </p>
        <p>
          <TextField
            required
            multiline
            id="discription"
            label="Item Discription"
            onChange={handleCategoryChange}
          />
        </p>
        <p>
          <TextField
            required
            multiline
            id="price"
            label="Price"
            onChange={handleCategoryChange}
          />
        </p>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => onSubmit(categoryId, itemInfo)} variant="contained" autoFocus>Submit</Button>
      </Box>
    </>
  )
}