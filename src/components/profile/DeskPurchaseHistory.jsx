// STYLES
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MediaQuery from "react-responsive";

const DeskPurchaseHistory = ({ transactions }) => {
  return (
    <TableContainer component={Paper}>
      {transactions.map((transaction) => (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Purchase ID: {transaction._id}</TableCell>
              <TableCell align="left">Product Name</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Quantity</TableCell>
            </TableRow>
          </TableHead>
          {transaction.product.map((product) => {
            return (
              <TableBody>
                <TableRow
                  key={product.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "60px" }}
                  >
                    <img src={product.image} alt={product.name} width={50} />
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="left"
                    style={{ width: "600px" }}
                  >
                    {product.name}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {product.price}€
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    1
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableBody>
            );
          })}
        </Table>
      ))}
    </TableContainer>
  );
};

export default DeskPurchaseHistory;
