import React from 'react'
import { Global } from '../helpers/Global';
import { Peticion } from '../helpers/Peticion';
import { useForm } from '../hooks/useForm';

export const EditNote = ({ card, setArticulos, setIsClicked }) => {

    const { formulario, enviado, cambiado } = useForm({});

    const editarArticulo = async (e) => {
        e.preventDefault();
        // Recoger Datos formulario
        let nuevoArticulo = formulario;

        // Guardar articulo en el backend
        const { datos } = await Peticion(Global.url + "articulo/" + card._id, "PUT", nuevoArticulo);

        if (datos.status === "success") {
            // Update the state of the List component with the new list of articles
            setArticulos(prevArticulos => {
                const index = prevArticulos.findIndex(articulo => articulo._id === card._id);
                const updatedArticulos = [...prevArticulos];
                updatedArticulos[index] = { ...updatedArticulos[index], ...nuevoArticulo };
                return updatedArticulos;
            });
        }

        setIsClicked(false);
    }

    return (
        <>
            <form className='form' onSubmit={editarArticulo}>
                <div className="form-group">
                    <input type="text" name='titulo' onChange={cambiado} defaultValue={card.titulo} placeholder={card.titulo ? "" : "Title"} autoComplete='off' />
                </div>
                <div className="form-group">
                    <textarea type="text" name='contenido' onChange={cambiado} defaultValue={card.contenido} placeholder={card.contenido ? "" : "Take a note..."} />
                </div>
                <input type="submit" value="Done" className='btn-btn-success' />
            </form>
        </>
    )
}
