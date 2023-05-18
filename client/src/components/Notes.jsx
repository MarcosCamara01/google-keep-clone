import React from 'react';
import { useState, useEffect } from 'react';
import { Global } from '../helpers/Global';
import { Peticion } from '../helpers/Peticion';
import { CreateNote } from './CreateNote';
import { List } from './List';
import { Loader } from '../helpers/Loader';

export const Notes = () => {

  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState([true]);

  useEffect(() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {
    const { datos, cargando } = await Peticion(Global.url + "articulos", "GET");
    if (datos.status === "success") {
      setArticulos(datos.articulos);
    }
    setCargando(false);
  }

  const agregarArticulo = (articulo) => {
    setArticulos([articulo, ...articulos]);
  }

  return (
    <>
      <CreateNote agregarArticulo={agregarArticulo} />
      {cargando ? <div className='box-centered'><Loader /></div> :
        (
          articulos.length >= 1 ?
            <List
              articulos={articulos}
              setArticulos={setArticulos}
            /> : <div className='box-centered'><h4>No notes</h4></div>
        )
      }
    </>
  )
}

