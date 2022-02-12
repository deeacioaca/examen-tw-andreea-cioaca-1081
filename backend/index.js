import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import mysql from "mysql2/promise";
import { DB_USERNAME, DB_PASSWORD, DB_HOST, DB } from "./Const.js";
import db from "./dbConfig.js";
import VirtualShelf from "./models/VirtualShelf.js";
import Book from "./models/Book.js";
import LikeOperator from "./Operators.js";

import fs from "fs";
("use strict");

let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

//Crearea conexiunii la baza de date 
let conn;

mysql
  .createConnection({
    //host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: "shelf"
    // database: DB,
  })
  .then((connection) => {
    conn = connection;
    return connection.query("CREATE DATABASE IF NOT EXISTS shelf");
    // return connection.query("CREATE DATABASE IF NOT EXISTS heroku_97312aeed9148fb");
  })
  .then(() => {
    return conn.end();
  })
  .catch((err) => {
    console.log(err);
  });

//Legatura one to many pentru cele doua entitati
VirtualShelf.hasMany(Book, { as: "Books", foreignKey: "VirtualShelfId" });
Book.belongsTo(VirtualShelf, { foreignKey: "VirtualShelfId" });

//POST
//Adaugarea VirtualShelf-ului  
async function createVirtualShelf(virtualShelf) {
  return await VirtualShelf.create(virtualShelf);
}
router.route("/addVirtualShelf").post(async (req, res) => {
  try {
    return res.status(201).json(await createVirtualShelf(req.body));
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error_message: "Eroare! Nu s-a putut insera VirtualShelf-ul!",
    });
  }
});

//Adaugare Book pentru un anumit VirtualShelf  
async function createBook(book, idVirtualShelf) {
  if (!(await getVirtualShelfById(idVirtualShelf))) {
    console.log("Nu s-a gasit VirtualShelf-ul");
    return;
  }
  book.VirtualShelfId = idVirtualShelf;
  return await Book.create(book);
}
router.route("/addBook/:idVirtualShelf").post(async (req, res) => {
  try {
    return res
      .status(201)
      .json(await createBook(req.body, req.params.idVirtualShelf));
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error_message: "Eroare! Nu s-a putut insera Book!",
    });
  }
});

//PUT
//update VirtualShelf  
async function updateVirtualShelf(updatedVirtualShelf, idVirtualShelf) {
  if (parseInt(idVirtualShelf) !== updatedVirtualShelf.VirtualShelfId) {
    console.log("ID diferit intre id ruta si id body");
    return;
  }
  let virtualShelf = await getVirtualShelfById(idVirtualShelf);
  if (!virtualShelf) {
    console.log("Nu exista VirtualShelf cu id-ul acesta!");
    return;
  }

  return await virtualShelf.update(updatedVirtualShelf);
}
router.route("/updateVirtualShelf/:idVirtualShelf").put(async (req, res) => {
  try {
    return res.json(await updateVirtualShelf(req.body, req.params.idVirtualShelf));
  } catch (err) {
    console.log(err.message);
  }
});

//update Book ce apartine de VirtualShelf 
async function updateBook(updatedBook, idVirtualShelf, idBook) {
  if (parseInt(idBook) !== updatedBook.BookId) {
    console.log("ID Book diferit intre id ruta si id body!");
    return;
  }
  let virtualShelf = await getVirtualShelfById(idVirtualShelf);
  if (!virtualShelf) {
    console.log("Nu exista VirtualShelf cu id-ul acesta!");
    return;
  }
  let book = await getBookByVirtualShelf(idVirtualShelf, idBook);
  if (!book) {
    console.log("Nu exista Book cu acest id pentru acest VirtualShelf");
    return;
  }
  return await book.update(updatedBook);
}
router.route("/updateBook/:idVirtualShelf/:idBook").put(async (req, res) => {
  try {
    return res.json(
      await updateBook(req.body, req.params.idVirtualShelf, req.params.idBook)
    );
  } catch (err) {
    console.log(err.message);
  }
});

//GET
//afisare VirtualShelfs impreuna cu Books aferente (toti parintii cu toti copiii aferenti)
async function getVirtualShelfsFull() {
  return await VirtualShelf.findAll({ include: ["Books"] });
}
router.route("/getVirtualShelfsFull").get(async (req, res) => {
  try {
    return res.json(await getVirtualShelfsFull());
  } catch (err) {
    console.log(err.message);
  }
});

//afisarea exclusiva a VirtualShelfs, fara Books lor (afisare toti parintii, fara copiii lor)
router.route("/getVirtualShelfs").get(async (req, res) => {
  try {
    return res.json(await VirtualShelf.findAll());
  } catch (err) {
    console.log(err.message);
  }
});

//afisarea VirtualShelf cu un anumit id  (afisare parinte dupa id)
async function getVirtualShelfById(id) {
  return await VirtualShelf.findOne({
    where: id ? { VirtualShelfId: id } : undefined,
  });
}
router.route("/getVirtualShelfById/:id").get(async (req, res) => {
  try {
    return res.json(await getVirtualShelfById(req.params.id));
  } catch (err) {
    console.log(err.message);
  }
});

//afisarea tuturor Books (afisarea tuturor copiilor indiferent de ce parinte au)
router.route("/getBooks").get(async (req, res) => {
  try {
    return res.json(await Book.findAll());
  } catch (err) {
    console.log(err.message);
  }
});

