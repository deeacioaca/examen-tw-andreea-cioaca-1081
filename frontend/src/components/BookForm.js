import { useState, useEffect } from "react";
import { get, put, post } from "../Calls.js";
import { useNavigate } from "react-router-dom";
import {
  routePostBook,
  routePutBook,
  routeGetBookByVirtualShelf,
} from "../ApiRoutes";

import SaveIcon from "@material-ui/icons/Save";
import { Grid, TextField, Button } from "@material-ui/core";

export default function FormularBookBook() {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    BookId: 0,
    BookTitlu: "",
    BookListaGenuri: "",
    URL: "",
    VirtualShelfId: JSON.parse(sessionStorage.getItem("idVirtualShelf")),
  });

  const onChangeBook = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const saveBook = async () => {
    if (!JSON.parse(sessionStorage.getItem("putScreen")))
      await post(
        routePostBook,
        book,
        JSON.parse(sessionStorage.getItem("idVirtualShelf"))
      );
    //pe insert
    else await put(routePutBook, book, book.VirtualShelfId, book.BookId); //pe update

    navigate("/books");
  };

  useEffect(async () => {
    if (JSON.parse(sessionStorage.getItem("putScreen"))) {
      //pe formularul cu update
      let data = await get(
        routeGetBookByVirtualShelf,
        JSON.parse(sessionStorage.getItem("idVirtualShelf")),
        JSON.parse(sessionStorage.getItem("idBook"))
      );
      setBook(data);
    }
  }, []);

  return (
    <div>
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        container
        spacing={4}
        direction="column"
        justifyContent="flex"
      >
        <Grid item xs={2}>
          <TextField
            style={{ textAlign: "center" }}
            margin="dense"
            id="BookId"
            variant="outlined"
            name="BookId"
            label="Id-ul Book-ului"
            fullWidth
            disabled={true}
            value={book.BookId}
            onChange={(e) => onChangeBook(e)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            margin="dense"
            variant="filled"
            id="BookTitlu"
            name="BookTitlu"
            label="Titlul Book-ului"
            fullWidth
            value={book.BookTitlu}
            onChange={(e) => onChangeBook(e)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            margin="dense"
            variant="filled"
            id="BookListaGenuri"
            name="BookListaGenuri"
            label="Lista genuri book"
            fullWidth
            value={book.BookListaGenuri}
            onChange={(e) => onChangeBook(e)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            margin="dense"
            variant="filled"
            id="BookURL"
            name="BookURL"
            label="Linkul book-ului"
            fullWidth
            value={book.BookURL}
            onChange={(e) => onChangeBook(e)}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            margin="dense"
            variant="filled"
            id="VirtualShelfId"
            name="VirtualShelfId"
            label="Id-ul VirtualShelfului de care apartine"
            fullWidth
            disabled={true}
            value={book.VirtualShelfId}
            onChange={(e) => onChangeBook(e)}
          />
        </Grid>
      </Grid>

      <br />

      <Button
        style={{ backgroundColor: "green" }}
        color="success"
        variant="contained"
        startIcon={<SaveIcon />}
        onClick={() => saveBook()}
      >
        Save
      </Button>
    </div>
  );
}
