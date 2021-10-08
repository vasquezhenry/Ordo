import { Table, TableBody, TableContainer } from "@mui/material";
import MenuItemCard from "./MenuItemCard";

export default function MenuTable(){
  const dataInitual = [
    {
      name: "Tacos",
      price: "$3.00",
      ingredents: "what goes in a taco"
    },
    {
      name: "Some Pasta",
      price: "$1000.00",
      ingredents: "Forget about it!"
    },
    {
      name: "Burgers",
      price: "$7.00",
      ingredents: "Cheese"
    }
  ]
  return(
    <TableContainer>
       <Table aria-label="collapsible table">
        <TableBody>
          {dataInitual.map((item) => {
            return (
              <MenuItemCard name={item.name} price={item.price} ingredents={item.ingredents} />
            )
          })}
        </TableBody>
       </Table>
    </TableContainer>
  )
}