//afisarea Books ce apartin unui VirtualShelf (afisarea tuturor copiilor unui parinte)
async function getBooksByVirtualShelf(idVirtualShelf) {
  if (!(await getVirtualShelfById(idVirtualShelf))) {
    console.log("Nu s-a gasit VirtualShelf-ul!");
    return;
  }
  return await Book.findAll({
    include: [
      {
        model: VirtualShelf,
        attributes: ["VirtualShelfDescriere"],
        where: idVirtualShelf ? { VirtualShelfId: idVirtualShelf } : undefined,
      },
    ],
  });
}
router.route("/getBooksByVirtualShelf/:idVirtualShelf").get(async (req, res) => {
  try {
    return res.json(await getBooksByVirtualShelf(req.params.idVirtualShelf));
  } catch (err) {
    console.log(err.message);
  }
});

//afisarea unui anumit Book dintr-un VirtualShelf (afisarea doar a unui copil al parintelui)
async function getBookByVirtualShelf(idVirtualShelf, idBook) {
  if (!(await getVirtualShelfById(idVirtualShelf))) {
    console.log("Nu s-a gasit VirtualShelf!");
    return;
  }
  return await Book.findOne({
    include: [
      {
        model: VirtualShelf,
        attributes: ["VirtualShelfDescriere"],
        where: idVirtualShelf ? { VirtualShelfId: idVirtualShelf } : undefined,
      },
    ],
    where: idBook ? { BookId: idBook } : undefined,
  });
}
router.route("/getBookByVirtualShelf/:idVirtualShelf/:idBook").get(async (req, res) => {
  try {
    return res.json(
      await getBookByVirtualShelf(req.params.idVirtualShelf, req.params.idBook)
    );
  } catch (err) {
    console.log(err.message);
  }
});

//afisarea tutoror VirtualShelf unde descrierea contine ceva si/sau data contine altceva (afisare parinti filtrati dupa 2 campuri)
async function getVirtualShelfsFilter(filterQuery) {
  let whereClause = {};
  // console.log(filterQuery);
  if (filterQuery.descriere)
    whereClause.VirtualShelfDescriere = {
      [LikeOperator]: `%${filterQuery.descriere}%`,
    };
  if (filterQuery.data)
  whereClause.VirtualShelfData = {
    [LikeOperator]: `%${filterQuery.data}%`,
  };

  return await VirtualShelf.findAll({
    where: whereClause,
  });
}
router.route("/getVirtualShelfsFilter").get(async (req, res) => {
  try {
    return res.json(await getVirtualShelfsFilter(req.query));
  } catch (err) {
    console.log(err.message);
  }
});

//afisarea VirtualShelf sortate descrescator dupa data (afisare parinti - sortare)
async function getVirtualShelfsSortateDupaData() {
  return await VirtualShelf.findAll({
    order: [["VirtualShelfData", "DESC"]],
  });
}
router.route("/getVirtualShelfsSortateDupaData").get(async (req, res) => {
  try {
    return res.json(await getVirtualShelfsSortateDupaData());
  } catch (err) {
    console.log(err.message);
  }
});

//export
async function exportVirtualShelfsFull() {
  if (!fs.existsSync("./exported")) fs.mkdirSync("./exported");
  fs.writeFileSync(
    "./exported/VirtualShelfs_full.json",
    JSON.stringify(await getVirtualShelfsFull())
  );
}
router.route("/exportVirtualShelfsFull").get(async (req, res) => {
  try {
    await exportVirtualShelfsFull();
    res.download(
      "./exported/VirtualShelfs_full.json",
      "downloadVirtualShelfsFull.json"
    );
  } catch (err) {
    console.log(err.message);
  }
});

//DELETE
//stergerea VirtualShelf - implicit se sterg si Books aferente  
async function deleteVirtualShelf(idVirtualShelf) {
  let virtualShelfToBeDeleted = await getVirtualShelfById(idVirtualShelf);

  if (!virtualShelfToBeDeleted) {
    console.log("Nu exista VirtualShelf cu acest id");
    return;
  }

  return await virtualShelfToBeDeleted.destroy();
}
router.route("/deleteVirtualShelf/:idVirtualShelf").delete(async (req, res) => {
  try {
    return res.json(await deleteVirtualShelf(req.params.idVirtualShelf));
  } catch (err) {
    console.log(err.message);
  }
});

//stergerea Book ce apartine de un VirtualShelf specific  
async function deleteBook(idVirtualShelf, idBook) {
  let virtualShelf = await getVirtualShelfById(idVirtualShelf);
  if (!virtualShelf) {
    console.log("Nu exista VirtualShelf cu acest id");
    return;
  }

  let bookToBeDeleted = await getBookByVirtualShelf(idVirtualShelf, idBook);

  if (!bookToBeDeleted) {
    console.log("Nu exista Book cu acest id la acest VirtualShelf");
    return;
  }

  return await bookToBeDeleted.destroy();
}
router.route("/deleteBook/:idVirtualShelf/:idBook").delete(async (req, res) => {
  try {
    return res.json(await deleteBook(req.params.idVirtualShelf, req.params.idBook));
  } catch (err) {
    console.log(err.message);
  }
});



let port = process.env.PORT || 8000;
app.listen(port, async () => {
  await db.sync({ alter: true });
  console.log("Baza de date functioneaza!");
});
console.log("PORT: " + port);
