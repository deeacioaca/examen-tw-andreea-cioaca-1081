import { useState, useEffect } from "react";
import { get, getQuery, remove } from "../Calls.js";
import { useNavigate } from "react-router-dom";
import {
  routeGetVirtualShelfs,
  routeGetVirtualShelfsFilter,
  routeGetVirtualShelfsSortate,
  routeExportVirtualShelfsFull,
  routeDeleteVirtualShelf,
} from "../ApiRoutes";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  Grid,
  TextField,
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
  const [filtrare, setFiltrare] = useState({
    VirtualShelfDescriere: "",
    VirtualShelfData: ""
  });

  useEffect(async () => {
    let data = await get(routeGetVirtualShelfs);
    setRows(data);
  }, [needToUpdate]);
  useEffect(async () => {
    sessionStorage.clear();
  }, []);

  const onChangeFiltrare = (e) => {
    setFiltrare({ ...filtrare, [e.target.name]: e.target.value });
  };
  const filtrareVirtualShelfs = async () => {
    let data = await getQuery(
      routeGetVirtualShelfsFilter,
      filtrare.VirtualShelfDescriere,
      filtrare.VirtualShelfData
    );
    setRows(data);
  };
  const goToFormularModificareVirtualShelf = (id) => {
    sessionStorage.setItem("putScreen", true);
    sessionStorage.setItem("idVirtualShelf", id);
    navigate("/formularVirtualShelf");
  };
  const goToFormularAdaugareVirtualShelf = () => {
    sessionStorage.setItem("putScreen", "false");
    navigate("/formularVirtualShelf");
  };

  const exporta = async () => {
    const json_export = await get(routeExportVirtualShelfsFull);
    // console.log(json_export);
    const blob = new Blob([json_export],{type:'application/json'});
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = "export.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteVirtualShelf = async (id, index) => {
    await remove(routeDeleteVirtualShelf, id);

    rows.splice(index, 1);
    setRows(rows);
    setNeedToUpdate(!needToUpdate);
  };
  
  const sortare = async () => {
    let data = await get(routeGetVirtualShelfsSortate);
    setRows(data);
  };

  const goToFormularAdaugareBook = (idVirtualShelf) => {
    sessionStorage.setItem("putScreen", "false");
    sessionStorage.setItem("idVirtualShelf", idVirtualShelf);
    navigate("/formularBook");
  };

  const goToTabelBooks = (idVirtualShelf) => {
    sessionStorage.setItem("idVirtualShelf", idVirtualShelf);
    navigate("/Books");
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          container
          item
          spacing={1}
          xs={3}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            style={{ color: "red" }}
            margin="dense"
            id="VirtualShelfDescriere"
            name="VirtualShelfDescriere"
            label="Filtrare dupa descriere"
            fullWidth
            value={filtrare.VirtualShelfDescriere}
            onChange={(e) => onChangeFiltrare(e)}
          />
          <TextField
            margin="dense"
            id="VirtualShelfData"
            name="VirtualShelfData"
            label="Filtrare dupa data"
            fullWidth
            value={filtrare.VirtualShelfData}
            onChange={(e) => onChangeFiltrare(e)}
          />
          <Button
            color="primary"
            variant="contained"
            onClick={() => filtrareVirtualShelfs()}
          >
            Filtrare
          </Button>
        </Grid>

        <Grid item xs={2}>
          <Button
            style={{ backgroundColor: "#6EC5F7" }}
            color="secondary"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => goToFormularAdaugareVirtualShelf()}
          >
            Adauga VirtualShelf
          </Button>
        </Grid>

        <Grid item xs={2}>
          <Button
            style={{ backgroundColor: "#6EC5F7" }}
            color="primary"
            variant="contained"
            onClick={() => sortare()}
          >
            Sorteaza dupa data
          </Button>
        </Grid>

        <Grid item xs={2}>
          <Button color="primary" variant="contained" onClick={() => exporta()}>
            Exporta VirtualShelfs
          </Button>
        </Grid>
      </Grid>

      <br />

      <TableContainer
        style={{
          marginTop: "10vh",
          marginRight: "10vw",
          marginLeft: "10vw",
          maxWidth: "70vw",
        }}
        component={Paper}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow style={{ backgroundColor: "black", color: "black" }}>
              <TableCell>ID VirtualShelf</TableCell>
              <TableCell
                style={{
                  color: "white",
                  fontSize: 18,
                  textDecoration: "underline overline",
                }}
                align="right"
              >
                Descriere VirtualShelf
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  fontSize: 18,
                  textDecoration: "underline overline",
                }}
                align="right"
              >
                Data VirtualShelf
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  fontSize: 18,
                  textDecoration: "underline overline",
                }}
                align="right"
              >
                Books
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  fontSize: 18,
                  textDecoration: "underline overline",
                }}
                align="right"
              >
                Actiuni Books
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.VirtualShelfId}>
                <TableCell component="th" scope="row">
                  {row.VirtualShelfId}
                </TableCell>
                <TableCell align="right">{row.VirtualShelfDescriere}</TableCell>
                <TableCell align="right">{row.VirtualShelfData}</TableCell>
                <TableCell align="right">
                  <Button
                    style={{ backgroundColor: "#6EC5F7" }}
                    color="secondary"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => goToFormularAdaugareBook(row.VirtualShelfId)}
                  >
                    Adauga Book
                  </Button>
                  <br /> <br />
                  <Button
                    style={{ backgroundColor: "green" }}
                    color="secondary"
                    variant="contained"
                    onClick={() => goToTabelBooks(row.VirtualShelfId)}
                  >
                    Vezi Books
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() =>
                      goToFormularModificareVirtualShelf(row.VirtualShelfId)
                    }
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteVirtualShelf(row.VirtualShelfId, index)}
                  >
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
