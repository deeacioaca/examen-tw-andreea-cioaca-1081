import { useState, useEffect } from "react";
import { get, put, post } from "../Calls.js";
import { useNavigate } from "react-router-dom";
import {
  routePostVirtualShelf,
  routeGetVirtualShelfById,
  routePutVirtualShelf,
} from "../ApiRoutes";

import SaveIcon from "@material-ui/icons/Save";
import { Grid, TextField, Button } from "@material-ui/core";

export default function FormularVirtualShelf() {
  const navigate = useNavigate();

  const [virtualShelf, setVirtualShelf] = useState({
    VirtualShelfId: 0,
    VirtualShelfDescriere: "",
    VirtualShelfData: "",
  });

  const onChangeVirtualShelf = (e) => {
    setVirtualShelf({ ...virtualShelf, [e.target.name]: e.target.value });
  };

  const saveVirtualShelf = async () => {
    if (!JSON.parse(sessionStorage.getItem("putScreen")))
      await post(routePostVirtualShelf, virtualShelf);
    else await put(routePutVirtualShelf, virtualShelf, virtualShelf.VirtualShelfId);

    navigate("/");
  };

  useEffect(async () => {
    if (JSON.parse(sessionStorage.getItem("putScreen"))) {
      let data = await get(
        routeGetVirtualShelfById,
        JSON.parse(sessionStorage.getItem("idVirtualShelf"))
      );
      setVirtualShelf(data);
    }
  }, []);

  return (
    <div>
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10vh",
        }}
        container
        spacing={2}
        direction="column"
        justifyContent="flex-start"
      >
        <Grid item xs={2}>
          <TextField
            id="VirtualShelfId"
            name="VirtualShelfId"
            label="Id-ul VirtualShelfului"
            fullWidth
            disabled={true}
            value={virtualShelf.VirtualShelfId}
            onChange={(e) => onChangeVirtualShelf(e)}
          />{" "}
        </Grid>{" "}
        <Grid item xs={4}>
          <TextField
            margin="dense"
            id="VirtualShelfDescriere"
            name="VirtualShelfDescriere"
            label="Descrierea VirtualShelfului"
            fullWidth
            value={virtualShelf.VirtualShelfDescriere}
            onChange={(e) => onChangeVirtualShelf(e)}
          />{" "}
        </Grid>{" "}
        <Grid item xs={2}>
          <TextField
            margin="dense"
            id="VirtualShelfData"
            name="VirtualShelfData"
            label="Data VirtualShelfului"
            fullWidth
            value={virtualShelf.VirtualShelfData}
            onChange={(e) => onChangeVirtualShelf(e)}
          />{" "}
        </Grid>{" "}
      </Grid>
      <br />
      <Button
        style={{ backgroundColor: "green" }}
        color="primary"
        variant="contained"
        startIcon={<SaveIcon />}
        onClick={() => saveVirtualShelf()}
      >
        Save{" "}
      </Button>{" "}
    </div>
  );
}
