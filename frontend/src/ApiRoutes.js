const link = "http://localhost:8000/api";

const routeGetVirtualShelfsFull = link + '/getVirtualShelfsFull';
const routeGetVirtualShelfs = link + '/getVirtualShelfs';
const routeGetVirtualShelfById = link + '/getVirtualShelfById'; 
const routeGetBooks = link + '/getBooks';
const routeGetBooksByVirtualShelf = link + '/getBooksByVirtualShelf'; 
const routeGetBookByVirtualShelf = link + '/getBookByVirtualShelf'; 
const routeGetVirtualShelfsFilter = link + '/getVirtualShelfsFilter';    
const routeGetVirtualShelfsSortate = link + '/getVirtualShelfsSortateDupaData';
const routeExportVirtualShelfsFull = link + '/exportVirtualShelfsFull';

const routePostVirtualShelf = link + '/addVirtualShelf';
const routePostBook = link + '/addBook'; //   /:idVirtualShelf

const routeDeleteVirtualShelf = link + '/deleteVirtualShelf';  
const routeDeleteBook = link + '/deleteBook'; 

const routePutVirtualShelf = link + '/updateVirtualShelf'; 
const routePutBook = link + '/updateBook'; 


export {
    routeGetVirtualShelfsFull, routeGetVirtualShelfs, routeGetVirtualShelfById, routeGetBooks, routeGetBooksByVirtualShelf,
    routeGetBookByVirtualShelf, routeGetVirtualShelfsFilter, routeGetVirtualShelfsSortate, routeExportVirtualShelfsFull,
    routePostVirtualShelf, routePostBook,
    routeDeleteVirtualShelf, routeDeleteBook,
    routePutVirtualShelf, routePutBook
}