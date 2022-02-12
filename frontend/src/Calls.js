import axios from 'axios'
import {
    routeGetVirtualShelfsFull, routeGetVirtualShelfs, routeGetVirtualShelfById, routeGetBooks, routeGetBooksByVirtualShelf,
    routeGetBookByVirtualShelf, routeGetVirtualShelfsSortate, routeExportVirtualShelfsFull,
    routePostVirtualShelf, routePostBook,
    routeDeleteVirtualShelf, routeDeleteBook,
    routePutVirtualShelf, routePutBook
} from './ApiRoutes.js'

async function get(v_url, searchAfter1 = null, searchAfter2 = null) {
    try {
        let newUrl;
        if (searchAfter1) {
            newUrl = v_url + "/" + searchAfter1;
            if (searchAfter2) {
                newUrl = newUrl + "/" + searchAfter2;
            }
        } else {
            newUrl = v_url;
        }

        return (await axios.get(newUrl)).data;

    } catch (err) {
        if (v_url === routeGetVirtualShelfsFull)
            alert('Nu s-au putut prelua VirtualShelfurile si Booksurile!');
        if (v_url === routeGetVirtualShelfs)
            alert('Nu s-au putut prelua VirtualShelfurile!');
        if (v_url === routeGetBooks)
            alert('Nu s-au putut prelua Books!');
        if (v_url === routeGetVirtualShelfsSortate)
            alert('Nu s-au putut prelua VirtualShelfurile sortate!');
        if (v_url === routeExportVirtualShelfsFull)
            alert('Nu s-au putut exporta VirtualShelfurile!');
        if (v_url === routeGetVirtualShelfById)
            alert('Nu s-a putut prelua VirtualShelful cu acest id!');
        if (v_url === routeGetBooksByVirtualShelf)
            alert('Nu s-au putut prelua Books din VirtualShelf!');
        if (v_url === routeGetBookByVirtualShelf)
            alert('Nu s-a putut prelua acest Book din VirtualShelf!');
    }
}


async function getQuery(v_url, v_descriere, v_data) {
    try {
        const params = new URLSearchParams({ descriere: v_descriere , data: v_data });
        let urlFilter = v_url + "?";
        return (await axios.get(`${urlFilter}${params}`)).data;
    } catch (err) {
        alert("Nu s-au putut prelua VirtualShelfurile (descriere/data)! ");
    }
}


async function post(v_url, item, id = null) {
    try {
        let newUrl = id ? v_url + "/" + id : v_url;
        return (await axios.post(
            newUrl,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (err) {
        if (v_url === routePostVirtualShelf) {
            alert('Eroare la inserarea VirtualShelfului!');
        }
        if (v_url === routePostBook) {
            alert('Eroare la inserarea Bookului!');
        }
    }
}


async function put(v_url, item, searchAfter1, searchAfter2 = null) {
    try {
        let newUrl;
        newUrl = v_url + "/" + searchAfter1;
        if (searchAfter2) {
            newUrl = newUrl + "/" + searchAfter2;
        }

        return (await axios.put(
            newUrl,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (err) {
        if (v_url === routePutVirtualShelf) {
            alert('Eroare la modificarea VirtualShelfului!');
        }
        if (v_url === routePutBook) {
            alert('Eroare la modificarea Bookului!');
        }
    }
}


async function remove(v_url, searchAfter1, searchAfter2 = null) {
    try {
        let newUrl;
        newUrl = v_url + "/" + searchAfter1;
        if (searchAfter2) {
            newUrl = newUrl + "/" + searchAfter2;
        }

        return (await axios.delete(newUrl)).data;
    } catch (err) {
        if (v_url === routeDeleteVirtualShelf) {
            alert('Eroare la stergerea VirtualShelfului!');
        }
        if (v_url === routeDeleteBook) {
            alert('Eroare la stergerea Bookului!');
        }
    }
}


export { get, getQuery, post, put, remove }