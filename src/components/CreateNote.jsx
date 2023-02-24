import React from 'react';
import { useForm } from '../hooks/useForm';
import { Peticion } from '../helpers/Peticion';
import { Global } from '../helpers/Global';

export const CreateNote = ({ agregarArticulo }) => {

    const { formulario, enviado, cambiado } = useForm({});

    const guardarArticulo = async (e) => {
        e.preventDefault();
        // Recoger Datos formulario
        let nuevoArticulo = formulario;
        // Guardar articulo en el backend
        const { datos } = await Peticion(Global.url + "crear", "POST", nuevoArticulo);
        if (datos.status === "success") {
            agregarArticulo(datos.articulo);
        }
    }

    return (
        <form className='create-note' onSubmit={guardarArticulo}>
            <input type="text" name='titulo' onChange={cambiado} placeholder="Title" autoComplete='off' />
            <textarea type="text" name='contenido' onChange={cambiado} placeholder="Take a note..." />
            <button type="submit" className='btn-btn-success'><span>+</span></button>
        </form>
    )
}
