import React from 'react';
import { useState, useEffect } from 'react';
import { Global } from '../helpers/Global';
import { Peticion } from '../helpers/Peticion';
import { CreateNote } from './CreateNote';
import { List } from './List';

export const Notes = () => {

  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState([true]);

  useEffect(() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {
    const { datos } = await Peticion(Global.url + "articulos", "GET");
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
      {cargando ? <div className='box-centered'><h4>Loading...</h4></div> :
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

