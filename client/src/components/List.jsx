import React, { useState, useRef } from 'react';
import { EditNote } from './EditNote';
import edit from "../assets/edit.svg"
import trash from "../assets/trash.svg"
import { Global } from '../helpers/Global';
import { Peticion } from '../helpers/Peticion';

export const List = ({ articulos, setArticulos }) => {

    const [selectedCard, setSelectedCard] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const selectedRef = useRef(null);

    const handleCardClick = (index) => {
        if (index === selectedCard) {
            setIsClicked(true);
        } else {
            setSelectedCard(index);
            setIsClicked(true);
        }
    };

    const cardList = articulos.map((card, index) => (
        <div className="card" key={index} onClick={() => handleCardClick(index)}>
            <div className='edit-icon'>
                <img src={edit} alt="edit" />
            </div>
            <h3>{card.titulo}</h3>
            <p>{card.contenido}</p>
        </div>
    ));

    const handleCloseClick = (e) => {
        if (selectedRef.current === e.target) {
            setSelectedCard(null);
            setIsClicked(false);
        }
    };

    const eliminar = async (id) => {
        let { datos } = await Peticion(Global.url + "articulo/" + id, "DELETE");

        if (datos.status === "success") {
            let articulosActualizados = articulos.filter(articulo => articulo._id !== id);
            setArticulos(articulosActualizados);
        }
    }

    return (
        <div className="card-container">
            {cardList}
            {isClicked && (
                <div
                    className="selected"
                    ref={selectedRef}
                    onClick={handleCloseClick}
                >
                    <div className='edit-card'>
                        <EditNote
                            card={articulos[selectedCard]}
                            setArticulos={setArticulos}
                            setIsClicked={setIsClicked}
                        />

                        <button
                            onClick={() => {
                                eliminar(articulos[selectedCard]._id);
                                setIsClicked(false);
                            }}
                        >
                            <img src={trash} alt="delete" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
