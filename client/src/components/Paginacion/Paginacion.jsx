import React from "react";
import './Paginacion.css'

export default function Paginacion({pagina,setPagina,maximo}){
    function prevButton(){
        if(pagina-1>=1){
            setPagina(pagina-1)
        }
    }

    function nextButton(){
        if(pagina+1<=maximo){
            setPagina(pagina+1)
        }
    }

    return(
        <div className="container-paginacion">
            <button className="button-paginacion" onClick={prevButton}>Prev</button>
            <p className="text-paginacion">{pagina} de {maximo}</p>
            <button className="button-paginacion" onClick={nextButton}>Next</button>
        </div>
    )
}