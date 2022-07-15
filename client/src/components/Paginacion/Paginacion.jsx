import React from "react";

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
        <div>
            <button onClick={prevButton}>Prev</button>
            <span>{pagina} de {maximo}</span>
            <button onClick={nextButton}>Next</button>
        </div>
    )
}