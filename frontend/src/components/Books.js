import { useState, useEffect } from "react";
import { get, remove } from "../Calls.js";
import { useNavigate } from "react-router-dom";
import { routeGetBooksByVirtualShelf, routeDeleteBook } from "../ApiRoutes";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  IconButton,
} from "@material-ui/core";

export default function TabelVirtualShelfs() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [needToUpdate, setNeedToUpdate] = useState(false);

  useEffect(async () => {
    let data = await get(
      routeGetBooksByVirtualShelf,
      JSON.parse(sessionStorage.getItem("idVirtualShelf"))
    );
    setRows(data);
  }, [needToUpdate]);
  useEffect(async () => {
    sessionStorage.setItem("putScreen", "");
    sessionStorage.setItem("idBook", "");
  }, []);

  const goToFormularModificareBook = (idRef) => {
    sessionStorage.setItem("putScreen", true);
    sessionStorage.setItem("idBook", idRef);
    navigate("/formularBook");
  };

  const deleteBook = async (idRef, index) => {
    await remove(
      routeDeleteBook,
      JSON.parse(sessionStorage.getItem("idVirtualShelf")),
      idRef
    );

    rows.splice(index, 1);
    setRows(rows);
    setNeedToUpdate(!needToUpdate);
  };

  const goToFormularAdaugareBook = () => {
    sessionStorage.setItem("putScreen", "false");
    navigate("/formularBook");
  };

  return (
    <div>
      <TableContainer style={{
          marginTop: "10vh",
          marginRight: "10vw",
          marginLeft: "10vw",
          maxWidth: "70vw",
        }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead style={{ backgroundColor: "black", color: "white" }}>
            <TableRow style={{
                  color: "white",
                  fontSize: 18,
                  textDecoration: "underline overline",
                }}>
              <TableCell style={{
                  color: "white",
                  fontSize: 18,
                  textDecoration: "underline overline",
                }} >ID Book</TableCell>
              <TableCell style={{
                  color: "white",
                  fontSize: 18,
                  textDecoration: "underline overline",
                }} align="center">Titlu Book</TableCell>
              <TableCell style={{
                  color: "white",
                  fontSize: 18,
                  textDecoration: "underline overline",
                }} align="center">Lista genuri Books</TableCell>
              <TableCell style={{
                  color: "white",
                  fontSize: 18,
                  textDecoration: "underline overline",
                }} align="center">URL</TableCell>
              <TableCell style={{
                  color: "white",
                  fontSize: 18,
                  textDecoration: "underline overline",
                }} align="center">Id VirtualShelf de care apartine</TableCell>
              <TableCell style={{
                  color: "white",
                  fontSize: 18,
                  textDecoration: "underline overline",
                }} align="center">Actiuni Book</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.BookId}>
                <TableCell component="th" scope="row">
                  {row.BookId}
                </TableCell>
                <TableCell align="center">{row.BookTitlu}</TableCell>
                <TableCell align="center">{row.BookListaGenuri}</TableCell>
                <TableCell align="center">{row.BookURL}</TableCell>
                <TableCell align="center">{row.VirtualShelfId}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => goToFormularModificareBook(row.BookId)}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => deleteBook(row.BookId, index)}>
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Button
        color="primary"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => goToFormularAdaugareBook()}
      >
        Adauga Book
      </Button>
      <br />
      <br />
      <Button color="primary" variant="contained" onClick={() => navigate("/")}>
        Inapoi la VirtualShelfs
      </Button>
    </div>
  );
}
